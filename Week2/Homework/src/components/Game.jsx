import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { LEVEL_CHOICE } from "../level";
import { createNumbers, random } from "../number";
import { saveRanking } from "../ranking";

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

  &:disabled {
    visibility: hidden;
  }
`;

const Game = ({level, onTimeChange}) => {
  const { size, maxNumber } = LEVEL_CHOICE[level];
  const count = size * size;

  const [board, setBoard] = useState(() => random(createNumbers(1, count)));
  const [queue, setQueue] = useState(() => random(createNumbers(count + 1, maxNumber)));
  const [nextNumber, setNextNumber] = useState(1);

  const [isPlaying, setIsPlaying] = useState(false);
  const startTime = useRef(0);

  const Click = (index) => {
    if (board[index] !== nextNumber)
      return;

    if (nextNumber === maxNumber) {
      finishGame();
      return;
    }

    if(nextNumber === 1) {
      startTime.current = Date.now();
      setIsPlaying(true);
    }

    const newBoard = [...board];
    newBoard[index] = queue.length > 0 ? queue[0] : null;

    setBoard(newBoard);
    setQueue(queue.slice(1));
    setNextNumber(nextNumber + 1);
  }

  useEffect(() => {
    if(!isPlaying)
      return;

    const presstime = setInterval(() => {
      const time = (Date.now() - startTime.current) / 1000;
      onTimeChange(time);
    }, 10);
    return () => clearInterval(presstime);
  }, [isPlaying, onTimeChange]);

  const resetGame = () => {
    setBoard(random(createNumbers(1, count)));
    setQueue(random(createNumbers(count + 1, maxNumber)));
    setNextNumber(1);
    setIsPlaying(false);
    onTimeChange(0);
  };

  const finishGame = () => {
    const playTime = Number(((Date.now() - startTime.current) / 1000).toFixed(2));

    saveRanking({
      level,
      time: playTime,
      date: new Date().toISOString(),
    });
    alert(`게임이 종료되었습니다. 걸린 시간은 ${playTime.toFixed(2)}초 입니다.`);
    resetGame();
  }


  return (
    <Wrapper>
      <NextInfo>
        다음 숫자 <strong>{nextNumber}</strong> ({nextNumber} / {maxNumber})
      </NextInfo>

      <Board $size={size}>
        {board.map((number, index) => (
          <Cell 
            key={index} 
            type="button"
            disabled={number === null}
            onClick={() => Click(index)}
          >
            {number}
          </Cell>
        ))}
      </Board>
    </Wrapper>
  );
};

export default Game;