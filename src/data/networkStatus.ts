export interface NetworkStat {
  label: string;
  value: string;
  unit: string;
  /** CSS color value (var(...) or hex). */
  color: string;
}

export interface ActivityRow {
  node: string;
  area: string;
  when: string;
  status: 'up' | 'degraded' | 'down';
}

export const NETWORK_STATS: NetworkStat[] = [
  { label: 'Nodes online', value: '61', unit: '↑ 3 / wk', color: 'var(--success-500)' },
  { label: 'Routers up', value: '4', unit: '/ 6', color: 'var(--warning-500)' },
  { label: 'Msgs · 24 h', value: '1,247', unit: 'Long Fast', color: '#fff' },
];

export const NETWORK_ACTIVITY: ActivityRow[] = [
  { node: 'KCML', area: 'Downtown', when: 'just now', status: 'up' },
  { node: 'WESTKC-01', area: 'Westport', when: '2m', status: 'up' },
  { node: 'OPK-ROOF', area: 'Overland Park', when: '4m', status: 'up' },
  { node: 'BLUSPRG-1', area: 'Blue Springs', when: '47m', status: 'degraded' },
  { node: 'LAWR-OUT', area: 'Lawrence, KS', when: '12m', status: 'up' },
  { node: 'INDEP-FX', area: 'Independence', when: '2d', status: 'down' },
];

export const statusColor: Record<ActivityRow['status'], string> = {
  up: 'var(--success-500)',
  degraded: 'var(--warning-500)',
  down: 'var(--danger-500)',
};
