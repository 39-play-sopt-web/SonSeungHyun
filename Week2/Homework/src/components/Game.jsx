import { useState } from "react";
import styled from "@emotion/styled";
import { LEVEL_CHOICE } from "../level";
import { createNumbers, random } from "../number";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 40px;
`;

const NextInfo = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fonts.sm};

  strong {
    font-size: ${({ theme }) => theme.fonts.lg};
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $size }) => $size}, 72px);
  gap: 6px;
`;

const Cell = styled.button`
  width: 72px;
  height: 72px;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.md};
  font-weight: 700;
  cursor: pointer;
`;

const Game = ({level}) => {
  const { size, maxNumber } = LEVEL_CHOICE[level];
  const count = size * size;

  const [board, setBoard] = useState(() => random(createNumbers(1,count)));
  const [nextNumber, setNextNumber] = useState(1);

  return (
    <Wrapper>
      <NextInfo>
        다음 숫자 <strong>{nextNumber}</strong> ({nextNumber} / {maxNumber})
      </NextInfo>

      <Board $size={size}>
        {board.map((number, index) => (
          <Cell key={index} type="button">
            {number}
          </Cell>
        ))}
      </Board>
    </Wrapper>
  );
};

export default Game;