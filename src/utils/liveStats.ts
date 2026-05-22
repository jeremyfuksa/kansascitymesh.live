/**
 * Runtime hydration of "live" stats on the site.
 *
 * One source: `/api/stats.json`, generated server-side by
 * /home/admin/generate-mesh-stats.py on a 5-minute cron. The script fetches
 * MeshMonitor's API plus the Discord guild API and writes a unified blob.
 *
 * Four hydration mechanisms:
 *
 *   1. Simple text swap. Elements opt in by adding `data-live-stat="<key>"`.
 *      The HTML carries a placeholder value (em-dash, "just now", etc.) as
 *      its text content; this script swaps it once the fetch completes.
 *
 *   2. Hardware list rendering. A container with `data-live-hardware="30d"`
 *      (or `"all"`) gets a list of rows built into it from the
 *      top_hardware_* array. The container's pre-existing children are
 *      removed.
 *
 *   3. Hardware donut chart. A container with
 *      `data-live-hardware-chart="30d"` (or `"all"`) gets an inline SVG
 *      donut + legend showing the top-5 hardware distribution plus an
 *      "Other" wedge for everything outside the top 5.
 *
 *   4. Backbone table rendering. A `<tbody data-live-backbone>` gets one
 *      `<tr>` per backbone node from the backbone_nodes array.
 *
 * If the fetch fails, placeholders stay and the list/chart containers stay
 * empty (page is still meaningful — those sections just go quiet).
 *
 * Supported data-live-stat keys:
 *   active_1h / active_24h / active_7d / active_30d / active_90d
 *   total_nodes / nodes_with_hwmodel / message_count / channel_count
 *   discord_total_members / discord_online
 *   generated_at_relative   (e.g. "2m ago")
 *
 * Supported data-live-hardware and data-live-hardware-chart values:
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
  backbone_nodes?: BackboneNode[];
  backbone_window_seconds?: number;
}

interface BackboneNode {
  short_name: string;
  long_name: string;
  hw_model_id: number | null;
  hw_model_name: string | null;
  role: string | null;
  hops: number | null;
  last_heard_epoch: number;
  last_heard_age_seconds: number | null;
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

function formatRelativeFromSeconds(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds)) return '—';
  const s = Math.max(0, Math.round(seconds));
  if (s < 60) return 'just now';
  const minutes = Math.round(s / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

/**
 * Status color for a backbone row based on how recently we heard from it.
 * Mirrors the sample data's three-tier system: up if within 24h, degraded
 * within a week, otherwise down. Anything still in the array is by
 * definition within 30d (server-side filter), so we never need a fourth
 * "stale" tier here.
 */
function backboneStatusColor(ageSeconds: number | null): string {
  if (ageSeconds === null) return 'var(--warning-500)';
  if (ageSeconds <= 86400) return 'var(--success-500)';
  if (ageSeconds <= 7 * 86400) return 'var(--warning-500)';
  return 'var(--danger-500)';
}

function renderBackboneTable(tbody: HTMLElement, rows: BackboneNode[]): void {
  tbody.replaceChildren();
  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    if (i < rows.length - 1) tr.className = 'border-b border-white/5';

    const dotCell = document.createElement('td');
    dotCell.className = 'px-4 py-3.5 w-6';
    const dot = document.createElement('span');
    dot.className = 'inline-block w-2 h-2 rounded-full';
    dot.style.background = backboneStatusColor(row.last_heard_age_seconds);
    dotCell.appendChild(dot);

    const nameCell = document.createElement('td');
    nameCell.className = 'px-4 py-3.5 text-white font-medium font-mono text-sm';
    nameCell.textContent = row.short_name || '—';

    const longCell = document.createElement('td');
    longCell.className = 'px-4 py-3.5 text-white/70 text-sm';
    longCell.textContent = row.long_name || '';

    const hwCell = document.createElement('td');
    hwCell.className = 'px-4 py-3.5 text-white/70 text-sm';
    hwCell.textContent = row.hw_model_name ? hardwareEntry(row.hw_model_name).name : '—';

    const hopsCell = document.createElement('td');
    hopsCell.className = 'px-4 py-3.5 text-white/70 text-sm font-mono';
    hopsCell.textContent = row.hops === null || row.hops === undefined ? '—' : String(row.hops);

    const seenCell = document.createElement('td');
    seenCell.className = 'px-4 py-3.5 text-white/70 text-sm';
    seenCell.textContent = formatRelativeFromSeconds(row.last_heard_age_seconds);

    tr.append(dotCell, nameCell, longCell, hwCell, hopsCell, seenCell);
    tbody.appendChild(tr);
  });
}

/**
 * Donut chart for the hardware distribution. Renders an inline SVG into a
 * container marked with `data-live-hardware-chart="30d"` (or `"all"`),
 * showing the top 5 hardware models plus an "Other" wedge for everything
 * outside the top 5. Center label is the total node count represented by
 * the chart.
 *
 * SVG is plain — no charting library. Slice geometry is computed by
 * setting stroke-dasharray and stroke-dashoffset on a series of <circle>
 * elements, which is the standard pure-SVG donut technique.
 */
const SLICE_COLORS = [
  'var(--primary-500)',
  'var(--secondary-500)',
  'var(--success-500)',
  'var(--info-500)',
  'var(--warning-500)',
];
const OTHER_COLOR = 'var(--neutral-700)';

interface ChartSlice {
  label: string;
  color: string;
  count: number;
  percent: number;
}

function buildChartSlices(rows: MeshtasticStats['top_hardware_30d']): {
  slices: ChartSlice[];
  totalCount: number;
} {
  const top = rows.slice(0, 5);
  const slices: ChartSlice[] = top.map((row, i) => ({
    label: hardwareEntry(row.name).name,
    color: SLICE_COLORS[i] ?? OTHER_COLOR,
    count: row.count,
    percent: row.percent,
  }));

  // Sum of the top-5 percent values. The server emits percents to one
  // decimal so the sum can land at e.g. 88.7%; everything missing is
  // "Other". We don't get raw "other count" from the server, but we have
  // enough to compute it from the relationship percent = count/total.
  const topPercent = slices.reduce((acc, s) => acc + s.percent, 0);
  const otherPercent = Math.max(0, 100 - topPercent);

  // Total count the chart represents: derive from row 0 (count/percent =
  // total). If percent is 0 (degenerate), fall back to summing top counts.
  const totalCount =
    top[0] && top[0].percent > 0
      ? Math.round((top[0].count / top[0].percent) * 100)
      : top.reduce((acc, r) => acc + r.count, 0);

  const otherCount = Math.max(0, totalCount - top.reduce((acc, r) => acc + r.count, 0));
  if (otherPercent > 0.1) {
    slices.push({
      label: 'Other',
      color: OTHER_COLOR,
      count: otherCount,
      percent: otherPercent,
    });
  }

  return { slices, totalCount };
}

const SVG_NS = 'http://www.w3.org/2000/svg';

function renderHardwareChart(
  container: HTMLElement,
  rows: MeshtasticStats['top_hardware_30d'],
): void {
  const { slices, totalCount } = buildChartSlices(rows);
  container.replaceChildren();

  // Donut geometry. We use a 100×100 viewBox, a circle of radius 40
  // centered at (50, 50). Circumference = 2π·40 ≈ 251.327.
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 16;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'block w-full h-auto max-w-[260px] mx-auto');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Hardware distribution donut chart');

  // Slices, rotated so the first one starts at 12 o'clock.
  let offsetPercent = 0;
  slices.forEach((slice) => {
    const slicePath = document.createElementNS(SVG_NS, 'circle');
    slicePath.setAttribute('cx', '50');
    slicePath.setAttribute('cy', '50');
    slicePath.setAttribute('r', String(radius));
    slicePath.setAttribute('fill', 'transparent');
    slicePath.setAttribute('stroke', slice.color);
    slicePath.setAttribute('stroke-width', String(strokeWidth));
    const sliceLength = (slice.percent / 100) * circumference;
    slicePath.setAttribute('stroke-dasharray', `${sliceLength} ${circumference - sliceLength}`);
    const dashOffset = circumference - (offsetPercent / 100) * circumference + circumference / 4;
    slicePath.setAttribute('stroke-dashoffset', String(dashOffset));
    svg.appendChild(slicePath);
    offsetPercent += slice.percent;
  });

  // Center label — total count + units, two lines.
  const centerNumber = document.createElementNS(SVG_NS, 'text');
  centerNumber.setAttribute('x', '50');
  centerNumber.setAttribute('y', '48');
  centerNumber.setAttribute('text-anchor', 'middle');
  centerNumber.setAttribute('dominant-baseline', 'middle');
  centerNumber.setAttribute('fill', 'rgb(255 255 255)');
  centerNumber.setAttribute('class', 'font-mono');
  centerNumber.setAttribute('font-size', '12');
  centerNumber.setAttribute('font-weight', '600');
  centerNumber.textContent = totalCount.toLocaleString('en-US');
  svg.appendChild(centerNumber);

  const centerLabel = document.createElementNS(SVG_NS, 'text');
  centerLabel.setAttribute('x', '50');
  centerLabel.setAttribute('y', '60');
  centerLabel.setAttribute('text-anchor', 'middle');
  centerLabel.setAttribute('dominant-baseline', 'middle');
  centerLabel.setAttribute('fill', 'rgb(255 255 255 / 0.5)');
  centerLabel.setAttribute('font-size', '6');
  centerLabel.setAttribute('letter-spacing', '0.4');
  centerLabel.textContent = 'NODES';
  svg.appendChild(centerLabel);

  container.appendChild(svg);

  // Legend below the donut, mobile-readable.
  const legend = document.createElement('ul');
  legend.className = 'mt-4 space-y-1.5 text-xs';
  slices.forEach((slice) => {
    const li = document.createElement('li');
    li.className = 'flex items-center gap-2';

    const swatch = document.createElement('span');
    swatch.className = 'inline-block w-3 h-3 rounded-sm shrink-0';
    swatch.style.background = slice.color;

    const label = document.createElement('span');
    label.className = 'flex-1 min-w-0 text-white/70 truncate';
    label.textContent = slice.label;

    const pct = document.createElement('span');
    pct.className = 'font-mono text-white/50 tabular-nums';
    pct.textContent = `${slice.percent.toFixed(1)}%`;

    li.append(swatch, label, pct);
    legend.appendChild(li);
  });
  container.appendChild(legend);
}

export function hydrateLiveStats(): void {
  if (typeof window === 'undefined') return;
  const hasStats = document.querySelector('[data-live-stat]');
  const hasHardware = document.querySelector('[data-live-hardware]');
  const hasHardwareChart = document.querySelector('[data-live-hardware-chart]');
  const hasBackbone = document.querySelector('[data-live-backbone]');
  if (!hasStats && !hasHardware && !hasHardwareChart && !hasBackbone) return;

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

      const chart30 = document.querySelectorAll<HTMLElement>('[data-live-hardware-chart="30d"]');
      chart30.forEach((c) => renderHardwareChart(c, stats.top_hardware_30d));
      const chartAll = document.querySelectorAll<HTMLElement>('[data-live-hardware-chart="all"]');
      chartAll.forEach((c) => renderHardwareChart(c, stats.top_hardware_all));

      const backbone = document.querySelectorAll<HTMLElement>('[data-live-backbone]');
      if (backbone.length > 0 && stats.backbone_nodes) {
        backbone.forEach((tbody) => renderBackboneTable(tbody, stats.backbone_nodes ?? []));
      }
    } catch {
      // Leave placeholders in place. Page is still meaningful.
    }
  })();
}
