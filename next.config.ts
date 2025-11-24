import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除静态导出配置，使用默认的SSR模式
  distDir: 'out',

  // 配置图片优化
  images: {
    unoptimized: true
  },

  // 禁用严格模式
  reactStrictMode: false,
};

export default nextConfig;
