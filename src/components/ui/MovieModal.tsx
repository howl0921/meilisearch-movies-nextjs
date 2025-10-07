import { Calendar, Check, Film, Plus, X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import type { Movie } from "@/lib/types";

interface MovieModalProps {
  movie: Movie | null;
  isInWatchlist: boolean;
  onToggleWatchlist: (movieId: number) => void;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  isInWatchlist,
  onToggleWatchlist,
  onClose,
}) => {
  if (!movie) return null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    const placeholder = target.nextElementSibling as HTMLElement;
    if (placeholder) {
      placeholder.classList.remove("hidden");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 modal-backdrop">
      <div className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-screen overflow-y-auto">
        <div className="relative">
          <div className="h-64 flex items-center justify-center bg-gray-700">
            {movie.poster ? (
              <Image
                src={movie.poster}
                alt={movie.title}
                width={800}
                height={450}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
            ) : null}
            <Film
              className={`w-24 h-24 text-white opacity-50 ${movie.poster ? "hidden" : ""}`}
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(movie.release_date * 1000).getFullYear()}
                  </span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onToggleWatchlist(movie.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isInWatchlist
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isInWatchlist ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>In Watchlist</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Add to Watchlist</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre: string) => (
              <span
                key={genre}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
