import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { LEVEL_CHOICE } from "../level";
import { createNumbers, random } from "../number";
import { saveRanking } from "../ranking";
import Modal from "./Modal";

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

const CELL = 100;
const GAP = 6;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $size }) => $size}, 1fr);
  gap: ${GAP}px;
  width: min(
    100% - 32px,
    ${({ $size }) => $size * CELL + ($size - 1) * 6}px
  );
`;

const Cell = styled.button`
  width: 100px;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: clamp(16px, 5vw, ${({ theme }) => theme.fonts.xl});
  font-weight: 700;
  cursor: pointer;

  transition: background-color 0.1s;
  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.bluegreen};
  }

  &:disabled {
    visibility: hidden;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 8px;
  font-size: ${({ theme }) => theme.fonts.lg};
`;

const ModalText = styled.p`
  margin: 0 0 24px;
  font-size: ${({ theme }) => theme.fonts.md};
`;

const ConfirmButton = styled.button`
  padding: 8px 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  cursor: pointer;
`;

const Game = ({level, onTimeChange}) => {
  const { size, maxNumber } = LEVEL_CHOICE[level];
  const count = size * size;

  const [board, setBoard] = useState(() => random(createNumbers(1, count)));
  const [queue, setQueue] = useState(() => random(createNumbers(count + 1, maxNumber)));
  const [nextNumber, setNextNumber] = useState(1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
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

    setIsPlaying(false);
    onTimeChange(playTime);
    saveRanking({
      level,
      time: playTime,
      date: new Date().toISOString(),
    });
    setResult(playTime);
  };

  const handleConfirm = () => {
    setResult(null);
    resetGame();
  };

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
      {result !== null && (
        <Modal>
          <ModalTitle>게임 종료!</ModalTitle>
          <ModalText>걸린 시간: {result.toFixed(2)}초</ModalText>
          <ConfirmButton type="button" onClick={handleConfirm}>
            확인
          </ConfirmButton>
        </Modal>
      )}
    </Wrapper>
  );
};

export default Game;