'use client';

import React from 'react';
import { useAuthStore } from '@/lib/store';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthGuard } from '@/components/common/AuthGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Video,
  BookOpen,
  Users,
  Trophy,
  BarChart3,
  TrendingUp,
  Clock,
  Star,
  Play,
  FileText,
  MessageSquare,
  Upload,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { mockVideos, mockCourses, mockStudentWorks, mockCompetitions } from '@/data/mockData';

export default function HomePage() {
  const { user } = useAuthStore();

  // 根据用户角色显示不同的仪表板
  const renderRoleBasedDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      default:
        return <div>未知角色</div>;
    }
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          {/* 欢迎信息 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                欢迎回来，{user?.name}！
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.role === 'admin' && '管理平台内容，确保系统正常运行'}
                {user?.role === 'teacher' && '创建精彩课程，引导学生学习成长'}
                {user?.role === 'student' && '开始你的学习之旅，探索知识的海洋'}
                {user?.role === 'manager' && '查看教学数据，监督教育质量'}
              </p>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-lg">
                {user?.name?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* 角色特定的仪表板 */}
          {renderRoleBasedDashboard()}
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

// 管理员仪表板
function AdminDashboard() {
  const stats = {
    totalVideos: mockVideos.length,
    pendingReview: mockVideos.filter(v => v.auditStatus === 'pending').length,
    totalUsers: 156,
    totalViews: mockVideos.reduce((sum, v) => sum + v.viewCount, 0),
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总视频数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVideos}</p>
              </div>
              <Video className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">待审核</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingReview}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总用户数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总播放量</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最新视频 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>最新上传的视频</span>
            <Link href="/library">
              <Button variant="outline" size="sm">查看全部</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVideos.slice(0, 3).map((video) => (
              <div key={video.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Play className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.description}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge variant={video.auditStatus === 'approved' ? 'default' : 'secondary'}>
                      {video.auditStatus === 'approved' ? '已通过' : '待审核'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      播放量: {video.viewCount}
                    </span>
                  </div>
                </div>
                <Link href={`/library/${video.id}`}>
                  <Button variant="outline" size="sm">查看</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 教师仪表板
function TeacherDashboard() {
  const myCourses = mockCourses.filter(c => c.teacherId === 'teacher-001');
  const recentWorks = mockStudentWorks.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* 快捷操作 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/upload">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">上传视频</h3>
                  <p className="text-sm text-gray-600">分享教学资源</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">创建课程</h3>
                <p className="text-sm text-gray-600">设计教学内容</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">在线备课</h3>
                <p className="text-sm text-gray-600">AI辅助备课</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 我的课程 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>我的课程</span>
              <Link href="/courses">
                <Button variant="outline" size="sm">管理课程</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{course.title}</h3>
                    <Badge variant="outline">{course.grade}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {course.totalStudents} 学生
                    </span>
                    <Link href={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm">查看详情</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 学生作品 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>学生作品</span>
              <Link href="/practice">
                <Button variant="outline" size="sm">查看全部</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWorks.map((work) => (
                <div key={work.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{work.title}</h3>
                    <Badge variant={work.status === 'approved' ? 'default' : 'secondary'}>
                      {work.status === 'approved' ? '已通过' : '待审核'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    学生: {work.studentName} | 类型: {work.type}
                  </p>
                  <div className="flex items-center justify-between">
                    {work.score && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{work.score}分</span>
                      </div>
                    )}
                    <Link href={`/practice/work/${work.id}`}>
                      <Button variant="outline" size="sm">查看作品</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 学生仪表板
function StudentDashboard() {
  const availableCourses = mockCourses.slice(0, 2);
  const activeCompetitions = mockCompetitions.filter(c => c.status === 'ongoing');

  return (
    <div className="space-y-6">
      {/* 学习统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">学习时长</p>
                <p className="text-2xl font-bold text-blue-600">3.5小时</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">完成课程</p>
                <p className="text-2xl font-bold text-green-600">5个</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">提交作品</p>
                <p className="text-2xl font-bold text-purple-600">2个</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 推荐课程 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>推荐课程</span>
            <Link href="/courses">
              <Button variant="outline" size="sm">浏览全部</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCourses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{course.title}</h3>
                  <Badge variant="outline">{course.grade}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    教师: {course.teacherName}
                  </span>
                  <Link href={`/courses/${course.id}`}>
                    <Button size="sm">开始学习</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 创作赛事 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>创作赛事</span>
            <Link href="/practice">
              <Button variant="outline" size="sm">查看赛事</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCompetitions.slice(0, 2).map((competition) => (
              <div key={competition.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{competition.title}</h3>
                  <Badge variant="secondary">{competition.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{competition.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {competition.currentParticipants}/{competition.maxParticipants} 人参与
                  </span>
                  <Link href={`/practice/${competition.id}`}>
                    <Button variant="outline" size="sm">立即报名</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 管理者仪表板
function ManagerDashboard() {
  const dataStats = {
    totalTeachers: 45,
    totalStudents: 1234,
    totalCourses: 68,
    avgCompletion: 78.5,
    engagement: 82.3,
  };

  return (
    <div className="space-y-6">
      {/* 数据概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">活跃教师</p>
                <p className="text-2xl font-bold text-blue-600">{dataStats.totalTeachers}</p>
                <p className="text-xs text-green-600 mt-1">+12% 较上周</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">活跃学生</p>
                <p className="text-2xl font-bold text-green-600">{dataStats.totalStudents}</p>
                <p className="text-xs text-green-600 mt-1">+8% 较上周</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">完成率</p>
                <p className="text-2xl font-bold text-purple-600">{dataStats.avgCompletion}%</p>
                <p className="text-xs text-green-600 mt-1">+2.3% 较上周</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 数据趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>平台使用趋势</CardTitle>
            <CardDescription>最近30天的用户活跃度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">图表组件将在此处显示</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>课程分布</CardTitle>
            <CardDescription>按主题分类的课程统计</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">图表组件将在此处显示</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快捷入口 */}
      <Card>
        <CardHeader>
          <CardTitle>数据报告</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/reports/weekly">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>周报告</span>
              </Button>
            </Link>
            <Link href="/dashboard/reports/monthly">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>月报告</span>
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span>详细分析</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}