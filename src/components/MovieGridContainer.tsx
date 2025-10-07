import { Film, Heart } from "lucide-react";
import type React from "react";
import MovieCard from "@/components/ui/MovieCard";
import MovieCardSkeleton from "@/components/ui/MovieCardSkeleton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import type { Movie } from "@/types";
import { CONFIG } from "@/config/constants";

interface MovieGridContainerProps {
    movies: Movie[];
    isLoading: boolean;
    watchlist: number[];
    showWatchlist: boolean;
    onToggleWatchlist: (movieId: number) => void;
    onMovieClick: (movie: Movie) => void;
    error?: string | null;
}

const MovieGridContainer: React.FC<MovieGridContainerProps> = ({
    movies,
    isLoading,
    watchlist,
    showWatchlist,
    onToggleWatchlist,
    onMovieClick,
    error,
}) => {
    const isInWatchlist = (movieId: number) => watchlist.includes(movieId);

    // 加载状态
    if (isLoading) {
        return (
            <div className="grid-responsive">
                {Array.from({ length: CONFIG.UI.GRID.SKELETON_COUNT }).map((_, index) => (
                    <MovieCardSkeleton key={`movie-skeleton-${index}`} />
                ))}
            </div>
        );
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
                        <p className="text-sm text-gray-500">
                            请检查网络连接或稍后重试
                        </p>
                        <button 
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
    if (movies.length === 0) {
        return (
            <EmptyState
                icon={<Film className="w-16 h-16 text-gray-600" />}
                title="未找到电影"
                description="尝试调整您的搜索条件"
            />
        );
    }

    // 显示电影网格
    return (
        <div className="grid-responsive animate-fadeIn">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    isInWatchlist={isInWatchlist(movie.id)}
                    onToggleWatchlist={onToggleWatchlist}
                    onClick={onMovieClick}
                />
            ))}
        </div>
    );
};

export default MovieGridContainer;
