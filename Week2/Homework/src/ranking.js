export const getRankings = () => {
  const saved = localStorage.getItem("rankingKey");
  return saved ? JSON.parse(saved) : [];
};

export const saveRanking = (record) => {
  const rankings = getRankings();
  localStorage.setItem("rankingKey", JSON.stringify([...rankings, record]));
};