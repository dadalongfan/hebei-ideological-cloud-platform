'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { VideoPlayer } from '@/components/common/VideoPlayer';
import {
  Video,
  Play,
  Download,
  Share2,
  Clock,
  Calendar,
  Eye,
  User,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  Heart,
  Star,
} from 'lucide-react';
import { mockVideos } from '@/data/mockData';

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // 获取视频数据
  const video = mockVideos.find(v => v.id === params.id);

  if (!video) {
    return (
      <MainLayout>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">视频不存在</h2>
              <p className="text-gray-600 mb-4">抱歉，您访问的视频不存在或已被删除。</p>
              <Button onClick={() => router.back()}>返回</Button>
            </div>
          </div>
        </MainLayout>
    );
  }

  // 格式化时长
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // 获取状态信息
  const getStatusInfo = () => {
    switch (video.auditStatus) {
      case 'approved':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          text: '已通过审核',
          color: 'bg-green-100 text-green-800',
        };
      case 'pending':
        return {
          icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
          text: '待审核',
          color: 'bg-yellow-100 text-yellow-800',
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          text: '已拒绝',
          color: 'bg-red-100 text-red-800',
        };
      default:
        return {
          icon: <AlertCircle className="h-5 w-5 text-gray-500" />,
          text: '未知状态',
          color: 'bg-gray-100 text-gray-800',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <MainLayout>
        <div className="space-y-6">
          {/* 面包屑导航 */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              ← 返回
            </Button>
            <span>/</span>
            <span>中央片库</span>
            <span>/</span>
            <span className="text-gray-900">{video.title}</span>
          </div>

          {/* 视频播放区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* 视频播放器 */}
              <VideoPlayer
                url={video.fileUrl}
                poster={video.thumbnailUrl}
                title={video.title}
                autoplay={false}
              />

              {/* 视频信息 */}
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{video.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {video.description}
                      </CardDescription>
                    </div>
                    <Badge className={statusInfo.color}>
                      <div className="flex items-center space-x-1">
                        {statusInfo.icon}
                        <span>{statusInfo.text}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* 视频统计 */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{video.viewCount.toLocaleString()} 次播放</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(video.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(video.uploadTime).toLocaleDateString('zh-CN')}</span>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {video.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="flex items-center space-x-1">
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </Badge>
                    ))}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsLiked(!isLiked)}
                      className={isLiked ? 'text-red-600 border-red-600' : ''}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? '已收藏' : '收藏'}
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      分享
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      下载
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 标签页内容 */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <Tabs defaultValue="comments" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="comments">评论 (12)</TabsTrigger>
                      <TabsTrigger value="related">相关视频</TabsTrigger>
                      <TabsTrigger value="resources">相关资源</TabsTrigger>
                    </TabsList>

                    <TabsContent value="comments" className="mt-6">
                      <div className="space-y-4">
                        {/* 评论列表 */}
                        <div className="text-center py-8 text-gray-500">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>暂无评论，成为第一个评论的人吧！</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="related" className="mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockVideos
                          .filter(v => v.id !== video.id && v.category === video.category)
                          .slice(0, 4)
                          .map((relatedVideo) => (
                            <div key={relatedVideo.id} className="flex space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                              <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                <Play className="h-6 w-6 text-gray-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-gray-900 truncate">
                                  {relatedVideo.title}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1">
                                  {relatedVideo.viewCount.toLocaleString()} 次播放
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="resources" className="mt-6">
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>暂无相关资源</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* 右侧信息栏 */}
            <div className="space-y-6">
              {/* 创作者信息 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">创作者信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/avatars/organization.png" />
                      <AvatarFallback>
                        {video.creator.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{video.creator}</h3>
                      <p className="text-sm text-gray-600">教育机构</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={isFollowing ? 'text-red-600 border-red-600' : ''}
                    >
                      {isFollowing ? '已关注' : '关注'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 视频详情 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">视频详情</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">分类</span>
                    <Badge variant="secondary">{video.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">年级</span>
                    <span className="text-sm font-medium">{video.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">学科</span>
                    <span className="text-sm font-medium">{video.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">文件大小</span>
                    <span className="text-sm font-medium">{formatFileSize(video.fileSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">视频格式</span>
                    <span className="text-sm font-medium">MP4</span>
                  </div>
                  <Separator />
                  {video.rightsExpireAt && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">版权到期</span>
                      <span className="text-sm font-medium text-orange-600">
                        {new Date(video.rightsExpireAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 审核记录 */}
              {video.auditLog && video.auditLog.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">审核记录</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {video.auditLog.map((log, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{log.auditor}</span>
                          <span className="text-xs text-gray-600">
                            {new Date(log.time).toLocaleString('zh-CN')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{log.comment}</p>
                        <Badge
                          variant="outline"
                          className={`mt-2 ${
                            log.status === 'approved'
                              ? 'border-green-500 text-green-700'
                              : 'border-red-500 text-red-700'
                          }`}
                        >
                          {log.status === 'approved' ? '通过' : '拒绝'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
  );
}

// 注意：此页面为客户端组件，不支持静态参数生成