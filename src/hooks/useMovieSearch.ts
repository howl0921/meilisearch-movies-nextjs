import { useCallback, useState } from "react";
import { CONFIG } from "@/config/constants";
import { fetchMovies } from "@/lib/api";
import type { Movie } from "@/types";

interface UseMovieSearchReturn {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  searchMovies: (query: string) => Promise<void>;
  clearError: () => void;
}

export const useMovieSearch = (): UseMovieSearchReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 初始状态为加载中
  const [error, setError] = useState<string | null>(null);

  const searchMovies = useCallback(async (query: string) => {
    if (query.trim().length < CONFIG.MIN_QUERY_LENGTH) {
      // 当搜索词为空时，显示推荐影片
      setIsLoading(true);
      setError(null);
      try {
        const movies = await fetchMovies("", CONFIG.DEFAULT_LIMIT);
        setMovies(movies);
      } catch (_err) {
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const movies = await fetchMovies(query, CONFIG.DEFAULT_LIMIT);
      setMovies(movies);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : CONFIG.ERRORS.GENERIC;
      setError(errorMessage);
      setMovies([]);

      if (CONFIG.IS_DEV) {
        console.error("Search error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 移除自动加载，完全由 useMovies 的防抖逻辑控制
  // useEffect(() => {
  //   loadInitialMovies();
  // }, []);

  return {
    movies,
    isLoading,
    error,
    searchMovies,
    clearError,
  };
};
