// API 相关类型
export interface Movie {
    id: number;
    title: string;
    genres: string[];
    overview: string;
    poster: string;
    release_date: number;
}

export interface ApiResponse {
    hits: Movie[];
    query: string;
    processingTimeMs: number;
    limit: number;
    offset: number;
    estimatedTotalHits: number;
}

// UI 组件相关类型
export interface MovieCardProps {
    movie: Movie;
    isInWatchlist: boolean;
    onToggleWatchlist: (movieId: number) => void;
    onClick: (movie: Movie) => void;
}

export interface MovieGridProps {
    movies: Movie[];
    isLoading: boolean;
    watchlist: number[];
    showWatchlist: boolean;
    onToggleWatchlist: (movieId: number) => void;
    onMovieClick: (movie: Movie) => void;
}

export interface MovieModalProps {
    movie: Movie | null;
    isInWatchlist: boolean;
    onToggleWatchlist: (movieId: number) => void;
    onClose: () => void;
}

export interface HeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    watchlistCount: number;
    showWatchlist: boolean;
    onToggleWatchlist: () => void;
}

export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

// Hook 相关类型
export interface UseMoviesReturn {
    movies: Movie[];
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    isLoading: boolean;
    watchlist: number[];
    showWatchlist: boolean;
    setShowWatchlist: (value: boolean) => void;
    toggleWatchlist: (movieId: number) => void;
    isInWatchlist: (movieId: number) => boolean;
}

// 错误处理类型
export interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export interface ErrorInfo {
    componentStack: string;
}
