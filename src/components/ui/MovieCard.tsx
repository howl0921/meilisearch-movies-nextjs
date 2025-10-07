import { Film, Heart } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { Movie } from "@/types";
import { formatReleaseYear, getDisplayGenres } from "@/utils";

interface MovieCardProps {
  movie: Movie;
  isInWatchlist: boolean;
  onToggleWatchlist: (movieId: number) => void;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isInWatchlist,
  onToggleWatchlist,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log(`Image failed to load: ${movie.poster}`);
    setImageError(true);
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWatchlist(movie.id);
  };

  const handleCardClick = () => {
    onClick(movie);
  };

  return (
    <div className="movie-card text-left w-full relative flex flex-col h-full">
      {/* 观看列表按钮 - 放在最外层避免嵌套 */}
      <button
        type="button"
        onClick={handleWatchlistClick}
        className="absolute top-2 right-2 w-9 h-9 bg-black/60 rounded-full hover:scale-110 hover:bg-black/80 transition-all z-20 flex items-center justify-center"
        aria-label={isInWatchlist ? "从观看列表移除" : "添加到观看列表"}
      >
        <Heart
          className={`w-7 h-7 stroke-[3px] stroke-white ${
            isInWatchlist ? "fill-red-500" : "fill-none"
          }`}
        />
      </button>

      {/* 整个卡片作为一个可点击区域 */}
      <button
        type="button"
        className="w-full text-left cursor-pointer flex flex-col h-full"
        onClick={handleCardClick}
        aria-label={`查看电影 ${movie.title} 的详细信息`}
      >
        {/* 海报区域 */}
        <div className="movie-poster relative flex-1">
          {movie.poster && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <Film className="w-16 h-16 text-white opacity-50" />
            </div>
          )}
        </div>

        {/* 信息区域 */}
        <div className="p-3 flex flex-col flex-shrink-0">
          <h3 className="font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>{formatReleaseYear(movie.release_date)}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {getDisplayGenres(movie.genres, 1).map((genre: string) => (
              <span
                key={genre}
                className="text-xs px-1.5 py-0.5 bg-gray-700 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
};

export default MovieCard;
