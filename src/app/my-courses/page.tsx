'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Search,
  Filter,
  Calendar,
  Target,
  Award,
  CheckCircle,
  Circle,
  Lock,
  Eye,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

// 模拟课程数据
const myCourses = [
  {
    id: '1',
    title: '社会主义核心价值观专题',
    description: '深入学习社会主义核心价值观的内涵和实践意义，树立正确的世界观、人生观、价值观',
    thumbnail: '/images/course1.jpg',
    instructor: '张老师',
    duration: '2小时30分',
    totalLessons: 8,
    completedLessons: 5,
    progress: 62,
    rating: 4.8,
    totalStudents: 1234,
    difficulty: 'medium',
    status: 'in_progress',
    category: '思想理论',
    enrolledAt: '2024-01-15',
    lastAccessed: '2024-02-20',
    isFavorite: true,
    certificate: null,
  },
  {
    id: '2',
    title: '中华优秀传统文化传承',
    description: '了解中华优秀传统文化的精髓和现代价值，增强文化自信',
    thumbnail: '/images/course2.jpg',
    instructor: '李老师',
    duration: '3小时15分',
    totalLessons: 10,
    completedLessons: 3,
    progress: 30,
    rating: 4.6,
    totalStudents: 892,
    difficulty: 'easy',
    status: 'in_progress',
    category: '文化传承',
    enrolledAt: '2024-01-20',
    lastAccessed: '2024-02-18',
    isFavorite: false,
    certificate: null,
  },
  {
    id: '3',
    title: '爱国主义教育实践',
    description: '通过实践活动培养爱国主义情怀，增强国家意识和民族自豪感',
    thumbnail: '/images/course3.jpg',
    instructor: '王老师',
    duration: '1小时45分',
    totalLessons: 6,
    completedLessons: 6,
    progress: 100,
    rating: 4.9,
    totalStudents: 567,
    difficulty: 'easy',
    status: 'completed',
    category: '爱国主义',
    enrolledAt: '2023-12-01',
    lastAccessed: '2024-01-15',
    isFavorite: true,
    certificate: {
      id: 'cert_001',
      issueDate: '2024-01-16',
      score: 95,
    },
  },
  {
    id: '4',
    title: '党史学习专题',
    description: '系统学习党的历史，了解党的发展历程和伟大成就',
    thumbnail: '/images/course4.jpg',
    instructor: '刘老师',
    duration: '4小时',
    totalLessons: 12,
    completedLessons: 2,
    progress: 17,
    rating: 4.7,
    totalStudents: 2341,
    difficulty: 'hard',
    status: 'in_progress',
    category: '党史学习',
    enrolledAt: '2024-02-01',
    lastAccessed: '2024-02-19',
    isFavorite: false,
    certificate: null,
  },
];

// 课程卡片组件
function CourseCard({ course }: { course: any }) {
  const getStatusIcon = () => {
    switch (course.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Circle className="h-4 w-4 text-blue-600" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-gray-400" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (course.status) {
      case 'completed':
        return '已完成';
      case 'in_progress':
        return '学习中';
      case 'locked':
        return '未开始';
      default:
        return '未开始';
    }
  };

  const getDifficultyColor = () => {
    switch (course.difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = () => {
    switch (course.difficulty) {
      case 'easy':
        return '简单';
      case 'medium':
        return '中等';
      case 'hard':
        return '困难';
      default:
        return '未知';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* 课程缩略图 */}
          <div className="w-full md:w-48 h-32 md:h-auto bg-gray-200 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>

          {/* 课程信息 */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon()}
                  <span className="text-sm text-gray-600">{getStatusText()}</span>
                  <Badge variant="outline" className={getDifficultyColor()}>
                    {getDifficultyText()}
                  </Badge>
                  {course.isFavorite && (
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.instructor}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{course.completedLessons}/{course.totalLessons} 课时</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{course.rating}</span>
                  </span>
                </div>

                {/* 学习进度 */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">学习进度</span>
                    <span className="font-medium text-gray-900">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {course.status === 'completed' ? (
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Award className="h-3 w-3 mr-1" />
                          已获得证书
                        </Badge>
                        {course.certificate && (
                          <span className="text-sm text-gray-600">
                            成绩: {course.certificate.score}分
                          </span>
                        )}
                      </div>
                    ) : (
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        继续学习
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      详情
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // 过滤课程
  const filteredCourses = myCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // 获取唯一分类
  const categories = ['all', ...Array.from(new Set(myCourses.map(course => course.category)))];

  // 统计数据
  const stats = {
    total: myCourses.length,
    inProgress: myCourses.filter(c => c.status === 'in_progress').length,
    completed: myCourses.filter(c => c.status === 'completed').length,
    totalHours: myCourses.reduce((acc, course) => {
      const hours = parseInt(course.duration.split('小时')[0]);
      return acc + hours;
    }, 0),
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">我的课程</h1>
            <p className="text-gray-600">管理您的学习进度和课程收藏</p>
          </div>
          <Link href="/courses">
            <Button>发现更多课程</Button>
          </Link>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总课程数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Target className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">学习中</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">已完成</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">学习时长</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 搜索和筛选 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索课程..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="学习状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="in_progress">学习中</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="locked">未开始</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="课程分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? '全部分类' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 课程列表 */}
        <div className="space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到课程</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                    ? '尝试调整搜索条件或筛选器'
                    : '您还没有开始学习任何课程'}
                </p>
                {(!searchTerm && statusFilter === 'all' && categoryFilter === 'all') && (
                  <Link href="/courses">
                    <Button>发现课程</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}