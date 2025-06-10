export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres?: { id: number; name: string }[];
}
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideoResponse {
  id: number;
  results: Video[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}
export interface TrailerProps {
  movieId: number | string;
}

export interface TrailerVideo {
  id: string;
  key: string;
  name: string;
}
