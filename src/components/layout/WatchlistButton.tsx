import { Heart } from "lucide-react";
import type React from "react";

interface WatchlistButtonProps {
  count: number;
  isActive: boolean;
  onClick: () => void;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  count,
  isActive,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
        isActive
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
      }`}
    >
      <Heart className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} />
      <span>Watchlist ({count})</span>
    </button>
  );
};

export default WatchlistButton;
