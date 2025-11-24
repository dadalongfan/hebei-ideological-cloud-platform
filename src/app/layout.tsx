import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuthStore } from "@/lib/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "河北思政微电影云平台",
  description: "河北思政微电影云平台 - 构建'平台 + 内容 + 服务'三位一体的思政教育创新模式",
  keywords: ["思政教育", "微电影", "河北教育", "数字化教学"],
  authors: [{ name: "河北省教育厅" }],
};

// 全局样式配置
const themeConfig = {
  colors: {
    primary: '#B4282E', // 红色主色调
    secondary: '#1E3A8A', // 蓝色辅色
    background: '#FAFAFA',
    text: '#222222',
    border: '#E5E5E5',
  }
};

// 根布局组件包装器
function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} font-sans antialiased`}>
      {children}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <RootLayoutWrapper>
          {children}
        </RootLayoutWrapper>
      </body>
    </html>
  );
}
