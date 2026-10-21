import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildOrderStatusUpdate,
  canTransitionOrderStatus,
  normalizeOrderStatus,
} from '../src/utils/orderStatus.js';

test('normalizes status values before sending them to the API', () => {
  assert.equal(normalizeOrderStatus('  PROCESSING '), 'processing');
  assert.deepEqual(buildOrderStatusUpdate('READY', 'PAID'), {
    status: 'ready',
    paymentStatus: 'paid',
  });
});

test('recognizes allowed order lifecycle transitions', () => {
  assert.equal(canTransitionOrderStatus('pending', 'confirmed'), true);
  assert.equal(canTransitionOrderStatus('delivered', 'processing'), false);
});

test('rejects unsupported order and payment statuses', () => {
  assert.throws(() => buildOrderStatusUpdate('unknown'), /Unsupported order status/);
  assert.throws(() => buildOrderStatusUpdate('pending', 'unknown'), /Unsupported payment status/);
});
