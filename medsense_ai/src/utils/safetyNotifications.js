const SEVERITY_WEIGHT = Object.freeze({ high: 3, medium: 2, low: 1 });

function notificationTimestamp(notification) {
  const value = notification?.timestamp ?? notification?.created_at ?? notification?.date;
  const timestamp = new Date(value ?? 0).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function prioritizeNotifications(notifications, limit = 20) {
  if (!Array.isArray(notifications) || limit <= 0) return [];

  const unique = new Map();
  for (const notification of notifications) {
    if (!notification?.id || unique.has(notification.id)) continue;
    unique.set(notification.id, notification);
  }

  return [...unique.values()]
    .sort((left, right) => {
      const severityDifference =
        (SEVERITY_WEIGHT[right?.severity] ?? 0) - (SEVERITY_WEIGHT[left?.severity] ?? 0);
      return severityDifference || notificationTimestamp(right) - notificationTimestamp(left);
    })
    .slice(0, limit);
}

export function countUrgentNotifications(notifications) {
  return prioritizeNotifications(notifications, Number.MAX_SAFE_INTEGER)
    .filter((notification) => notification.severity === 'high').length;
}
