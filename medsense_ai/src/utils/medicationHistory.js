function historyTimestamp(record) {
  const value = record?.created_at ?? record?.createdAt ?? record?.uploaded_at ?? record?.date;
  const timestamp = new Date(value ?? 0).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function sortMedicationHistory(records) {
  if (!Array.isArray(records)) return [];
  return [...records].sort((left, right) => historyTimestamp(right) - historyTimestamp(left));
}

export function filterMedicationHistory(records, query = '') {
  const normalizedQuery = String(query).trim().toLowerCase();
  const sortedRecords = sortMedicationHistory(records);

  if (!normalizedQuery) return sortedRecords;

  return sortedRecords.filter((record) => {
    const searchable = [record?.title, record?.file_name, record?.status,
      ...(Array.isArray(record?.medicines) ? record.medicines : [])]
      .filter(Boolean).join(' ').toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}
