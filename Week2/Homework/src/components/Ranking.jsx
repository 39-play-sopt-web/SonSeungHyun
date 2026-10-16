import { useState } from "react";
import styled from "@emotion/styled";
import { clearRanking, getRanking } from "../ranking";

const Wrapper = styled.section`
  max-width: 640px;
  margin: 40px auto 0;
  padding: 0 16px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fonts.lg};
`;

const ClearButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fonts.xs};
  cursor: pointer;
`;

const TableWrapper = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fonts.sm};

  th,
  td {
    padding: 10px 16px;
    text-align: left;
  }

  thead {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  tbody {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const EmptyCell = styled.td`
  text-align: center !important;
  color: #888;
`;

const format = (String) => new Date(String).toLocaleString("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const Ranking = () => {
  const [ranking, setRanking] = useState(() => getRanking());
  const sortedRanking = ranking.toSorted((a, b) => a.time - b.time);
  const handleClear = () => {
    clearRanking();
    setRanking([]);
  };
  return (
    <Wrapper>
      <TitleRow>
        <Title>랭킹</Title>
        <ClearButton type="button" onClick={handleClear}>
          초기화
        </ClearButton>
      </TitleRow>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>순위</th>
              <th>레벨</th>
              <th>클리어 시간</th>
              <th>기록 시각</th>
            </tr>
          </thead>
          <tbody>
            {sortedRanking.length === 0 ? (
              <tr>
                <EmptyCell colSpan={4}>아직 기록이 없어요</EmptyCell>
              </tr>
            ) : (
              sortedRanking.map((record, index) => (
                <tr key={record.date}>
                  <td>{index + 1}</td>
                  <td>Level {record.level}</td>
                  <td>{record.time.toFixed(2)}초</td>
                  <td>{format(record.date)}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrapper>
  );
};

export default Ranking;