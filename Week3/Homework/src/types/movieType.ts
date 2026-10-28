export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string | null;
}

export interface MovieListResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}