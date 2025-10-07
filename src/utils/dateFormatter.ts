/**
 * 日期格式化工具函数
 */

/**
 * 将时间戳转换为年份
 * @param timestamp - Unix 时间戳（秒）
 * @returns 年份数字
 */
export const formatReleaseYear = (timestamp: number): number => {
  return new Date(timestamp * 1000).getFullYear();
};

/**
 * 格式化日期为本地字符串
 * @param timestamp - Unix 时间戳（秒）
 * @returns 格式化的日期字符串
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString();
};