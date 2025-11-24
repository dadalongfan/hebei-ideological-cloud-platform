'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/lib/store';
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  TrendingUp,
  Play,
  Star,
  Calendar,
  Users,
  Award,
  Video,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

// 学习统计卡片
function LearningStats() {
  const stats = [
    { label: '学习时长', value: '126', unit: '小时', icon: Clock, color: 'text-blue-600' },
    { label: '完成课程', value: '8', unit: '门', icon: BookOpen, color: 'text-green-600' },
    { label: '获得积分', value: '2,450', unit: '分', icon: Trophy, color: 'text-yellow-600' },
    { label: '学习排名', value: '12', unit: '名', icon: Target, color: 'text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  <span className="text-sm font-normal text-gray-600 ml-1">{stat.unit}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 推荐课程
function RecommendedCourses() {
  const courses = [
    {
      id: '1',
      title: '社会主义核心价值观专题',
      description: '深入学习社会主义核心价值观的内涵和实践意义',
      thumbnail: '/images/course1.jpg',
      duration: '2小时30分',
      difficulty: 'medium',
      progress: 60,
      rating: 4.8,
      students: 1234,
    },
    {
      id: '2',
      title: '中华优秀传统文化传承',
      description: '了解中华优秀传统文化的精髓和现代价值',
      thumbnail: '/images/course2.jpg',
      duration: '3小时15分',
      difficulty: 'easy',
      progress: 30,
      rating: 4.6,
      students: 892,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>推荐课程</span>
        </CardTitle>
        <CardDescription>基于您的学习兴趣为您推荐</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Video className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{course.students}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{course.rating}</span>
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">学习进度</span>
                      <span className="text-gray-900">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// 最近学习
function RecentLearning() {
  const recentItems = [
    {
      id: '1',
      title: '习近平新时代中国特色社会主义思想概论',
      type: 'course',
      progress: 45,
      lastAccessed: '2小时前',
      thumbnail: '/images/recent1.jpg',
    },
    {
      id: '2',
      title: '爱国主义教育实践',
      type: 'video',
      progress: 100,
      lastAccessed: '1天前',
      thumbnail: '/images/recent2.jpg',
    },
    {
      id: '3',
      title: '党史学习专题',
      type: 'course',
      progress: 20,
      lastAccessed: '3天前',
      thumbnail: '/images/recent3.jpg',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>最近学习</span>
        </CardTitle>
        <CardDescription>继续您的学习进度</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                {item.type === 'course' ? (
                  <BookOpen className="h-6 w-6 text-gray-400" />
                ) : (
                  <Video className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500">{item.lastAccessed}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={item.progress} className="h-1.5 w-20" />
                    <span className="text-xs text-gray-600">{item.progress}%</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Play className="h-4 w-4 mr-1" />
                继续
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// 学习成就
function Achievements() {
  const achievements = [
    { id: '1', title: '学习新秀', description: '完成第一门课程', icon: Award, unlocked: true, progress: 100 },
    { id: '2', title: '知识探索者', description: '学习时长达到100小时', icon: Trophy, unlocked: true, progress: 100 },
    { id: '3', title: '学习达人', description: '完成10门课程', icon: Target, unlocked: false, progress: 80 },
    { id: '4', title: '思政专家', description: '获得1000积分', icon: Star, unlocked: false, progress: 45 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5" />
          <span>学习成就</span>
        </CardTitle>
        <CardDescription>记录您的学习里程碑</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.unlocked
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    achievement.unlocked ? 'bg-yellow-200 text-yellow-700' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <achievement.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">进度</span>
                      <span className="text-gray-900">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-1.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// 学习活动
function LearningActivity() {
  const activities = [
    {
      id: '1',
      type: 'course_completed',
      title: '完成了课程《爱国主义教育实践》',
      time: '2小时前',
      points: 50,
    },
    {
      id: '2',
      type: 'video_watched',
      title: '观看了视频《青年一代的使命担当》',
      time: '5小时前',
      points: 10,
    },
    {
      id: '3',
      type: 'discussion_posted',
      title: '在讨论区发表了话题',
      time: '1天前',
      points: 20,
    },
    {
      id: '4',
      type: 'assignment_completed',
      title: '提交了作业《我的中国梦》',
      time: '2天前',
      points: 30,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>学习动态</span>
        </CardTitle>
        <CardDescription>您的最新学习活动</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.title}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500">{activity.time}</span>
                  <span className="text-xs text-green-600 font-medium">+{activity.points}积分</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StudentPage() {
  const { user } = useAuthStore();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">学习平台</h1>
            <p className="text-gray-600">欢迎回来，{user?.name}！继续您的思政学习之旅</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/my-courses">
              <Button>我的课程</Button>
            </Link>
            <Link href="/assignments">
              <Button variant="outline">作业任务</Button>
            </Link>
          </div>
        </div>

        {/* 学习统计 */}
        <LearningStats />

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：推荐课程和最近学习 */}
          <div className="lg:col-span-2 space-y-6">
            <RecommendedCourses />
            <RecentLearning />
          </div>

          {/* 右侧：成就和活动 */}
          <div className="space-y-6">
            <Achievements />
            <LearningActivity />
          </div>
        </div>

        {/* 快速入口 */}
        <Card>
          <CardHeader>
            <CardTitle>快速入口</CardTitle>
            <CardDescription>快速访问常用功能</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/library" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <Video className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <span className="text-sm font-medium">视频库</span>
              </Link>
              <Link href="/practice" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <span className="text-sm font-medium">创作实践</span>
              </Link>
              <Link href="/student/discussions" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <span className="text-sm font-medium">讨论区</span>
              </Link>
              <Link href="/student/progress" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <span className="text-sm font-medium">学习进度</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}