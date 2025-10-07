// 应用配置常量
export const APP_CONFIG = {
    NAME: "MovieDB",
    DESCRIPTION: "电影搜索应用",
    VERSION: "1.0.0",
} as const;

// API 配置
export const API_CONFIG = {
    ENDPOINTS: {
        MOVIES: "/api/movies",
    },
    TIMEOUT: 10000, // 10秒
    RETRY_ATTEMPTS: 3,
} as const;

// 搜索配置
export const SEARCH_CONFIG = {
    DEBOUNCE_DELAY: 500, // 防抖延迟（毫秒）
    MIN_QUERY_LENGTH: 1, // 最小搜索长度
    DEFAULT_LIMIT: 15, // 默认返回数量
} as const;

// UI 配置
export const UI_CONFIG = {
    GRID: {
        SKELETON_COUNT: 8, // 骨架屏数量
        MIN_COLUMN_WIDTH: 200, // 最小列宽（像素）
    },
    LOADING: {
        SPINNER_SIZE: {
            SMALL: "sm" as const,
            MEDIUM: "md" as const,
            LARGE: "lg" as const,
        },
    },
    ANIMATION: {
        DURATION: {
            FAST: 150,
            NORMAL: 300,
            SLOW: 500,
        },
    },
} as const;

// 本地存储键名
export const STORAGE_KEYS = {
    WATCHLIST: "moviedb_watchlist",
    SEARCH_HISTORY: "moviedb_search_history",
    USER_PREFERENCES: "moviedb_preferences",
} as const;

// 错误消息
export const ERROR_MESSAGES = {
    NETWORK_ERROR: "网络连接失败，请检查您的网络设置",
    API_ERROR: "服务器错误，请稍后再试",
    NO_RESULTS: "未找到相关电影",
    INVALID_QUERY: "搜索关键词无效",
    GENERIC_ERROR: "出现了一些问题，请稍后再试",
} as const;

// 成功消息
export const SUCCESS_MESSAGES = {
    ADDED_TO_WATCHLIST: "已添加到观看列表",
    REMOVED_FROM_WATCHLIST: "已从观看列表移除",
    WATCHLIST_CLEARED: "观看列表已清空",
} as const;

// TMDB 配置
export const TMDB_CONFIG = {
    IMAGE_BASE_URL: "https://image.tmdb.org/t/p",
    SIZES: {
        POSTER: {
            SMALL: "w154",
            MEDIUM: "w342",
            LARGE: "w500",
            ORIGINAL: "original",
        },
        BACKDROP: {
            SMALL: "w300",
            MEDIUM: "w780",
            LARGE: "w1280",
            ORIGINAL: "original",
        },
    },
} as const;

// 开发环境配置
export const DEV_CONFIG = {
    ENABLE_LOGGING: process.env.NODE_ENV === "development",
    API_MOCKING: false,
    DEBUG_MODE: process.env.NODE_ENV === "development",
} as const;

// 导出所有配置
export const CONFIG = {
    APP: APP_CONFIG,
    API: API_CONFIG,
    SEARCH: SEARCH_CONFIG,
    UI: UI_CONFIG,
    STORAGE: STORAGE_KEYS,
    MESSAGES: {
        ERROR: ERROR_MESSAGES,
        SUCCESS: SUCCESS_MESSAGES,
    },
    TMDB: TMDB_CONFIG,
    DEV: DEV_CONFIG,
} as const;
