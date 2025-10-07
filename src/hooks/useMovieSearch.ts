import { useState, useCallback, useEffect } from "react";
import type { Movie } from "@/types";
import { CONFIG } from "@/config/constants";
import { fetchMovies } from "@/lib/api";

interface UseMovieSearchReturn {
    movies: Movie[];
    isLoading: boolean;
    error: string | null;
    searchMovies: (query: string) => Promise<void>;
    clearError: () => void;
}

export const useMovieSearch = (): UseMovieSearchReturn => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchMovies = useCallback(async (query: string) => {
        if (query.trim().length < CONFIG.SEARCH.MIN_QUERY_LENGTH) {
            // 当搜索词为空时，显示推荐影片
            try {
                const movies = await fetchMovies("", CONFIG.SEARCH.DEFAULT_LIMIT);
                setMovies(movies);
            } catch (err) {
                setMovies([]);
            }
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const movies = await fetchMovies(query, CONFIG.SEARCH.DEFAULT_LIMIT);
            setMovies(movies);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : CONFIG.MESSAGES.ERROR.GENERIC_ERROR;
            setError(errorMessage);
            setMovies([]);

            if (CONFIG.DEV.ENABLE_LOGGING) {
                console.error("Search error:", err);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // 组件挂载时加载推荐影片
    useEffect(() => {
        searchMovies("");
    }, [searchMovies]);

    return {
        movies,
        isLoading,
        error,
        searchMovies,
        clearError,
    };
};
