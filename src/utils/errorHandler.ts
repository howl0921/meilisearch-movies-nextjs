/**
 * 错误处理工具函数
 */

import { CONFIG } from "@/config/constants";

/**
 * 处理 API 错误
 * @param error - 错误对象
 * @returns 错误消息
 */
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return CONFIG.MESSAGES.ERROR.GENERIC_ERROR;
};

/**
 * 获取友好的错误消息
 * @param error - 错误对象
 * @param fallbackMessage - 备用错误消息
 * @returns 友好的错误消息
 */
export const getFriendlyErrorMessage = (
  error: unknown, 
  fallbackMessage: string = CONFIG.MESSAGES.ERROR.GENERIC_ERROR
): string => {
  if (error instanceof Error) {
    // 检查是否为网络错误
    if (error.message.includes("fetch")) {
      return CONFIG.MESSAGES.ERROR.NETWORK_ERROR;
    }
    // 检查是否为超时错误
    if (error.message.includes("timeout")) {
      return CONFIG.MESSAGES.ERROR.API_ERROR; // 使用通用的API错误消息
    }
    return error.message;
  }
  return fallbackMessage;
};