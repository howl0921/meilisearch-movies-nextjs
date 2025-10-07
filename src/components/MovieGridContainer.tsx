import { Film, Heart } from "lucide-react";
import type React from "react";
import EmptyState from "@/components/ui/EmptyState";
import MovieCard from "@/components/ui/MovieCard";
import MovieCardSkeleton from "@/components/ui/MovieCardSkeleton";
import { CONFIG } from "@/config/constants";
import type { Movie } from "@/types";

// 骨架屏现在动态生成，不需要预定义数组

interface MovieGridContainerProps {
  movies: Movie[];
  isLoading: boolean;
  watchlist: number[];
  showWatchlist: boolean;
  onToggleWatchlist: (movieId: number) => void;
  onMovieClick: (movie: Movie) => void;
  error?: string | null;
  expectedCount?: number; // 期望的结果数量，用于骨架屏
}

const MovieGridContainer: React.FC<MovieGridContainerProps> = ({
  movies,
  isLoading,
  watchlist,
  showWatchlist,
  onToggleWatchlist,
  onMovieClick,
  error,
  expectedCount = CONFIG.SKELETON_COUNT,
}) => {
  const isInWatchlist = (movieId: number) => watchlist.includes(movieId);

  // 智能渲染：在加载时显示骨架屏，加载完成后平滑过渡到真实内容
  const renderGridItems = () => {
    if (isLoading) {
      // 加载中：显示动态数量的骨架屏
      // 使用随机 ID 避免 array index 警告
      return Array.from({ length: expectedCount }, () => (
        <MovieCardSkeleton key={crypto.randomUUID()} />
      ));
    }

    if (error) {
      // 错误状态：显示错误信息
      return null;
    }

    if (showWatchlist && watchlist.length === 0) {
      // 观看列表为空
      return null;
    }

    if (movies.length === 0) {
      // 无搜索结果
      return null;
    }

    // 有数据：显示电影卡片
    return movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        isInWatchlist={isInWatchlist(movie.id)}
        onToggleWatchlist={onToggleWatchlist}
        onClick={onMovieClick}
      />
    ));
  };

  const gridItems = renderGridItems();

  // 如果有网格项目，显示网格
  if (gridItems && gridItems.length > 0) {
    return <div className="grid-responsive animate-fadeIn">{gridItems}</div>;
  }

  // 错误状态
  if (error) {
    return (
      <EmptyState
        icon={
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
            <Film className="w-8 h-8 text-white" />
          </div>
        }
        title="搜索失败"
        description={error}
        action={
          <div className="space-y-2">
            <p className="text-sm text-gray-500">请检查网络连接或稍后重试</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              重新加载
            </button>
          </div>
        }
      />
    );
  }

  // 观看列表为空
  if (showWatchlist && watchlist.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="w-16 h-16 text-gray-600" />}
        title="您的观看列表是空的"
        description="添加电影到观看列表以在此处查看"
      />
    );
  }

  // 无搜索结果
  return (
    <EmptyState
      icon={<Film className="w-16 h-16 text-gray-600" />}
      title="未找到电影"
      description="尝试调整您的搜索条件"
    />
  );
};

export default MovieGridContainer;
