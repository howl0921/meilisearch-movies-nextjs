// 简化的应用配置
export const CONFIG = {
  // 搜索配置
  SEARCH_DEBOUNCE: 500,
  MIN_QUERY_LENGTH: 1,
  DEFAULT_LIMIT: 15,

  // UI 配置 - 骨架屏数量与请求数量一致
  SKELETON_COUNT: 15, // 与 DEFAULT_LIMIT 保持一致

  // 存储键名
  STORAGE_KEY: "moviedb_watchlist",

  // 错误消息
  ERRORS: {
    NETWORK: "网络连接失败，请检查您的网络设置",
    API: "服务器错误，请稍后再试",
    GENERIC: "出现了一些问题，请稍后再试",
  },

  // 开发环境
  IS_DEV: process.env.NODE_ENV === "development",
} as const;
