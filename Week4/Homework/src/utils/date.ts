const toUtcDate = (iso: string) => {
  const hasTimezone = /Z|[+-]\d{2}:?\d{2}$/.test(iso);
  return new Date(hasTimezone ? iso : `${iso}Z`);
};

export const formatDate = (iso: string) =>
  toUtcDate(iso).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });