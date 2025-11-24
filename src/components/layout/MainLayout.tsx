'use client';

import React from 'react';
import { useAuthStore, useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Video,
  BookOpen,
  Users,
  Trophy,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  User,
  School,
  FileText,
  Upload,
  Play,
  ClipboardList,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 导航菜单配置
const navigationConfig = {
  admin: [
    { name: '首页', href: '/home', icon: Home },
    { name: '中央片库', href: '/library', icon: Video },
    { name: '用户管理', href: '/users', icon: Users },
    { name: '系统设置', href: '/settings', icon: Settings },
  ],
  teacher: [
    { name: '首页', href: '/home', icon: Home },
    { name: '课程推送', href: '/courses', icon: BookOpen },
    { name: '教研备课', href: '/lesson-planning', icon: FileText },
    { name: '创作管理', href: '/practice', icon: Trophy },
    { name: '学生管理', href: '/students', icon: Users },
  ],
  student: [
    { name: '首页', href: '/home', icon: Home },
    { name: '学习平台', href: '/student', icon: BookOpen },
    { name: '我的课程', href: '/my-courses', icon: Play },
    { name: '作业任务', href: '/assignments', icon: ClipboardList },
    { name: '创作实践', href: '/practice', icon: Trophy },
  ],
  manager: [
    { name: '首页', href: '/home', icon: Home },
    { name: '数据看板', href: '/dashboard', icon: BarChart3 },
    { name: '课程管理', href: '/courses', icon: BookOpen },
    { name: '教师管理', href: '/teachers', icon: Users },
    { name: '评估报告', href: '/reports', icon: FileText },
  ],
};

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const { user, logout, hasRole } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useAppStore();

  if (!user) {
    return <>{children}</>;
  }

  const navigationItems = navigationConfig[user.role as UserRole] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            {/* 侧边栏切换按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <School className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900 hidden sm:inline">
                河北思政云平台
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* 通知铃铛 */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>

            {/* 用户下拉菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <Badge variant="secondary" className="w-fit mt-1">
                      {user.role === 'admin' && '管理员'}
                      {user.role === 'teacher' && '教师'}
                      {user.role === 'student' && '学生'}
                      {user.role === 'manager' && '管理者'}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>个人资料</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>设置</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>退出登录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* 侧边栏 */}
        <aside
          className={`
            fixed left-0 top-16 bottom-0 z-40 w-64 bg-white border-r border-gray-200
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static lg:inset-0
          `}
        >
          <nav className="flex flex-col h-full p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors duration-200
                    ${isActive
                      ? 'bg-red-50 text-red-700 border-r-2 border-red-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* 底部快捷操作 */}
            <div className="mt-auto pt-4 border-t border-gray-200">
              {hasRole('student') && (
                <Link href="/student/discussions">
                  <Button variant="outline" className="w-full justify-start space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>讨论区</span>
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* 移动端遮罩层 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}