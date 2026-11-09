export const formatDate = (date: string) => {
  if (!date) return '개봉일 미정';
  const [year, month, day] = date.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};