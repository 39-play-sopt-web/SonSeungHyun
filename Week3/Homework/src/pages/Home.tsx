import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getMovies } from '../apis/movie';
import Card from '../components/Card';
import type { Movie } from '../types/movieType';

const Home = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovies({ page: 1, min: 0, max: 10 });
        setMovieList(data.results);
      } catch (error) {
        console.error('영화 목록을 불러오는 데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <PageTitle>영화 둘러보기</PageTitle>
      <Grid>
        {movieList.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </Grid>
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