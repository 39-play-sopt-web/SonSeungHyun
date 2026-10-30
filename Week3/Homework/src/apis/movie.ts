import apiClient from './apiClient';
import type { MovieDetail, MovieListResponse } from '../types/movieType';

interface GetMoviesParams {
    page: number;
    min: number;
    max: number;
}

export const getMovies = async({page, min, max}: GetMoviesParams) => {
    const res = await apiClient.get<MovieListResponse>('/discover/movie', {
        params: {page, 'vote_average.gte': min, 'vote_average.lte': max },
    });
    return res.data;
};

export const getMovieById = async (movieId: string) => {
  const res = await apiClient.get<MovieDetail>(`/movie/${movieId}`);
  return res.data;
};
