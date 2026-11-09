/** Hydrate the public MeshMonitor snapshot without implying continuous coverage. */
import {
  HARDWARE_PATHS,
  STALE_AFTER_SECONDS,
  hardwareDistribution,
  observedAge,
  recentRouters,
  relativeAge,
  snapshotAge,
} from './networkData.ts';

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
  if (n === null || n === undefined || !Number.isFinite(n)) return '—';
  return n.toLocaleString('en-US');
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

      const path = HARDWARE_PATHS[row.name];
      const nameEl = document.createElement(path ? 'a' : 'div');
      if (nameEl instanceof HTMLAnchorElement && path) {
        nameEl.href = path;
        nameEl.className = 'underline underline-offset-4 hover:text-(--success-500)';
      }
      nameEl.classList.add('text-white', 'text-sm', 'font-medium');
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
    dot.style.background = backboneStatusColor(observedAge(row.last_heard_epoch));
    dot.setAttribute('aria-label', `Last heard ${relativeAge(observedAge(row.last_heard_epoch))}`);
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
    seenCell.className = 'px-4 py-3.5 text-white/70 text-sm font-mono';
    seenCell.title = new Date(row.last_heard_epoch * 1000).toLocaleString();
    seenCell.textContent = relativeAge(observedAge(row.last_heard_epoch));

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

function buildChartSlices(
  rows: MeshtasticStats['top_hardware_30d'],
  total?: number,
): {
  slices: ChartSlice[];
  totalCount: number;
} {
  const distribution = hardwareDistribution(rows, total);
  const totalCount = distribution.total;
  const slices: ChartSlice[] = distribution.rows.map((row, i) => ({
    label: hardwareEntry(row.name).name,
    color: SLICE_COLORS[i] ?? OTHER_COLOR,
    count: row.count,
    percent: row.percent,
  }));
  if (distribution.other > 0) {
    slices.push({
      label: 'Other',
      color: OTHER_COLOR,
      count: distribution.other,
      percent: (distribution.other / totalCount) * 100,
    });
  }
  return { slices, totalCount };
}

const SVG_NS = 'http://www.w3.org/2000/svg';

function renderHardwareChart(
  container: HTMLElement,
  rows: MeshtasticStats['top_hardware_30d'],
  total?: number,
): void {
  const { slices, totalCount } = buildChartSlices(rows, total);
  container.replaceChildren();

  // Donut geometry. We use a 100×100 viewBox, a circle of radius 40
  // centered at (50, 50). Circumference = 2π·40 ≈ 251.327.
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 16;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'block w-full h-auto max-w-[420px] mx-auto');
  svg.setAttribute('role', 'img');
  svg.setAttribute(
    'aria-label',
    `Hardware distribution: ${slices.map((s) => `${s.label}, ${s.count} nodes`).join('; ')}`,
  );

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
    label.className = 'flex-1 min-w-0 text-white/70';
    label.textContent = slice.label;

    const pct = document.createElement('span');
    pct.className = 'font-mono text-white/50 tabular-nums';
    pct.textContent = `${slice.count.toLocaleString('en-US')} · ${slice.percent.toFixed(1)}%`;

    li.append(swatch, label, pct);
    legend.appendChild(li);
  });
  container.appendChild(legend);
}

function renderRecentActivity(rows: BackboneNode[]): void {
  document.querySelectorAll<HTMLElement>('[data-live-recent-activity]').forEach((container) => {
    container.replaceChildren();
    const recent = recentRouters(rows);
    if (!recent.length) {
      container.textContent = 'No recent router observations in this snapshot.';
      return;
    }
    recent.forEach((row) => {
      const item = document.createElement('div');
      item.className =
        'flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3.5 border-b border-white/5';
      const name = document.createElement('span');
      name.className = 'font-mono text-white text-sm';
      name.textContent = row.short_name || 'Unnamed router';
      const detail = document.createElement('span');
      detail.className = 'flex-1 min-w-0 text-white/70 text-sm break-words';
      detail.textContent = row.long_name || row.role || 'Router';
      const time = document.createElement('time');
      time.className = 'font-mono text-white/50 text-xs';
      time.dateTime = new Date(row.last_heard_epoch * 1000).toISOString();
      time.title = new Date(row.last_heard_epoch * 1000).toLocaleString();
      time.textContent = relativeAge(observedAge(row.last_heard_epoch));
      item.append(name, detail, time);
      container.appendChild(item);
    });
  });
}

/** Required fields are validated before replacing any last-good snapshot. */
export function validateStats(value: unknown): MeshtasticStats {
  if (!value || typeof value !== 'object') throw new Error('Invalid snapshot');
  const stats = value as MeshtasticStats;
  if (typeof stats.generated_at !== 'string') throw new Error('Missing snapshot timestamp');
  snapshotAge(stats.generated_at);
  const count = (n: unknown) => typeof n === 'number' && Number.isInteger(n) && n >= 0;
  if (
    !count(stats.total_nodes) ||
    !count(stats.nodes_with_hwmodel) ||
    !stats.active_counts ||
    !['1h', '24h', '7d', '30d', '90d'].every((k) =>
      count(stats.active_counts[k as keyof typeof stats.active_counts]),
    )
  ) {
    throw new Error('Invalid node counts');
  }
  for (const rows of [stats.top_hardware_all, stats.top_hardware_30d]) {
    if (
      !Array.isArray(rows) ||
      !rows.every(
        (row) =>
          row &&
          typeof row.name === 'string' &&
          count(row.count) &&
          Number.isFinite(row.percent) &&
          row.percent >= 0 &&
          row.percent <= 100,
      )
    ) {
      throw new Error('Invalid hardware counts');
    }
  }
  if (
    stats.nodes_with_hwmodel > stats.total_nodes ||
    stats.top_hardware_all.reduce((sum, row) => sum + row.count, 0) > stats.nodes_with_hwmodel
  ) {
    throw new Error('Inconsistent hardware total');
  }
  for (const countValue of [
    stats.message_count,
    stats.channel_count,
    stats.discord_total_members,
    stats.discord_online,
  ]) {
    if (countValue !== undefined && countValue !== null && !count(countValue))
      throw new Error('Invalid optional count');
  }
  if (
    stats.backbone_nodes !== undefined &&
    (!Array.isArray(stats.backbone_nodes) ||
      !stats.backbone_nodes.every(
        (row) =>
          row &&
          typeof row.short_name === 'string' &&
          typeof row.long_name === 'string' &&
          Number.isFinite(row.last_heard_epoch) &&
          (row.hw_model_name == null || typeof row.hw_model_name === 'string') &&
          (row.role == null || typeof row.role === 'string') &&
          (row.hops == null || count(row.hops)),
      ))
  ) {
    throw new Error('Invalid router observations');
  }
  return stats;
}

export function hydrateLiveStats(): void {
  if (
    typeof window === 'undefined' ||
    !document.querySelector('[data-live-stat], [data-live-hardware], [data-live-recent-activity]')
  )
    return;
  let current: MeshtasticStats | undefined;
  let failed = false;
  let refreshing = false;
  const freshness = () => {
    let label = 'Observations unavailable — retrying automatically';
    let state = 'unavailable';
    if (current) {
      const age = snapshotAge(current.generated_at);
      state = failed || age > STALE_AFTER_SECONDS ? 'stale' : 'fresh';
      label = `${state === 'fresh' ? 'Snapshot' : 'Stale snapshot'} · updated ${relativeAge(age)}${failed ? ' · refresh failed' : ''}`;
      replaceStat('generated_at_relative', relativeAge(age));
    }
    document.querySelectorAll<HTMLElement>('[data-live-status]').forEach((el) => {
      el.textContent = label;
      el.dataset.state = state;
    });
  };
  const refresh = async () => {
    if (refreshing) return;
    refreshing = true;
    try {
      const res = await fetch(STATS_URL, { cache: 'no-store', signal: AbortSignal.timeout(12000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const stats = validateStats(await res.json());
      for (const key of ['1h', '24h', '7d', '30d', '90d'] as const)
        replaceStat(`active_${key}`, formatNumber(stats.active_counts[key]));
      for (const key of [
        'total_nodes',
        'nodes_with_hwmodel',
        'message_count',
        'channel_count',
        'discord_total_members',
        'discord_online',
      ] as const)
        replaceStat(key, formatNumber(stats[key]));
      for (const period of ['30d', 'all'] as const) {
        const rows = stats[period === 'all' ? 'top_hardware_all' : 'top_hardware_30d'];
        const list = document.querySelectorAll<HTMLElement>(`[data-live-hardware="${period}"]`);
        renderHardwareList(
          list,
          period === 'all' ? hardwareDistribution(rows, stats.nodes_with_hwmodel).rows : rows,
        );
        document
          .querySelectorAll<HTMLElement>(`[data-live-hardware-chart="${period}"]`)
          .forEach((c) => {
            if (!rows.length) {
              c.textContent = 'No hardware observations in this snapshot.';
              return;
            }
            renderHardwareChart(c, rows, period === 'all' ? stats.nodes_with_hwmodel : undefined);
          });
        if (!rows.length)
          list.forEach((c) => {
            c.textContent = 'No hardware observations in this snapshot.';
          });
      }
      const routers = stats.backbone_nodes ?? [];
      document.querySelectorAll<HTMLElement>('[data-live-backbone]').forEach((tbody) => {
        renderBackboneTable(tbody, routers);
        if (!routers.length) {
          const cell = document.createElement('td');
          cell.colSpan = 6;
          cell.className = 'px-4 py-3 text-white/70';
          cell.textContent = 'No router observations in this snapshot.';
          const row = document.createElement('tr');
          row.append(cell);
          tbody.append(row);
        }
      });
      renderRecentActivity(routers);
      current = stats;
      failed = false;
    } catch {
      failed = true;
      if (!current) {
        document
          .querySelectorAll<HTMLElement>(
            '[data-live-hardware], [data-live-hardware-chart], [data-live-recent-activity]',
          )
          .forEach((el) => {
            el.textContent = 'Observations unavailable. We’ll try again shortly.';
          });
      }
    } finally {
      refreshing = false;
      freshness();
    }
  };
  void refresh();
  window.setInterval(() => {
    if (!document.hidden) void refresh();
  }, 60000);
  window.setInterval(() => {
    if (current) {
      renderRecentActivity(current.backbone_nodes ?? []);
      document.querySelectorAll<HTMLElement>('[data-live-backbone]').forEach((t) => {
        if (current?.backbone_nodes?.length) renderBackboneTable(t, current.backbone_nodes);
      });
      freshness();
    }
  }, 30000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) void refresh();
  });
}
