'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Video,
  Trophy,
  Download,
  Calendar,
  Filter,
  ArrowUp,
  ArrowDown,
  Target,
  Activity,
  Eye,
  Clock,
  Star,
  Award,
  GraduationCap,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// 模拟数据
const overviewStats = {
  totalUsers: 15420,
  activeUsers: 8932,
  totalCourses: 156,
  totalVideos: 1240,
  totalWatchTime: 45678,
  avgCompletionRate: 78.5,
  userGrowth: 12.3,
  courseGrowth: 8.7,
};

// 用户增长数据
const userGrowthData = [
  { name: '1月', users: 12000, activeUsers: 7800 },
  { name: '2月', users: 12800, activeUsers: 8200 },
  { name: '3月', users: 13500, activeUsers: 8600 },
  { name: '4月', users: 14200, activeUsers: 8900 },
  { name: '5月', users: 14800, activeUsers: 9000 },
  { name: '6月', users: 15420, activeUsers: 8932 },
];

// 课程学习数据
const courseLearningData = [
  { name: '社会主义核心价值观', students: 2341, completion: 85, rating: 4.8 },
  { name: '党史学习专题', students: 1892, completion: 72, rating: 4.6 },
  { name: '中华优秀传统文化', students: 1567, completion: 68, rating: 4.5 },
  { name: '爱国主义教育', students: 1234, completion: 90, rating: 4.9 },
  { name: '青年思想教育', students: 987, completion: 75, rating: 4.4 },
];

// 用户角色分布
const userRoleData = [
  { name: '学生', value: 12000, color: '#3B82F6' },
  { name: '教师', value: 2800, color: '#10B981' },
  { name: '管理员', value: 320, color: '#F59E0B' },
  { name: '管理者', value: 300, color: '#EF4444' },
];

// 学习活跃度数据
const activityData = [
  { time: '00:00', activity: 120 },
  { time: '04:00', activity: 80 },
  { time: '08:00', activity: 450 },
  { time: '12:00', activity: 680 },
  { time: '16:00', activity: 520 },
  { time: '20:00', activity: 890 },
  { time: '23:59', activity: 380 },
];

// 地区分布数据
const regionData = [
  { region: '石家庄', users: 3200, courses: 45, videos: 380 },
  { region: '保定', users: 2800, courses: 38, videos: 320 },
  { region: '唐山', users: 2400, courses: 32, videos: 280 },
  { region: '邯郸', users: 2100, courses: 28, videos: 240 },
  { region: '邢台', users: 1800, courses: 24, videos: 200 },
  { region: '其他', users: 3120, courses: 89, videos: 820 },
];

// 热门内容数据
const popularContent = [
  { id: '1', title: '社会主义核心价值观专题', type: 'course', views: 15678, likes: 892, completion: 85 },
  { id: '2', title: '建党伟业观后感', type: 'video', views: 12456, likes: 678, completion: 92 },
  { id: '3', title: '爱国主义教育实践', type: 'course', views: 11234, likes: 567, completion: 78 },
  { id: '4', title: '青年一代的使命担当', type: 'video', views: 9876, likes: 456, completion: 88 },
  { id: '5', title: '中华优秀传统文化传承', type: 'course', views: 8765, likes: 345, completion: 72 },
];

// 统计卡片组件
function StatCard({ title, value, icon: Icon, trend, trendValue, color }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
            {trend && (
              <div className="flex items-center space-x-1 mt-2">
                {trend === 'up' ? (
                  <ArrowUp className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {trendValue}%
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 用户增长趋势图表
function UserGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>用户增长趋势</CardTitle>
        <CardDescription>平台用户数量增长情况</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="users" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="activeUsers" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// 课程学习情况图表
function CourseLearningChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>课程学习情况</CardTitle>
        <CardDescription>各课程的学生数量和完成率</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={courseLearningData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#3B82F6" />
            <Bar dataKey="completion" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// 用户角色分布图表
function UserRoleChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>用户角色分布</CardTitle>
        <CardDescription>不同角色用户的数量分布</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userRoleData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {userRoleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// 学习活跃度图表
function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>学习活跃度</CardTitle>
        <CardDescription>24小时学习活跃度分布</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="activity" stroke="#8B5CF6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">数据看板</h1>
            <p className="text-gray-600">平台运营数据和统计分析</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="quarter">本季度</SelectItem>
                <SelectItem value="year">本年</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 概览统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="总用户数"
            value={overviewStats.totalUsers}
            icon={Users}
            trend="up"
            trendValue={overviewStats.userGrowth}
            color="bg-blue-600"
          />
          <StatCard
            title="活跃用户"
            value={overviewStats.activeUsers}
            icon={Activity}
            trend="up"
            trendValue={8.2}
            color="bg-green-600"
          />
          <StatCard
            title="课程总数"
            value={overviewStats.totalCourses}
            icon={BookOpen}
            trend="up"
            trendValue={overviewStats.courseGrowth}
            color="bg-purple-600"
          />
          <StatCard
            title="视频总数"
            value={overviewStats.totalVideos}
            icon={Video}
            trend="up"
            trendValue={15.3}
            color="bg-yellow-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <StatCard
            title="总学习时长"
            value={`${Math.floor(overviewStats.totalWatchTime / 60)}h`}
            icon={Clock}
            trend="up"
            trendValue={12.8}
            color="bg-indigo-600"
          />
          <StatCard
            title="平均完成率"
            value={`${overviewStats.avgCompletionRate}%`}
            icon={Target}
            trend="up"
            trendValue={3.5}
            color="bg-red-600"
          />
        </div>

        {/* 主要数据展示 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">数据概览</TabsTrigger>
            <TabsTrigger value="learning">学习分析</TabsTrigger>
            <TabsTrigger value="content">内容分析</TabsTrigger>
            <TabsTrigger value="users">用户分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserGrowthChart />
              <ActivityChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CourseLearningChart />
              <UserRoleChart />
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>学习完成率分析</CardTitle>
                <CardDescription>各课程的详细学习情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseLearningData.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{course.name}</h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{course.students} 学生</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Target className="h-3 w-3" />
                            <span>{course.completion}% 完成率</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span>{course.rating} 评分</span>
                          </span>
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="text-right text-sm font-medium text-gray-900 mb-1">
                          {course.completion}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${course.completion}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>热门内容排行</CardTitle>
                <CardDescription>最受欢迎的课程和视频内容</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularContent.map((content, index) => (
                    <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{content.title}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <Badge variant={content.type === 'course' ? 'default' : 'secondary'}>
                              {content.type === 'course' ? '课程' : '视频'}
                            </Badge>
                            <span className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{content.views.toLocaleString()} 观看</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{content.likes} 点赞</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {content.completion}%
                        </div>
                        <div className="text-xs text-gray-600">完成率</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>地区用户分布</CardTitle>
                <CardDescription>不同地区的用户数量和内容分布</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionData.map((region, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{region.region}</h4>
                        <Badge variant="outline">{region.users.toLocaleString()} 用户</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">用户数</div>
                          <div className="font-medium text-gray-900">{region.users.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">课程数</div>
                          <div className="font-medium text-gray-900">{region.courses}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">视频数</div>
                          <div className="font-medium text-gray-900">{region.videos}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}