import styled from '@emotion/styled';
import { Link } from 'react-router';
import type { Movie } from '../types/movieType';
import { POSTER_BASE_URL } from '../image';


const formatDate = (date: string) => {
  if (!date) 
    return '개봉일 미정';
  const [year, month, day] = date.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { id, title, poster_path, release_date, overview, vote_average } = movie;

  return (
    <Card to={`/movies/${id}`}>
      <PosterWrapper>
        {poster_path ? (
          <Poster src={`${POSTER_BASE_URL}${poster_path}`} alt={title} />
        ) : (
          <NoPoster>이미지 없음</NoPoster>
        )}
        <Rating>★ {vote_average.toFixed(1)}</Rating>
      </PosterWrapper>
      <Info>
        <Title>{title}</Title>
        <ReleaseDate>{formatDate(release_date)}</ReleaseDate>
        <Overview>{overview || '줄거리 정보가 없습니다.'}</Overview>
      </Info>
    </Card>
  );
};

export default MovieCard;

const Card = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.card};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    z-index: 1;
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  }
`;

const PosterWrapper = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoPoster = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.gray};
`;

const Rating = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #000;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
`;

const Title = styled.h3`
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ReleaseDate = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
`;

const Overview = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;