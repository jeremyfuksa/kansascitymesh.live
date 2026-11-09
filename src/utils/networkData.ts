/** Rules shared by the browser and fixture tests. No network or DOM side effects. */
export const STALE_AFTER_SECONDS = 15 * 60;

export function snapshotAge(timestamp: string, now = Date.now()): number {
  const then = Date.parse(timestamp);
  if (!Number.isFinite(then) || then > now + 60_000) {
    throw new Error('Invalid snapshot timestamp');
  }
  return Math.max(0, (now - then) / 1000);
}

export function relativeAge(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds)) return 'unknown';
  const age = Math.max(0, Math.floor(seconds));
  if (age < 60) return 'just now';
  if (age < 3600) return `${Math.floor(age / 60)}m ago`;
  if (age < 86400) return `${Math.floor(age / 3600)}h ago`;
  return `${Math.floor(age / 86400)}d ago`;
}

export function observedAge(epoch: number, now = Date.now()): number | null {
  if (!Number.isFinite(epoch) || epoch <= 0 || epoch * 1000 > now + 60_000) return null;
  return Math.max(0, (now - epoch * 1000) / 1000);
}

export function recentRouters<T extends { last_heard_epoch: number }>(
  rows: T[],
  now = Date.now(),
): T[] {
  return rows
    .filter((row) => observedAge(row.last_heard_epoch, now) !== null)
    .sort((a, b) => b.last_heard_epoch - a.last_heard_epoch)
    .slice(0, 6);
}

export const HARDWARE_PATHS: Record<string, string> = {
  HELTEC_V3: '/hardware/heltec-v3-v4',
  HELTEC_V4: '/hardware/heltec-v3-v4',
  RAK4631: '/hardware/rak-wisblock',
  TRACKER_T1000_E: '/hardware/t1000e',
  T_DECK: '/hardware/lilygo-t-deck',
};

export function hardwareDistribution<T extends { count: number; percent: number }>(
  rows: T[],
  total?: number,
) {
  const top = rows.slice(0, 5);
  // All-time data supplies an exact denominator. Older / 30-day snapshots
  // only supply rounded percentages, so mark that denominator as estimated.
  const exact = total !== undefined && Number.isInteger(total) && total >= 0;
  const first = top.find((row) => row.percent > 0);
  const sum = top.reduce((n, row) => n + row.count, 0);
  const count = exact
    ? total
    : first
      ? Math.max(sum, Math.round((first.count / first.percent) * 100))
      : sum;
  return {
    total: count,
    estimated: !exact,
    rows: top.map((row) => ({ ...row, percent: count ? (row.count / count) * 100 : 0 })),
    other: Math.max(0, count - sum),
  };
}
