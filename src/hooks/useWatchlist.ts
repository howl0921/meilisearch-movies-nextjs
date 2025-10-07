import { useState, useCallback, useEffect } from "react";
import { CONFIG } from "@/config/constants";

interface UseWatchlistReturn {
    watchlist: number[];
    isInWatchlist: (movieId: number) => boolean;
    toggleWatchlist: (movieId: number) => void;
    clearWatchlist: () => void;
    getWatchlistCount: () => number;
}

export const useWatchlist = (): UseWatchlistReturn => {
    const [watchlist, setWatchlist] = useState<number[]>([]);

    // 从本地存储加载观看列表
    useEffect(() => {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE.WATCHLIST);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setWatchlist(parsed);
                }
            }
        } catch (error) {
            if (CONFIG.DEV.ENABLE_LOGGING) {
                console.error("Error loading watchlist from localStorage:", error);
            }
        }
    }, []);

    // 保存观看列表到本地存储
    const saveWatchlist = useCallback((newWatchlist: number[]) => {
        try {
            localStorage.setItem(CONFIG.STORAGE.WATCHLIST, JSON.stringify(newWatchlist));
        } catch (error) {
            if (CONFIG.DEV.ENABLE_LOGGING) {
                console.error("Error saving watchlist to localStorage:", error);
            }
        }
    }, []);

    // 检查电影是否在观看列表中
    const isInWatchlist = useCallback((movieId: number) => {
        return watchlist.includes(movieId);
    }, [watchlist]);

    // 切换观看列表状态
    const toggleWatchlist = useCallback((movieId: number) => {
        setWatchlist((prevWatchlist) => {
            const newWatchlist = prevWatchlist.includes(movieId)
                ? prevWatchlist.filter((id) => id !== movieId)
                : [...prevWatchlist, movieId];

            saveWatchlist(newWatchlist);

            // 显示成功消息（可以考虑使用 toast 通知）
            if (CONFIG.DEV.ENABLE_LOGGING) {
                const message = prevWatchlist.includes(movieId)
                    ? CONFIG.MESSAGES.SUCCESS.REMOVED_FROM_WATCHLIST
                    : CONFIG.MESSAGES.SUCCESS.ADDED_TO_WATCHLIST;
                console.log(message);
            }

            return newWatchlist;
        });
    }, [saveWatchlist]);

    // 清空观看列表
    const clearWatchlist = useCallback(() => {
        setWatchlist([]);
        localStorage.removeItem(CONFIG.STORAGE.WATCHLIST);

        if (CONFIG.DEV.ENABLE_LOGGING) {
            console.log(CONFIG.MESSAGES.SUCCESS.WATCHLIST_CLEARED);
        }
    }, []);

    // 获取观看列表数量
    const getWatchlistCount = useCallback(() => {
        return watchlist.length;
    }, [watchlist]);

    return {
        watchlist,
        isInWatchlist,
        toggleWatchlist,
        clearWatchlist,
        getWatchlistCount,
    };
};
