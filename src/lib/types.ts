export interface Movie {
  id: number;
  title: string;
  genres: string[];
  overview: string;
  poster: string;
  release_date: number;
}

export interface ApiResponse {
  hits: Movie[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
}
