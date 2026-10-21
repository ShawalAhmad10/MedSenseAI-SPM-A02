import test from 'node:test';
import assert from 'node:assert/strict';
import { filterMedicationHistory, sortMedicationHistory } from '../src/utils/medicationHistory.js';

const records = [
  { id: 1, title: 'Blood pressure medicines', medicines: ['Amlodipine'], created_at: '2026-10-01' },
  { id: 2, file_name: 'diabetes.png', medicines: ['Metformin'], created_at: '2026-10-18' },
  { id: 3, status: 'confirmed', medicines: ['Cetirizine'], created_at: '2026-10-10' },
];

test('sorts medication history newest first without mutating the source', () => {
  const sorted = sortMedicationHistory(records);
  assert.deepEqual(sorted.map((record) => record.id), [2, 3, 1]);
  assert.deepEqual(records.map((record) => record.id), [1, 2, 3]);
});

test('filters history by medicine name and file metadata', () => {
  assert.deepEqual(filterMedicationHistory(records, 'metformin').map((record) => record.id), [2]);
  assert.deepEqual(filterMedicationHistory(records, 'confirmed').map((record) => record.id), [3]);
});

test('returns an empty list for malformed history responses', () => {
  assert.deepEqual(sortMedicationHistory(null), []);
});
