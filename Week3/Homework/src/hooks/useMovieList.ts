import { useCallback, useEffect, useState } from 'react';
import { getMovies } from '../apis/movie';
import { type RatingType } from '../components/Rating';
import type { Movie } from '../types/movieType';

const MAX_PAGE = 500;

export const useMovieList = (rating: RatingType) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [prevRating, setPrevRating] = useState(rating);

  if (prevRating !== rating) {
    setPrevRating(rating);
    setMovieList([]);
    setPage(1);
    setHasNext(true);
    setIsLoading(true);
    setIsError(false);
  }

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getMovies({ page, min: rating.min, max: rating.max });
        if (ignore) return;
        setMovieList((prev) => {
          if (page === 1) return data.results;
          const prevIds = new Set(prev.map((movie) => movie.id));
          const newMovies = data.results.filter((movie) => !prevIds.has(movie.id));
          return [...prev, ...newMovies];
        });
        setHasNext(data.page < Math.min(data.total_pages, MAX_PAGE));
      } catch {
        if (!ignore) setIsError(true);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, [page, rating]);

  const loadMore = useCallback(() => {
    if (!isLoading && !isError && hasNext) setPage((prev) => prev + 1);
  }, [isLoading, isError, hasNext]);

  return { movieList, isLoading, isError, hasNext, loadMore };
};