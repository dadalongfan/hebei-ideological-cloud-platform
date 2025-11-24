'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthGuard } from '@/components/common/AuthGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { VideoPlayer } from '@/components/common/VideoPlayer';
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  Edit,
  Eye,
  Star,
  Play,
  Download,
  FileText,
  CheckCircle,
  Circle,
  MoreVertical,
  Plus,
  Trash2,
  Share2,
} from 'lucide-react';
import { mockCourses, mockVideos } from '@/data/mockData';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState(false);

  // 获取课程数据
  const course = mockCourses.find(c => c.id === params.id);

  if (!course) {
    return (
      <AuthGuard>
        <MainLayout>
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-gray-900 mb-2">课程不存在</h2>
                <p className="text-gray-600 mb-4">抱歉，您访问的课程不存在或已被删除。</p>
                <Button onClick={() => router.back()}>返回</Button>
              </div>
            </div>
          </MainLayout>
        </AuthGuard>
    );
  }

  // 获取课程相关的视频
  const courseVideos = mockVideos.filter(video =>
    course.materials.some(material =>
      material.type === 'video' && material.fileUrl === video.fileUrl
    )
  );

  // 计算学习进度
  const completedMaterials = course.materials.filter(m => m.completed).length;
  const progress = (completedMaterials / course.materials.length) * 100;

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  // 获取状态信息
  const getStatusInfo = () => {
    switch (course.status) {
      case 'published':
        return {
          label: '已发布',
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-4 w-4" />,
        };
      case 'draft':
        return {
          label: '草稿',
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Edit className="h-4 w-4" />,
        };
      case 'archived':
        return {
          label: '已归档',
          color: 'bg-gray-100 text-gray-800',
          icon: <Circle className="h-4 w-4" />,
        };
      default:
        return {
          label: '未知',
          color: 'bg-gray-100 text-gray-800',
          icon: <Circle className="h-4 w-4" />,
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          {/* 面包屑导航 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                ← 返回
              </Button>
              <span>/</span>
              <span>课程管理</span>
              <span>/</span>
              <span className="text-gray-900">{course.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                编辑
              </Button>
            </div>
          </div>

          {/* 课程概览 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* 课程信息 */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <CardTitle className="text-2xl">{course.title}</CardTitle>
                        <Badge className={statusInfo.color}>
                          <div className="flex items-center space-x-1">
                            {statusInfo.icon}
                            <span>{statusInfo.label}</span>
                          </div>
                        </Badge>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {course.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* 课程统计 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{course.enrolledStudents}</div>
                      <div className="text-sm text-gray-600">学生数量</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{course.estimatedHours}</div>
                      <div className="text-sm text-gray-600">预计小时</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{course.materials.length}</div>
                      <div className="text-sm text-gray-600">学习资源</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {course.rating ? course.rating.toFixed(1) : 'N/A'}
                      </div>
                      <div className="text-sm text-gray-600">课程评分</div>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{course.grade}</Badge>
                    <Badge variant="outline">{course.subject}</Badge>
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 课程内容标签页 */}
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="materials" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="materials">学习资源</TabsTrigger>
                      <TabsTrigger value="progress">学习进度</TabsTrigger>
                      <TabsTrigger value="students">学生管理</TabsTrigger>
                    </TabsList>

                    <TabsContent value="materials" className="mt-6">
                      <div className="space-y-4">
                        {course.materials.map((material, index) => (
                          <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                {material.type === 'video' ? (
                                  <Play className="h-5 w-5 text-blue-600" />
                                ) : (
                                  <FileText className="h-5 w-5 text-blue-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">{material.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {material.type === 'video' ? '视频' : '文档'} ·
                                  {material.duration ? ` ${material.duration} 分钟` : ''}
                                  {material.fileSize && ` · ${Math.round(material.fileSize / 1024 / 1024)} MB`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {material.completed && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                查看
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="progress" className="mt-6">
                      <div className="space-y-6">
                        {/* 总体进度 */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">整体完成进度</h4>
                            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-3" />
                          <p className="text-sm text-gray-600 mt-2">
                            已完成 {completedMaterials} / {course.materials.length} 个学习资源
                          </p>
                        </div>

                        {/* 学生进度列表 */}
                        <div className="space-y-3">
                          <h4 className="font-medium">学生进度详情</h4>
                          <div className="text-center py-8 text-gray-500">
                            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>学生进度统计功能开发中...</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="students" className="mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">学生列表 ({course.enrolledStudents})</h4>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            添加学生
                          </Button>
                        </div>
                        <div className="text-center py-8 text-gray-500">
                          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>学生管理功能开发中...</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* 相关视频 */}
              {courseVideos.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>课程视频</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courseVideos.map((video) => (
                        <VideoPlayer
                          key={video.id}
                          url={video.fileUrl}
                          poster={video.thumbnailUrl}
                          title={video.title}
                          autoplay={false}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* 右侧信息栏 */}
            <div className="space-y-6">
              {/* 课程操作 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">课程操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!isEnrolled ? (
                    <Button
                      className="w-full"
                      onClick={() => setIsEnrolled(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      加入课程
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      已加入课程
                    </Button>
                  )}
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    下载课程资料
                  </Button>
                </CardContent>
              </Card>

              {/* 课程详情 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">课程详情</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">创建时间</span>
                    <span className="text-sm font-medium">{formatDate(course.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">最后更新</span>
                    <span className="text-sm font-medium">{formatDate(course.updatedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">难度等级</span>
                    <span className="text-sm font-medium">{course.difficulty}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">授课教师</span>
                    <span className="text-sm font-medium">{course.instructorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">所属学校</span>
                    <span className="text-sm font-medium">{course.instructorSchool}</span>
                  </div>
                </CardContent>
              </Card>

              {/* 学习目标 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">学习目标</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

// 生成静态参数用于静态导出
export async function generateStaticParams() {
  // 从mock数据中获取课程ID
  const { mockCourses } = await import('@/data/mockData');

  // 返回所有课程的ID作为静态参数
  return mockCourses.map((course) => ({
    id: course.id,
  }));
}