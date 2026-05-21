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

export interface StatusStat {
  label: string;
  value: string;
  delta: string;
  color: string;
}

export interface NodeRow {
  name: string;
  area: string;
  status: ActivityRow['status'];
  lastSeen: string;
  type: 'router' | 'client';
  hops: number | '—';
}

export const STATUS_STATS: StatusStat[] = [
  { label: 'Active nodes', value: '61', delta: '+3 this week', color: 'var(--success-500)' },
  { label: 'Registered', value: '134', delta: '+8 this week', color: 'var(--info-500)' },
  { label: 'Routers up', value: '4 / 6', delta: 'Independence down', color: 'var(--warning-500)' },
  { label: 'Messages / 24h', value: '1,247', delta: 'Long Fast channel', color: '#fff' },
];

export const STATUS_NODES: NodeRow[] = [
  { name: 'KCML', area: 'Downtown / KCMO', status: 'up', lastSeen: 'just now', type: 'router', hops: 0 },
  { name: 'WESTKC-01', area: 'Westport', status: 'up', lastSeen: '2m ago', type: 'router', hops: 1 },
  { name: 'OPK-ROOF', area: 'Overland Park', status: 'up', lastSeen: '4m ago', type: 'router', hops: 1 },
  { name: 'BLUSPRG-1', area: 'Blue Springs', status: 'degraded', lastSeen: '47m ago', type: 'client', hops: 3 },
  { name: 'INDEP-FX', area: 'Independence', status: 'down', lastSeen: '2d ago', type: 'router', hops: '—' },
  { name: 'LAWR-OUT', area: 'Lawrence, KS', status: 'up', lastSeen: '12m ago', type: 'client', hops: 4 },
  { name: 'TPKA-EDGE', area: 'Topeka, KS', status: 'up', lastSeen: '1h ago', type: 'client', hops: 5 },
  { name: 'COL-FRINGE', area: 'Columbia, MO', status: 'down', lastSeen: '5d ago', type: 'client', hops: '—' },
];
