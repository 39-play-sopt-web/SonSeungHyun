import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { getMovies } from '../apis/movie';
import Card from '../components/Card';
import Rating, { RATINGS, type RatingType } from '../components/Rating';
import type { Movie } from '../types/movieType';

const MAX_PAGE = 500;

const Home = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [rating, setRating] = useState<RatingType>(RATINGS[0]); 
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSelectRating = (newRating: RatingType) => {
    if (newRating.label === rating.label) 
      return;
    setRating(newRating);
    setMovieList([]);
    setPage(1);
    setHasNext(true);
  };

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovies({ page, min: rating.min, max: rating.max });
        if (ignore)

          return;
        setMovieList((prev) => {
          if (page === 1) 
            return data.results;
          const prevIds = new Set(prev.map((movie) => movie.id));
          const newMovies = data.results.filter((movie) => !prevIds.has(movie.id));
          return [...prev, ...newMovies];
        });
        setHasNext(data.page < Math.min(data.total_pages, MAX_PAGE));
      } catch (error) {
        if (!ignore) 
          setHasNext(false);
      } finally {
        if (!ignore)
          setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };

  }, [page, rating]);

  useEffect(() => {
    const target = bottomRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading && hasNext) {
        setPage((prev) => prev + 1);
      }
    },
    { rootMargin: '800px' }
  );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isLoading, hasNext]);

  const isEmpty = !isLoading && movieList.length === 0;
  const isEnd = !hasNext && movieList.length > 0;

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