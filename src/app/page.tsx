"use client";

import type React from "react";
import { useState } from "react";
import Header from "@/components/layout/Header";
import MovieGridContainer from "@/components/MovieGridContainer";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import MovieModal from "@/components/ui/MovieModal";
import { useMovies } from "@/hooks/useMovies";
import type { Movie } from "@/types";

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
    <ErrorBoundary>
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
          <MovieGridContainer
            movies={movies}
            isLoading={isLoading}
            watchlist={watchlist}
            showWatchlist={showWatchlist}
            onToggleWatchlist={toggleWatchlist}
            onMovieClick={handleMovieClick}
            expectedCount={15} // 与 API 请求的 limit 一致
          />
        </main>

        {/* Movie Detail Modal */}
        <MovieModal
          movie={selectedMovie}
          isInWatchlist={
            selectedMovie ? isInWatchlist(selectedMovie.id) : false
          }
          onToggleWatchlist={toggleWatchlist}
          onClose={handleCloseModal}
        />
      </div>
    </ErrorBoundary>
  );
};

export default MovieDatabase;
