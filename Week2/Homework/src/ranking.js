export const getRanking = () => {
  const saved = localStorage.getItem("rankingKey");
  return saved ? JSON.parse(saved) : [];
};

export const saveRanking = (record) => {
  const rankings = getRanking();
  localStorage.setItem("rankingKey", JSON.stringify([...rankings, record]));
};

export const clearRanking = () => {
  localStorage.removeItem("rankingKey");
};