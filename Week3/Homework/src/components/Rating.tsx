import styled from '@emotion/styled';

export const RATINGS = [
  { label: '전체', min: 0, max: 10 },
  { label: '9점 이상', min: 9, max: 10 },
  { label: '8 ~ 9점', min: 8, max: 9 },
  { label: '7 ~ 8점', min: 7, max: 8 },
  { label: '6 ~ 7점', min: 6, max: 7 },
  { label: '6점 미만', min: 0, max: 6 },
 ] as const;

export type RatingType = (typeof RATINGS)[number];

interface RatingProps {
  selected: RatingType;
  onSelect: (rating: RatingType) => void;
}

const Rating = ({ selected, onSelect }: RatingProps) => {
  return (
    <RatingList>
      {RATINGS.map((rating) => (
        <RatingButton
          key={rating.label}
          type="button"
          isSelected={rating.label === selected.label}
          onClick={() => onSelect(rating)}
        >
          {rating.label}
        </RatingButton>
      ))}
    </RatingList>
  );
};

export default Rating;

const RatingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const RatingButton = styled.button<{ isSelected: boolean }>`
  padding: 6px 14px;
  border: none;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? '#000' : '#fff')};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.mint : theme.colors.card};
`;

