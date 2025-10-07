import { Film, Heart } from "lucide-react";
import Image from "next/image";
import type React from "react";
import type { Movie } from "@/lib/types";

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
  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWatchlist(movie.id);
  };

  const handleCardClick = () => {
    onClick(movie);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    const placeholder = target.nextElementSibling as HTMLElement;
    if (placeholder) {
      placeholder.classList.remove("hidden");
    }
  };

  return (
    <button
      type="button"
      className="movie-card cursor-pointer text-left"
      onClick={handleCardClick}
    >
      <div className="movie-poster relative">
        {movie.poster ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : null}
        <Film
          className={`w-16 h-16 text-white opacity-50 ${movie.poster ? "hidden" : ""}`}
        />

        <button
          type="button"
          onClick={handleWatchlistClick}
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-colors"
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
          <span>{new Date(movie.release_date * 1000).getFullYear()}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 1).map((genre: string) => (
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
  );
};

export default MovieCard;
