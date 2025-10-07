import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      // 移除过于宽松的模式，只保留必要的域名
    ],
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;