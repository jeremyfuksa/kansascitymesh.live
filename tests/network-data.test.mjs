import assert from 'node:assert/strict';
import test from 'node:test';
import {
  hardwareDistribution,
  observedAge,
  recentRouters,
  relativeAge,
  snapshotAge,
  STALE_AFTER_SECONDS,
  HARDWARE_PATHS,
} from '../src/utils/networkData.ts';
import { validateStats } from '../src/utils/liveStats.ts';

const now = Date.parse('2026-11-08T18:00:00Z');
test('freshness rejects invalid and future snapshots; old data stays explicitly stale', () => {
  assert.equal(snapshotAge('2026-11-08T17:55:00Z', now), 300);
  assert(snapshotAge('2026-11-08T17:00:00Z', now) > STALE_AFTER_SECONDS);
  assert.throws(() => snapshotAge('broken', now));
  assert.throws(() => snapshotAge('2026-11-09T18:00:00Z', now));
});
test('last-heard ages advance with the browser clock, including stale snapshots', () => {
  const epoch = now / 1000 - 3600;
  assert.equal(relativeAge(observedAge(epoch, now)), '1h ago');
  assert.equal(relativeAge(observedAge(epoch, now + 3600000)), '2h ago');
  assert.equal(observedAge(0, now), null);
  assert.equal(observedAge(now / 1000 + 3600, now), null);
  assert.equal(relativeAge(null), 'unknown');
  assert.equal(relativeAge(3599), '59m ago');
});
test('recent routers are sorted, limited, and exclude impossible timestamps without mutating input', () => {
  const rows = Array.from({ length: 9 }, (_, i) => ({
    last_heard_epoch: now / 1000 - i * 60,
    name: String(i),
  })).reverse();
  rows.push({ last_heard_epoch: 0, name: 'unknown' });
  const original = [...rows];
  assert.deepEqual(
    recentRouters(rows, now).map((r) => r.name),
    ['0', '1', '2', '3', '4', '5'],
  );
  assert.deepEqual(rows, original);
});
test('all-time chart uses exact totals rather than reconstructing from rounded percentages', () => {
  const result = hardwareDistribution(
    [
      { count: 116, percent: 33.1 },
      { count: 82, percent: 23.4 },
    ],
    351,
  );
  assert.equal(result.total, 351);
  assert.equal(result.other, 153);
  assert.equal(result.estimated, false);
  assert.equal(result.rows[0].percent, (116 / 351) * 100);
  assert.deepEqual(hardwareDistribution([], 0), { total: 0, rows: [], other: 0, estimated: false });
});
test('older 30-day payloads retain an explicitly estimated denominator', () => {
  assert.equal(hardwareDistribution([{ count: 20, percent: 50 }]).total, 40);
  assert.equal(hardwareDistribution([{ count: 20, percent: 50 }]).estimated, true);
});
const valid = () => ({
  generated_at: new Date().toISOString(),
  total_nodes: 30,
  nodes_with_hwmodel: 20,
  active_counts: { '1h': 1, '24h': 2, '7d': 3, '30d': 4, '90d': 5 },
  top_hardware_all: [],
  top_hardware_30d: [],
});
test('malformed API payloads cannot replace a last-good snapshot', () => {
  assert.doesNotThrow(() => validateStats(valid()));
  for (const patch of [
    { active_counts: null },
    { total_nodes: -1 },
    { top_hardware_all: [{}] },
    { backbone_nodes: [null] },
    { generated_at: 'garbage' },
  ]) {
    assert.throws(() => validateStats({ ...valid(), ...patch }));
  }
});
test('hardware links point only to known detail routes', () => {
  assert.equal(HARDWARE_PATHS.HELTEC_V3, '/hardware/heltec-v3-v4');
  assert.equal(HARDWARE_PATHS.RAK4631, '/hardware/rak-wisblock');
  assert.equal(HARDWARE_PATHS.UNKNOWN_DEVICE, undefined);
});
