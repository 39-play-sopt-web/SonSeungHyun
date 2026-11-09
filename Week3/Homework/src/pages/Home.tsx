import { useState } from 'react';
import styled from '@emotion/styled';
import Card from '../components/Card';
import Rating, { RATINGS, type RatingType } from '../components/Rating';
import { useMovieList } from '../hooks/useMovieList';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Home = () => {
  const [rating, setRating] = useState<RatingType>(RATINGS[0]);
  const { movieList, isLoading, isError, hasNext, loadMore } = useMovieList(rating);
  const bottomRef = useIntersectionObserver(loadMore, '800px');

  const handleSelectRating = (newRating: RatingType) => {
    if (newRating.label === rating.label) return;
    setRating(newRating);
  };

  const isEmpty = !isLoading && !isError && movieList.length === 0;
  const isEnd = !hasNext && !isError && movieList.length > 0;

  return (
    <Container>
      <PageTitle>영화 둘러보기</PageTitle>
      <Rating selected={rating} onSelect={handleSelectRating} />

      <Grid>
        {movieList.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </Grid>

      {isLoading && <Message>불러오는 중...</Message>}
      {isError && <Message>영화를 불러오지 못했어요.</Message>}
      {isEmpty && <Message>해당 점수대의 영화가 없습니다.</Message>}
      {isEnd && <Message>마지막 영화입니다.</Message>}

      {movieList.length > 0 && hasNext && <Bottom ref={bottomRef} />}
    </Container>
  );
};

export default Home;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

const Message = styled.p`
  margin: 24px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray};
`;

const Bottom = styled.div`
  height: 1px;
`;