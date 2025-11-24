'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Users,
  Target,
  Lightbulb,
  FileText,
  Video,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { mockLessonPlans } from '@/data/mockData';

export default function LessonPlanningPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // 过滤教案数据
  const filteredPlans = mockLessonPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || plan.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'all' || plan.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || plan.status === selectedStatus;

    return matchesSearch && matchesGrade && matchesSubject && matchesStatus;
  });

  // 获取统计信息
  const stats = {
    total: mockLessonPlans.length,
    published: mockLessonPlans.filter(p => p.status === 'published').length,
    draft: mockLessonPlans.filter(p => p.status === 'draft').length,
    inProgress: mockLessonPlans.filter(p => p.status === 'in-progress').length,
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  // 格式化时长
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} 分钟`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} 小时 ${remainingMinutes} 分钟`;
  };

  // 获取状态信息
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'published':
        return { label: '已发布', color: 'bg-green-100 text-green-800' };
      case 'draft':
        return { label: '草稿', color: 'bg-yellow-100 text-yellow-800' };
      case 'in-progress':
        return { label: '进行中', color: 'bg-blue-100 text-blue-800' };
      default:
        return { label: '未知', color: 'bg-gray-100 text-gray-800' };
    }
  };

  // 获取难度信息
  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { label: '基础', color: 'bg-green-100 text-green-800', stars: 1 };
      case 'medium':
        return { label: '中等', color: 'bg-yellow-100 text-yellow-800', stars: 2 };
      case 'hard':
        return { label: '困难', color: 'bg-red-100 text-red-800', stars: 3 };
      default:
        return { label: '未知', color: 'bg-gray-100 text-gray-800', stars: 0 };
    }
  };

  return (
    <MainLayout>
        <div className="space-y-6">
          {/* 页面标题和操作 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">教研备课</h1>
              <p className="text-gray-600 mt-1">创建和管理您的教学教案，提升教学质量</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              创建教案
            </Button>
          </div>

          {/* AI 辅助工具卡片 */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI 智能备课助手</CardTitle>
                  <CardDescription>
                    利用人工智能技术，快速生成高质量的教案内容和教学资源
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Lightbulb className="h-6 w-6 text-yellow-500" />
                  <span className="text-sm font-medium">智能生成教案</span>
                  <span className="text-xs text-gray-500">基于课程目标自动生成教案框架</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Target className="h-6 w-6 text-green-500" />
                  <span className="text-sm font-medium">学习目标优化</span>
                  <span className="text-xs text-gray-500">智能匹配和优化学习目标</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                  <span className="text-sm font-medium">教学建议</span>
                  <span className="text-xs text-gray-500">基于学生数据提供个性化建议</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总教案数</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  您创建的所有教案
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">已发布</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.published}</div>
                <p className="text-xs text-muted-foreground">
                  可用于教学的教案
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">草稿</CardTitle>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.draft}</div>
                <p className="text-xs text-muted-foreground">
                  编辑中的教案
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">进行中</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.inProgress}</div>
                <p className="text-xs text-muted-foreground">
                  正在完善的教案
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 内容标签页 */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="my-plans" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="my-plans">我的教案</TabsTrigger>
                  <TabsTrigger value="templates">教案模板</TabsTrigger>
                  <TabsTrigger value="shared">共享教案</TabsTrigger>
                  <TabsTrigger value="resources">教学资源</TabsTrigger>
                </TabsList>

                <TabsContent value="my-plans" className="mt-6">
                  {/* 搜索和筛选 */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="搜索教案标题或主题..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择年级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有年级</SelectItem>
                        <SelectItem value="高一">高一</SelectItem>
                        <SelectItem value="高二">高二</SelectItem>
                        <SelectItem value="高三">高三</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择学科" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有学科</SelectItem>
                        <SelectItem value="思想政治">思想政治</SelectItem>
                        <SelectItem value="道德与法治">道德与法治</SelectItem>
                        <SelectItem value="历史">历史</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有状态</SelectItem>
                        <SelectItem value="published">已发布</SelectItem>
                        <SelectItem value="draft">草稿</SelectItem>
                        <SelectItem value="in-progress">进行中</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 教案列表 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlans.map((plan) => {
                      const statusInfo = getStatusInfo(plan.status);
                      const difficultyInfo = getDifficultyInfo(plan.difficulty);

                      return (
                        <Card key={plan.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg line-clamp-2">{plan.title}</CardTitle>
                                <CardDescription className="mt-2 line-clamp-2">
                                  {plan.topic}
                                </CardDescription>
                              </div>
                              <Badge className={statusInfo.color}>
                                {statusInfo.label}
                              </Badge>
                            </div>
                          </CardHeader>

                          <CardContent>
                            <div className="space-y-3">
                              {/* 教案信息 */}
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{formatDuration(plan.duration)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{plan.targetAudience}</span>
                                </div>
                              </div>

                              {/* 难度等级 */}
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">难度:</span>
                                <div className="flex">
                                  {[...Array(3)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < difficultyInfo.stars
                                          ? 'text-yellow-500 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <Badge variant="outline" className={difficultyInfo.color}>
                                  {difficultyInfo.label}
                                </Badge>
                              </div>

                              {/* 标签 */}
                              <div className="flex flex-wrap gap-1">
                                <Badge variant="outline" className="text-xs">
                                  {plan.grade}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {plan.subject}
                                </Badge>
                                {plan.teachingMethods && plan.teachingMethods.slice(0, 2).map((method) => (
                                  <Badge key={method} variant="secondary" className="text-xs">
                                    {method}
                                  </Badge>
                                ))}
                              </div>

                              {/* 创建时间 */}
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>更新于 {formatDate(plan.updatedAt)}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>

                          <CardFooter className="pt-0">
                            <div className="flex space-x-2 w-full">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="h-4 w-4 mr-2" />
                                查看
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Edit className="h-4 w-4 mr-2" />
                                编辑
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>

                  {/* 空状态 */}
                  {filteredPlans.length === 0 && (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <FileText className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">暂无教案</h3>
                        <p className="text-gray-600 text-center mb-4">
                          {searchTerm || selectedGrade !== 'all' || selectedSubject !== 'all' || selectedStatus !== 'all'
                            ? '没有找到符合条件的教案，请尝试调整筛选条件。'
                            : '您还没有创建任何教案，点击上方按钮开始创建您的第一个教案。'}
                        </p>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          创建教案
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="templates" className="mt-6">
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">教案模板库</h3>
                    <p className="text-gray-600 mb-4">使用专业教案模板，快速开始您的备课工作</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      浏览模板
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="shared" className="mt-6">
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">共享教案</h3>
                    <p className="text-gray-600 mb-4">查看和分享来自其他教师的优秀教案</p>
                    <Button>
                      <Eye className="h-4 w-4 mr-2" />
                      探索共享教案
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="mt-6">
                  <div className="text-center py-12">
                    <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">教学资源库</h3>
                    <p className="text-gray-600 mb-4">访问丰富的教学资源，包括视频、文档和其他资料</p>
                    <Button>
                      <BookOpen className="h-4 w-4 mr-2" />
                      访问资源库
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
    </MainLayout>
  );
}