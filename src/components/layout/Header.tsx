import { Film } from "lucide-react";
import type React from "react";
import WatchlistButton from "@/components/layout/WatchlistButton";
import SearchBar from "@/components/ui/SearchBar";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  watchlistCount: number;
  showWatchlist: boolean;
  onToggleWatchlist: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  watchlistCount,
  showWatchlist,
  onToggleWatchlist,
}) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">MovieDB</h1>
          </div>
          <WatchlistButton
            count={watchlistCount}
            isActive={showWatchlist}
            onClick={onToggleWatchlist}
          />
        </div>

        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search movies..."
        />
      </div>
    </header>
  );
};

export default Header;
