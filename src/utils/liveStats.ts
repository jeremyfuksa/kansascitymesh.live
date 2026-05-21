/**
 * Runtime hydration of "live" stats on the site.
 *
 * One source: `/api/stats.json`, generated server-side by
 * /home/admin/generate-mesh-stats.py on a 12-hour cron. The script fetches
 * MeshMonitor's API plus the Discord guild API and writes a unified blob.
 *
 * Elements opt in by adding `data-live-stat="<key>"`. The HTML carries
 * a placeholder value (em-dash, "just now", etc.) as its text content;
 * this script swaps it once the fetch completes. If the fetch fails, the
 * placeholder stays — the page is still meaningful.
 *
 * Keys are flat, dot-free strings so they're easy to read in HTML:
 *
 *   data-live-stat="active_1h"
 *   data-live-stat="active_24h"
 *   data-live-stat="active_7d"
 *   data-live-stat="active_30d"
 *   data-live-stat="active_90d"
 *   data-live-stat="total_nodes"
 *   data-live-stat="nodes_with_hwmodel"
 *   data-live-stat="message_count"
 *   data-live-stat="channel_count"
 *   data-live-stat="discord_total_members"
 *   data-live-stat="discord_online"
 *   data-live-stat="generated_at_relative"   (e.g. "2m ago")
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

export function hydrateLiveStats(): void {
  if (typeof window === 'undefined') return;
  if (!document.querySelector('[data-live-stat]')) return;

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
    } catch {
      // Leave placeholders in place. Page is still meaningful.
    }
  })();
}
