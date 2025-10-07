import { useCallback, useEffect, useMemo, useState } from "react";
import { CONFIG } from "@/config/constants";
import type { UseMoviesReturn } from "@/types";
import { useMovieSearch } from "./useMovieSearch";
import { useWatchlist } from "./useWatchlist";

export const useMovies = (): UseMoviesReturn => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showWatchlist, setShowWatchlist] = useState(false);

  // 使用专用的搜索和观看列表 hooks
  const {
    movies: searchResults,
    isLoading,
    searchMovies,
    clearError,
  } = useMovieSearch();
  const { watchlist, isInWatchlist, toggleWatchlist } = useWatchlist();

  // 防抖搜索（包括初始化）
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        searchMovies(searchTerm);
      },
      searchTerm === "" ? 0 : CONFIG.SEARCH_DEBOUNCE,
    ); // 初始加载不延迟

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchMovies]);

  // 过滤电影逻辑
  const movies = useMemo(() => {
    let filtered = [...searchResults];

    if (showWatchlist) {
      filtered = filtered.filter((movie) => watchlist.includes(movie.id));
    }

    return filtered;
  }, [searchResults, showWatchlist, watchlist]);

  // 处理搜索词变化
  const handleSearchTermChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      clearError();

      // 如果切换到观看列表视图，重置搜索
      if (showWatchlist && value.trim()) {
        setShowWatchlist(false);
      }
    },
    [showWatchlist, clearError],
  );

  // 处理观看列表切换
  const handleToggleWatchlist = useCallback(() => {
    setShowWatchlist((prev) => !prev);
    if (!showWatchlist) {
      // 切换到观看列表时清空搜索
      setSearchTerm("");
    }
    clearError();
  }, [showWatchlist, clearError]);

  // 获取观看列表数量 (暂时未使用)
  // const watchlistCount = getWatchlistCount();

  return {
    movies,
    searchTerm,
    setSearchTerm: handleSearchTermChange,
    isLoading,
    watchlist,
    showWatchlist,
    setShowWatchlist: handleToggleWatchlist,
    toggleWatchlist,
    isInWatchlist,
  };
};
