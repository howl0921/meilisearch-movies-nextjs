"use client";
import type React from "react";
import { useState } from "react";
import Header from "@/components/layout/Header";
import MovieGrid from "@/components/MovieGrid";
import MovieModal from "@/components/ui/MovieModal";
import { useMovies } from "@/hooks/useMovies";
import type { Movie } from "@/lib/types";

const MovieDatabase: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    movies,
    searchTerm,
    setSearchTerm,
    isLoading,
    watchlist,
    showWatchlist,
    setShowWatchlist,
    toggleWatchlist,
    isInWatchlist,
  } = useMovies();

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        watchlistCount={watchlist.length}
        showWatchlist={showWatchlist}
        onToggleWatchlist={() => setShowWatchlist(!showWatchlist)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <MovieGrid
          movies={movies}
          isLoading={isLoading}
          watchlist={watchlist}
          showWatchlist={showWatchlist}
          onToggleWatchlist={toggleWatchlist}
          onMovieClick={handleMovieClick}
        />
      </main>

      {/* Movie Detail Modal */}
      <MovieModal
        movie={selectedMovie}
        isInWatchlist={selectedMovie ? isInWatchlist(selectedMovie.id) : false}
        onToggleWatchlist={toggleWatchlist}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MovieDatabase;
