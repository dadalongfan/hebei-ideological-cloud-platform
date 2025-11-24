'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Lock,
  School,
  BookOpen,
  Users,
  BarChart3,
  ArrowRight,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/home');
      } else {
        alert('登录失败，请检查邮箱和密码');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('登录过程中发生错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'admin' | 'teacher' | 'student' | 'manager') => {
    demoLogin(role);
    router.push('/home');
  };

  return (
    <AuthLayout title="用户登录" subtitle="选择您的身份登录系统">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">账号登录</TabsTrigger>
          <TabsTrigger value="demo">快速体验</TabsTrigger>
        </TabsList>

        {/* 账号登录 */}
        <TabsContent value="login" className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p>提示：演示账号密码统一为 "demo123"</p>
          </div>
        </TabsContent>

        {/* 快速体验 */}
        <TabsContent value="demo" className="space-y-4">
          <div className="space-y-3">
            {/* 管理员体验 */}
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleDemoLogin('admin')}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">系统管理员</h3>
                      <Badge variant="secondary">管理员</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      管理视频内容、审核用户、系统配置
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* 教师体验 */}
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleDemoLogin('teacher')}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">教师</h3>
                      <Badge variant="secondary">教师</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      创建课程、备课、管理学生作业
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* 学生体验 */}
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleDemoLogin('student')}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">学生</h3>
                      <Badge variant="secondary">学生</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      观看课程、提交作业、参与讨论
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* 管理者体验 */}
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleDemoLogin('manager')}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <School className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">教育管理者</h3>
                      <Badge variant="secondary">管理者</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      查看数据报告、监督教学质量
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>点击上方卡片快速体验不同角色的功能</p>
          </div>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}