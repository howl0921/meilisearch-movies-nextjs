/**
 * 工具函数统一导出
 */

// 日期格式化
export { formatReleaseYear, formatDate } from "./dateFormatter";

// 图片处理
export { handleImageError, getImageUrl } from "./imageHandler";

// 类型显示
export { getDisplayGenres, formatGenresText } from "./genreDisplay";

// 错误处理
export { handleApiError, getFriendlyErrorMessage } from "./errorHandler";