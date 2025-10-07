/**
 * 类型显示工具函数
 */

/**
 * 获取要显示的类型列表
 * @param genres - 类型数组
 * @param limit - 显示限制数量，默认为1
 * @returns 截取后的类型数组
 */
export const getDisplayGenres = (genres: string[], limit: number = 1): string[] => {
  if (!genres || !Array.isArray(genres)) return [];
  return genres.slice(0, limit);
};

/**
 * 格式化类型显示文本
 * @param genres - 类型数组
 * @param separator - 分隔符，默认为空格
 * @returns 格式化后的类型文本
 */
export const formatGenresText = (genres: string[], separator: string = " "): string => {
  if (!genres || !Array.isArray(genres)) return "";
  return genres.join(separator);
};