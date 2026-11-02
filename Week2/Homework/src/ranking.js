const RANKING_KEY = "rankingKey";

export const getRanking = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(RANKING_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveRanking = (record) => {
  const rankings = getRanking();
  localStorage.setItem(RANKING_KEY, JSON.stringify([...rankings, record]));
};

export const clearRanking = () => {
  localStorage.removeItem(RANKING_KEY);
};