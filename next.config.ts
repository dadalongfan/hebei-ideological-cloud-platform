import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 配置静态导出
  output: 'export',
  trailingSlash: true,
  distDir: 'out',

  // 配置图片优化
  images: {
    unoptimized: true
  },

  // 禁用严格模式
  reactStrictMode: false,
};

export default nextConfig;
