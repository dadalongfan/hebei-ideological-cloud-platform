import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-lg mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7V17C2 17.55 2.45 18 3 18H21C21.55 18 22 17.55 22 17V7L12 2Z"
                fill="currentColor"
              />
              <path
                d="M12 22L16 18H8L12 22Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            河北思政微电影云平台
          </h1>
          {title && (
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* 登录表单容器 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {children}
        </div>

        {/* 底部信息 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 河北省教育厅</p>
          <p className="mt-1">
            技术支持：{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              河北思政教育技术中心
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}