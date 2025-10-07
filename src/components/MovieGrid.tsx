import { Film, Heart } from "lucide-react";
import type React from "react";
import MovieCard from "@/components/ui/MovieCard";
import MovieCardSkeleton from "@/components/ui/MovieCardSkeleton";
import type { Movie } from "@/lib/types";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  watchlist: number[];
  showWatchlist: boolean;
  onToggleWatchlist: (movieId: number) => void;
  onMovieClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  isLoading,
  watchlist,
  showWatchlist,
  onToggleWatchlist,
  onMovieClick,
}) => {
  const isInWatchlist = (movieId: number) => watchlist.includes(movieId);

  if (isLoading) {
    return (
      <div className="grid-responsive">
        {Array.from({ length: 8 }).map((_, index) => (
          <MovieCardSkeleton key={`movie-skeleton-${Date.now()}-${index}`} />
        ))}
      </div>
    );
  }

  if (showWatchlist && watchlist.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
        <p className="text-gray-400">
          Add movies to your watchlist to see them here
        </p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">No movies found</h2>
        <p className="text-gray-400">Try adjusting your search</p>
      </div>
    );
  }

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

export default MovieGrid;
