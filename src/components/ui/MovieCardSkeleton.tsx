import type React from "react";

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
      {/* 海报占位符 */}
      <div className="movie-poster bg-gray-700 flex items-center justify-center">
        <div className="w-16 h-16 bg-gray-600 rounded"></div>
      </div>

      {/* 内容区域 */}
      <div className="p-3 flex flex-col flex-shrink-0">
        {/* 标题占位符 */}
        <div className="h-4 bg-gray-700 rounded mb-1"></div>
        <div className="h-4 bg-gray-700 rounded mb-1 w-3/4"></div>

        {/* 年份占位符 */}
        <div className="h-3 bg-gray-700 rounded mb-1 w-1/4"></div>

        {/* 类型标签占位符 */}
        <div className="flex gap-1">
          <div className="h-4 bg-gray-700 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
