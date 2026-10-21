import test from 'node:test';
import assert from 'node:assert/strict';
import { countUrgentNotifications, prioritizeNotifications } from '../src/utils/safetyNotifications.js';

const notifications = [
  { id: 'delivered', severity: 'low', date: '2026-10-20' },
  { id: 'overdue', severity: 'high', date: '2026-10-18' },
  { id: 'due', severity: 'medium', date: '2026-10-21' },
  { id: 'overdue', severity: 'high', date: '2026-10-19' },
];

test('places safety-critical notifications first and removes duplicates', () => {
  assert.deepEqual(prioritizeNotifications(notifications).map((item) => item.id), [
    'overdue', 'due', 'delivered',
  ]);
});

test('honors notification display limits', () => {
  assert.equal(prioritizeNotifications(notifications, 2).length, 2);
  assert.deepEqual(prioritizeNotifications(notifications, 0), []);
});

test('counts unique urgent notifications', () => {
  assert.equal(countUrgentNotifications(notifications), 1);
});
