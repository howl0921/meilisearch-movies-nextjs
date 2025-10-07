/**
 * 图片处理工具函数
 */

/**
 * 处理图片加载错误，显示占位符
 * @param e - 图片加载错误事件
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  const target = e.target as HTMLImageElement;
  target.style.display = "none";
  
  const placeholder = target.nextElementSibling as HTMLElement;
  if (placeholder) {
    placeholder.classList.remove("hidden");
  }
};

/**
 * 获取图片的完整URL
 * @param path - 图片路径
 * @param size - 图片尺寸
 * @returns 完整的图片URL
 */
export const getImageUrl = (path: string, size: string = "w500"): string => {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};