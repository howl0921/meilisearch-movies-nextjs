import { useEffect, useMemo, useState } from "react";
import { fetchMovies } from "@/lib/api";
import type { Movie } from "@/lib/types";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [showWatchlist, setShowWatchlist] = useState(false);

  // 加载初始电影数据
  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      const movieData = await fetchMovies();
      setMovies(movieData);
      setIsLoading(false);
    };
    loadMovies();
  }, []);

  // 搜索功能 - 优化防抖时间到500ms
  useEffect(() => {
    const searchMovies = async () => {
      if (searchTerm.trim()) {
        setIsLoading(true);
        const searchResults = await fetchMovies(searchTerm);
        setMovies(searchResults);
        setIsLoading(false);
      } else {
        // 如果搜索框为空，重新加载所有电影
        const allMovies = await fetchMovies();
        setMovies(allMovies);
      }
    };

    const timeoutId = setTimeout(searchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // 过滤电影
  const filteredMovies = useMemo(() => {
    let filtered = [...movies];

    if (showWatchlist) {
      filtered = filtered.filter((movie) => watchlist.includes(movie.id));
    }

    return filtered;
  }, [movies, showWatchlist, watchlist]);

  // 切换收藏状态
  const toggleWatchlist = (movieId: number) => {
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId],
    );
  };

  // 检查是否在收藏列表中
  const isInWatchlist = (movieId: number) => watchlist.includes(movieId);

  return {
    movies: filteredMovies,
    searchTerm,
    setSearchTerm,
    isLoading,
    watchlist,
    showWatchlist,
    setShowWatchlist,
    toggleWatchlist,
    isInWatchlist,
  };
};
