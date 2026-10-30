export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string | null;
    vote_count: number;
}

export interface MovieListResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface MovieDetail extends Movie {
  backdrop_path: string | null;
  original_title: string;
  original_language: string;
  tagline: string;
  runtime: number | null;
  status: string;
  genres: Genre[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  budget: number;
  revenue: number;
}