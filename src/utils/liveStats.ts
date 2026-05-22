/**
 * Runtime hydration of "live" stats on the site.
 *
 * One source: `/api/stats.json`, generated server-side by
 * /home/admin/generate-mesh-stats.py on a 5-minute cron. The script fetches
 * MeshMonitor's API plus the Discord guild API and writes a unified blob.
 *
 * Two hydration mechanisms:
 *
 *   1. Simple text swap. Elements opt in by adding `data-live-stat="<key>"`.
 *      The HTML carries a placeholder value (em-dash, "just now", etc.) as
 *      its text content; this script swaps it once the fetch completes.
 *
 *   2. List rendering. A container with `data-live-hardware="30d"` (or
 *      `"all"`) gets a list of rows built into it from the top_hardware_*
 *      array. The container's pre-existing children are removed.
 *
 * If the fetch fails, placeholders stay and the list container stays empty
 * (page is still meaningful — those sections just go quiet).
 *
 * Supported data-live-stat keys:
 *   active_1h / active_24h / active_7d / active_30d / active_90d
 *   total_nodes / nodes_with_hwmodel / message_count / channel_count
 *   discord_total_members / discord_online
 *   generated_at_relative   (e.g. "2m ago")
 *
 * Supported data-live-hardware values:
 *   "30d"  — top 5 hardware in the last 30 days
 *   "all"  — top 5 hardware all-time
 */

interface MeshtasticStats {
  schema_version: number;
  generated_at: string;
  generated_at_epoch: number;
  source: string;
  total_nodes: number;
  nodes_with_hwmodel: number;
  message_count: number | null;
  channel_count: number | null;
  active_window_seconds: Record<'1h' | '24h' | '7d' | '30d' | '90d', number>;
  active_counts: Record<'1h' | '24h' | '7d' | '30d' | '90d', number>;
  top_hardware_30d: Array<{
    hw_model: number;
    name: string;
    count: number;
    percent: number;
  }>;
  top_hardware_all: Array<{
    hw_model: number;
    name: string;
    count: number;
    percent: number;
  }>;
  discord_total_members: number | null;
  discord_online: number | null;
}

const STATS_URL = '/api/stats.json';

/**
 * Friendly names and short qualifiers for the protobuf HardwareModel enum
 * identifiers that show up in the top-hardware lists. The qualifier is a
 * one-or-two-word category (e.g. "ESP32 starter", "nRF52 builder kit",
 * "solar repeater") that gives a reader scanning the list enough context
 * to know what kind of device each entry is without leaving the page.
 *
 * Coverage focuses on devices KC has seen in the wild plus the obvious
 * adjacent variants. Anything not in this map falls back to a generic
 * title-cased name with no qualifier.
 */
interface HardwareEntry {
  name: string;
  qualifier?: string;
}

const HARDWARE_NAMES: Record<string, HardwareEntry> = {
  // Heltec — popular ESP32 family. V3 is the de facto starter; V4 the upgrade
  // with stronger TX, solar input, and built-in WiFi/BT antenna.
  HELTEC_V2_0: { name: 'Heltec V2', qualifier: 'ESP32, older' },
  HELTEC_V2_1: { name: 'Heltec V2.1', qualifier: 'ESP32, older' },
  HELTEC_V3: { name: 'Heltec V3', qualifier: 'ESP32 starter, ~$25' },
  HELTEC_V4: { name: 'Heltec V4', qualifier: 'ESP32, 28 dBm + solar' },
  HELTEC_WSL_V3: { name: 'Heltec WSL V3', qualifier: 'ESP32, no display' },
  HELTEC_WIRELESS_TRACKER: { name: 'Heltec Wireless Tracker', qualifier: 'ESP32 + GPS' },
  HELTEC_WIRELESS_PAPER: { name: 'Heltec Wireless Paper', qualifier: 'ESP32 + e-ink' },
  HELTEC_MESH_NODE_T114: { name: 'Heltec Mesh Node T114', qualifier: 'nRF52 + GPS, solar' },
  HELTEC_MESH_POCKET: { name: 'Heltec Mesh Pocket', qualifier: 'nRF52 handheld' },
  HELTEC_MESH_SOLAR: { name: 'Heltec Mesh Solar', qualifier: 'nRF52 solar node' },
  HELTEC_VISION_MASTER_E290: { name: 'Heltec Vision Master E290', qualifier: 'e-ink portable' },

  // RAK WisBlock — modular nRF52, beloved for solar/battery deployments.
  // Builders compose with base boards and add-ons.
  RAK4631: { name: 'RAK4631', qualifier: 'nRF52 builder kit, low power' },
  RAK3172: { name: 'RAK3172', qualifier: 'STM32 module' },
  RAK11200: { name: 'RAK11200', qualifier: 'ESP32 module' },
  RAK11310: { name: 'RAK11310', qualifier: 'RP2040 module' },

  // LilyGo — T-series. Lots of variants; here are the ones we've seen.
  TBEAM: { name: 'T-Beam', qualifier: 'ESP32 + GPS + battery, portable' },
  TBEAM_V0P7: { name: 'T-Beam v0.7', qualifier: 'ESP32 + GPS, older' },
  LILYGO_TBEAM_S3_CORE: { name: 'T-Beam S3 Core', qualifier: 'ESP32-S3 successor' },
  T_DECK: { name: 'T-Deck', qualifier: 'QWERTY + touchscreen, standalone' },
  T_DECK_PRO: { name: 'T-Deck Pro', qualifier: 'QWERTY upgrade' },
  T_ECHO: { name: 'T-Echo', qualifier: 'e-ink handheld, nRF52' },
  T_ECHO_LITE: { name: 'T-Echo Lite', qualifier: 'e-ink, no GPS' },
  T_ECHO_PLUS: { name: 'T-Echo Plus', qualifier: 'e-ink + extras' },
  T_WATCH_S3: { name: 'T-Watch S3', qualifier: 'wrist-worn ESP32' },
  T_WATCH_ULTRA: { name: 'T-Watch Ultra', qualifier: 'wrist-worn ESP32' },
  T_LORA_PAGER: { name: 'T-LoRa Pager', qualifier: 'pager-style handheld' },
  TLORA_V2: { name: 'TLora V2', qualifier: 'ESP32, older' },
  TLORA_V1: { name: 'TLora V1', qualifier: 'ESP32, older' },
  TLORA_T3_S3: { name: 'TLora T3 S3', qualifier: 'ESP32-S3' },

  // Seeed — trackers and solar nodes.
  TRACKER_T1000_E: { name: 'T1000-E Tracker', qualifier: 'pocket tracker' },
  TRACKER_T1000_E_PRO: { name: 'T1000-E Pro Tracker', qualifier: 'tracker upgrade' },
  SEEED_WIO_TRACKER_L1: { name: 'Seeed Wio Tracker L1', qualifier: 'nRF52 + GPS, low power' },
  SEEED_WIO_TRACKER_L1_EINK: {
    name: 'Seeed Wio Tracker L1 (e-ink)',
    qualifier: 'nRF52 + GPS + e-ink',
  },
  SEEED_SOLAR_NODE: { name: 'Seeed SenseCAP Solar Node', qualifier: 'outdoor solar repeater' },
  SEEED_XIAO_S3: { name: 'Seeed XIAO S3', qualifier: 'compact ESP32-S3' },
  SENSECAP_INDICATOR: { name: 'SenseCAP Indicator', qualifier: 'desktop dashboard' },

  // B&Q Consulting — Station series. Long-haul base stations with extra PA.
  STATION_G1: { name: 'Station G1', qualifier: 'ESP32 base station' },
  STATION_G2: { name: 'Station G2', qualifier: 'ESP32-S3 base station, +35 dBm PA' },
  STATION_G3: { name: 'Station G3', qualifier: 'base station, next-gen' },

  // ThinkNode — newer handheld line.
  THINKNODE_M1: { name: 'ThinkNode M1', qualifier: 'handheld' },
  THINKNODE_M2: { name: 'ThinkNode M2', qualifier: 'handheld' },
  THINKNODE_M5: { name: 'ThinkNode M5', qualifier: 'handheld' },

  // Linux-native — not a board, a software target. Anyone running meshtasticd
  // on a Raspberry Pi or desktop with a USB/SPI radio shows up here.
  PORTDUINO: { name: 'Portduino', qualifier: 'Linux native (Pi / desktop)' },

  // Nano-G family — pocketable.
  NANO_G1: { name: 'Nano G1', qualifier: 'pocketable' },
  NANO_G2_ULTRA: { name: 'Nano G2 Ultra', qualifier: 'pocketable + GPS' },

  // RAK WisMesh consumer line.
  WISMESH_TAP: { name: 'WisMesh Tap', qualifier: 'consumer handheld' },
  WISMESH_TAG: { name: 'WisMesh Tag', qualifier: 'asset tag' },

  // Misc handhelds.
  CANARYONE: { name: 'CanaryOne', qualifier: 'pocketable handheld' },
  CHATTER_2: { name: 'Chatter 2', qualifier: 'consumer messenger' },

  // Catch-alls.
  PRIVATE_HW: { name: 'Custom / private build', qualifier: 'home-made or unlisted' },
  UNSET: { name: 'Unidentified', qualifier: 'no hardware model reported' },
};

function hardwareEntry(enumName: string): HardwareEntry {
  if (HARDWARE_NAMES[enumName]) return HARDWARE_NAMES[enumName];
  // Fallback for anything not in the map: title-case the enum name, no qualifier.
  // "FOO_BAR" -> "Foo Bar". Better than showing FOO_BAR but be honest that we
  // don't have context — no qualifier.
  return {
    name: enumName
      .toLowerCase()
      .split('_')
      .map((word) => (word.length === 0 ? '' : word[0].toUpperCase() + word.slice(1)))
      .join(' '),
  };
}

function formatNumber(n: number | null | undefined): string | null {
  if (n === null || n === undefined) return null;
  return n.toLocaleString('en-US');
}

function formatRelative(isoTimestamp: string): string {
  const then = Date.parse(isoTimestamp);
  if (!Number.isFinite(then)) return '';
  const seconds = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function replaceStat(key: string, value: string | null) {
  if (value === null) return;
  document.querySelectorAll<HTMLElement>(`[data-live-stat="${key}"]`).forEach((el) => {
    el.textContent = value;
  });
}

/**
 * Render the top-N hardware list into containers marked with
 * `data-live-hardware="30d"` (or `"all"`). The container is cleared and
 * repopulated with one row per entry. Top 5 only.
 */
function renderHardwareList(
  containers: NodeListOf<HTMLElement>,
  rows: MeshtasticStats['top_hardware_30d'],
) {
  const top = rows.slice(0, 5);
  containers.forEach((container) => {
    // Remove any placeholder children before populating.
    container.replaceChildren();
    top.forEach((row) => {
      const entry = hardwareEntry(row.name);
      const rowEl = document.createElement('div');
      rowEl.className =
        'flex items-baseline gap-3 px-4 py-3 border-b border-white/5 last:border-b-0';

      const labelWrap = document.createElement('div');
      labelWrap.className = 'flex-1 min-w-0';

      const nameEl = document.createElement('div');
      nameEl.className = 'text-white text-sm font-medium';
      nameEl.textContent = entry.name;
      labelWrap.appendChild(nameEl);

      if (entry.qualifier) {
        const qualEl = document.createElement('div');
        qualEl.className = 'text-white/50 text-xs mt-0.5';
        qualEl.textContent = entry.qualifier;
        labelWrap.appendChild(qualEl);
      }

      const countEl = document.createElement('span');
      countEl.className = 'font-mono text-white text-sm font-medium tabular-nums';
      countEl.textContent = row.count.toLocaleString('en-US');

      const percentEl = document.createElement('span');
      percentEl.className = 'font-mono text-white/50 text-xs min-w-[48px] text-right tabular-nums';
      percentEl.textContent = `${row.percent.toFixed(1)}%`;

      rowEl.appendChild(labelWrap);
      rowEl.appendChild(countEl);
      rowEl.appendChild(percentEl);
      container.appendChild(rowEl);
    });
  });
}

export function hydrateLiveStats(): void {
  if (typeof window === 'undefined') return;
  const hasStats = document.querySelector('[data-live-stat]');
  const hasHardware = document.querySelector('[data-live-hardware]');
  if (!hasStats && !hasHardware) return;

  void (async () => {
    try {
      const res = await fetch(STATS_URL, { cache: 'no-store' });
      if (!res.ok) return;
      const stats = (await res.json()) as MeshtasticStats;

      replaceStat('active_1h', formatNumber(stats.active_counts['1h']));
      replaceStat('active_24h', formatNumber(stats.active_counts['24h']));
      replaceStat('active_7d', formatNumber(stats.active_counts['7d']));
      replaceStat('active_30d', formatNumber(stats.active_counts['30d']));
      replaceStat('active_90d', formatNumber(stats.active_counts['90d']));
      replaceStat('total_nodes', formatNumber(stats.total_nodes));
      replaceStat('nodes_with_hwmodel', formatNumber(stats.nodes_with_hwmodel));
      replaceStat('message_count', formatNumber(stats.message_count));
      replaceStat('channel_count', formatNumber(stats.channel_count));
      replaceStat('discord_total_members', formatNumber(stats.discord_total_members));
      replaceStat('discord_online', formatNumber(stats.discord_online));
      replaceStat('generated_at_relative', formatRelative(stats.generated_at));

      const hw30 = document.querySelectorAll<HTMLElement>('[data-live-hardware="30d"]');
      if (hw30.length > 0) renderHardwareList(hw30, stats.top_hardware_30d);
      const hwAll = document.querySelectorAll<HTMLElement>('[data-live-hardware="all"]');
      if (hwAll.length > 0) renderHardwareList(hwAll, stats.top_hardware_all);
    } catch {
      // Leave placeholders in place. Page is still meaningful.
    }
  })();
}
