/**
 * 工具函数统一导出
 */

// 日期格式化
export { formatDate, formatReleaseYear } from "./dateFormatter";
// 错误处理
export { getFriendlyErrorMessage, handleApiError } from "./errorHandler";

// 类型显示
export { formatGenresText, getDisplayGenres } from "./genreDisplay";
// 图片处理
export { getImageUrl, handleImageError } from "./imageHandler";
