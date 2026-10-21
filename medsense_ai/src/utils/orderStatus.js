const ORDER_STATUS_FLOW = Object.freeze({
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['ready', 'cancelled'],
  ready: ['shipped', 'delivered', 'cancelled'],
  shipped: ['delivered'],
  delivered: ['refunded'],
  cancelled: [],
  refunded: [],
});

export function normalizeOrderStatus(status) {
  return String(status ?? '').trim().toLowerCase();
}

export function canTransitionOrderStatus(currentStatus, nextStatus) {
  const current = normalizeOrderStatus(currentStatus);
  const next = normalizeOrderStatus(nextStatus);
  return Boolean(current && next && ORDER_STATUS_FLOW[current]?.includes(next));
}

export function buildOrderStatusUpdate(status, paymentStatus = null) {
  const normalizedStatus = normalizeOrderStatus(status);

  if (!Object.hasOwn(ORDER_STATUS_FLOW, normalizedStatus)) {
    throw new TypeError(`Unsupported order status: ${status}`);
  }

  const update = { status: normalizedStatus };
  if (paymentStatus !== null && paymentStatus !== undefined) {
    const normalizedPaymentStatus = String(paymentStatus).trim().toLowerCase();
    if (!['pending', 'paid', 'failed', 'refunded'].includes(normalizedPaymentStatus)) {
      throw new TypeError(`Unsupported payment status: ${paymentStatus}`);
    }
    update.paymentStatus = normalizedPaymentStatus;
  }

  return update;
}

export const orderStatusFlow = ORDER_STATUS_FLOW;
