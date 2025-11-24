'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';

// 不需要认证的页面路径
const publicPaths = ['/login'];

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // 检查当前页面是否需要认证
    const isPublicPage = publicPaths.some(path => pathname.startsWith(path));

    if (!isPublicPage && !isAuthenticated) {
      // 如果不是公共页面且用户未认证，立即设置重定向状态
      setShouldRedirect(true);
      router.push('/login');
      return;
    }

    if (isPublicPage && isAuthenticated) {
      // 如果是公共页面但用户已认证，重定向到首页
      router.push('/home');
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated, pathname, router]);

  // 如果需要重定向，显示加载状态
  if (shouldRedirect || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">
            {shouldRedirect ? '正在退出...' : '正在验证身份...'}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}