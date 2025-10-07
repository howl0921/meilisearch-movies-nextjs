import { Film, Heart } from "lucide-react";
import type React from "react";
import type { Movie } from "@/lib/types";
import { useImageFallback } from "@/hooks/useImageFallback";
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
  const { handleImageError } = useImageFallback();

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWatchlist(movie.id);
  };

  const handleCardClick = () => {
    onClick(movie);
  };

  return (
    <div
      className="movie-card cursor-pointer text-left"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="movie-poster relative">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        ) : null}
        <Film
          className={`w-16 h-16 text-white opacity-50 ${movie.poster ? "hidden" : ""}`}
        />

        <button
          type="button"
          onClick={handleWatchlistClick}
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-colors"
          aria-label={isInWatchlist ? "从观看列表移除" : "添加到观看列表"}
        >
          <Heart
            className={`w-5 h-5 ${isInWatchlist ? "fill-red-500 text-red-500" : "text-white"}`}
          />
        </button>
      </div>

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
    </div>
  );
};

export default MovieCard;