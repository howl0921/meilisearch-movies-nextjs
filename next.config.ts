import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用 standalone 输出用于 Docker 部署
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
      },
    ],
    // 禁用图片优化，直接使用原始URL
    unoptimized: true,
  },
};

export default nextConfig;
