'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MessageSquare,
  Search,
  Plus,
  Heart,
  MessageCircle,
  Eye,
  Pin,
  Lock,
  Clock,
  User,
  Calendar,
  TrendingUp,
  Star,
  Filter,
  Bookmark,
  Share,
  Flag,
  Reply,
} from 'lucide-react';

// 模拟讨论数据
const discussions = [
  {
    id: '1',
    title: '如何理解社会主义核心价值观的深层内涵？',
    content: '最近在学习社会主义核心价值观，感觉其中有很多深层次的哲学思想，想和大家探讨一下如何更好地理解其内涵...',
    author: {
      id: '1',
      name: '张同学',
      avatar: '/avatars/student1.png',
      role: 'student',
    },
    course: '社会主义核心价值观专题',
    category: '理论学习',
    tags: ['社会主义核心价值观', '理论学习', '探讨'],
    views: 156,
    likes: 23,
    replies: 8,
    isPinned: true,
    isLocked: false,
    createdAt: '2024-03-01',
    lastReplyAt: '2024-03-02',
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: '2',
    title: '观看《长津湖》后的感想分享',
    content: '今天观看了《长津湖》这部影片，被志愿军战士们的英勇事迹深深感动。他们为了国家和人民，冒着严寒和敌人的炮火，坚守阵地...',
    author: {
      id: '2',
      name: '李同学',
      avatar: '/avatars/student2.png',
      role: 'student',
    },
    course: '党史学习专题',
    category: '观影感悟',
    tags: ['长津湖', '抗美援朝', '爱国教育'],
    views: 289,
    likes: 45,
    replies: 12,
    isPinned: false,
    isLocked: false,
    createdAt: '2024-02-28',
    lastReplyAt: '2024-03-01',
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '3',
    title: '传统文化在现代社会的价值体现',
    content: '随着现代社会的发展，我们应该如何看待和传承中华优秀传统文化？它对现代社会有什么重要意义？欢迎大家分享自己的观点...',
    author: {
      id: '3',
      name: '王同学',
      avatar: '/avatars/student3.png',
      role: 'student',
    },
    course: '中华优秀传统文化',
    category: '文化传承',
    tags: ['传统文化', '现代价值', '文化自信'],
    views: 124,
    likes: 18,
    replies: 6,
    isPinned: false,
    isLocked: false,
    createdAt: '2024-02-25',
    lastReplyAt: '2024-02-27',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '4',
    title: '[讨论]关于青年一代的责任与担当',
    content: '作为新时代的青年，我们应该如何承担起自己的责任？在实现个人价值的同时，如何为社会做出贡献？',
    author: {
      id: '4',
      name: '刘同学',
      avatar: '/avatars/student4.png',
      role: 'student',
    },
    course: '青年思想教育',
    category: '青年成长',
    tags: ['青年责任', '时代担当', '价值观'],
    views: 198,
    likes: 32,
    replies: 15,
    isPinned: false,
    isLocked: true,
    createdAt: '2024-02-20',
    lastReplyAt: '2024-02-26',
    isLiked: true,
    isBookmarked: true,
  },
];

// 模拟回复数据
const replies = [
  {
    id: '1',
    content: '我觉得可以从三个层面来理解：国家层面、社会层面和个人层面。每个层面都有其特定的要求和目标...',
    author: {
      id: '5',
      name: '陈同学',
      avatar: '/avatars/student5.png',
      role: 'student',
    },
    likes: 5,
    createdAt: '2024-03-01',
    isLiked: false,
  },
  {
    id: '2',
    content: '在实践过程中，我发现将理论学习与实际生活结合起来是最好的方式。比如在日常生活中践行诚信、友善等价值观...',
    author: {
      id: '6',
      name: '赵同学',
      avatar: '/avatars/student6.png',
      role: 'student',
    },
    likes: 8,
    createdAt: '2024-03-02',
    isLiked: true,
  },
];

// 讨论卡片组件
function DiscussionCard({ discussion }: { discussion: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* 标题区域 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {discussion.isPinned && (
              <Pin className="h-4 w-4 text-red-600" />
            )}
            {discussion.isLocked && (
              <Lock className="h-4 w-4 text-gray-400" />
            )}
            <Badge variant="outline" className="bg-blue-50 text-blue-800">
              {discussion.category}
            </Badge>
            <span className="text-xs text-gray-500">{discussion.course}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost">
              <Bookmark className={`h-4 w-4 ${discussion.isBookmarked ? 'text-yellow-600 fill-current' : 'text-gray-400'}`} />
            </Button>
            <Button size="sm" variant="ghost">
              <Flag className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* 标题和内容 */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
          {discussion.title}
        </h3>
        <p className={`text-gray-600 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {discussion.content}
        </p>
        {discussion.content.length > 150 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-4 text-blue-600"
          >
            {isExpanded ? '收起' : '展开更多'}
          </Button>
        )}

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {discussion.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 作者和统计信息 */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={discussion.author.avatar} />
                <AvatarFallback>{discussion.author.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span>{discussion.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{discussion.createdAt}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{discussion.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className={`h-3 w-3 ${discussion.isLiked ? 'text-red-500 fill-current' : ''}`} />
              <span>{discussion.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-3 w-3" />
              <span>{discussion.replies}</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
          <Button size="sm" variant="outline">
            <MessageSquare className="h-4 w-4 mr-1" />
            回复
          </Button>
          <Button size="sm" variant="ghost">
            <Heart className={`h-4 w-4 mr-1 ${discussion.isLiked ? 'text-red-500 fill-current' : ''}`} />
            {discussion.isLiked ? '已赞' : '点赞'}
          </Button>
          <Button size="sm" variant="ghost">
            <Share className="h-4 w-4 mr-1" />
            分享
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// 新建讨论弹窗组件
function NewDiscussionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [course, setCourse] = useState('');
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>发起新讨论</CardTitle>
          <CardDescription>分享您的想法，与同学们交流学习心得</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">讨论标题</label>
            <Input
              placeholder="请输入讨论标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">分类</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="理论学习">理论学习</SelectItem>
                  <SelectItem value="观影感悟">观影感悟</SelectItem>
                  <SelectItem value="文化传承">文化传承</SelectItem>
                  <SelectItem value="青年成长">青年成长</SelectItem>
                  <SelectItem value="实践交流">实践交流</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">相关课程</label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="选择课程" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="社会主义核心价值观专题">社会主义核心价值观专题</SelectItem>
                  <SelectItem value="党史学习专题">党史学习专题</SelectItem>
                  <SelectItem value="中华优秀传统文化">中华优秀传统文化</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">讨论内容</label>
            <Textarea
              placeholder="详细描述您的想法..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">标签</label>
            <Input
              placeholder="添加标签，用逗号分隔..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button>
              发布讨论
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DiscussionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('latest');

  // 过滤讨论
  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || discussion.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // 根据标签页排序
  const getSortedDiscussions = (tab: string) => {
    const sorted = [...filteredDiscussions];
    switch (tab) {
      case 'popular':
        return sorted.sort((a, b) => b.likes - a.likes);
      case 'hot':
        return sorted.sort((a, b) => b.replies - a.replies);
      case 'pinned':
        return sorted.filter(d => d.isPinned);
      default:
        return sorted.sort((a, b) => new Date(b.lastReplyAt).getTime() - new Date(a.lastReplyAt).getTime());
    }
  };

  // 获取唯一分类
  const categories = ['all', ...Array.from(new Set(discussions.map(d => d.category)))];

  // 统计数据
  const stats = {
    total: discussions.length,
    pinned: discussions.filter(d => d.isPinned).length,
    myDiscussions: discussions.filter(d => d.author.id === '1').length,
    myBookmarks: discussions.filter(d => d.isBookmarked).length,
  };

  const currentDiscussions = getSortedDiscussions(activeTab);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">学习讨论区</h1>
            <p className="text-gray-600">与同学分享学习心得，交流思想感悟</p>
          </div>
          <Button onClick={() => setShowNewDiscussionModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            发起讨论
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总讨论数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Pin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">置顶讨论</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pinned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">我的讨论</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.myDiscussions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Bookmark className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">我的收藏</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.myBookmarks}</p>
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
                    placeholder="搜索讨论、标签..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="讨论分类" />
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

        {/* 讨论列表 */}
        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="latest">最新</TabsTrigger>
                <TabsTrigger value="popular">最热</TabsTrigger>
                <TabsTrigger value="hot">回复最多</TabsTrigger>
                <TabsTrigger value="pinned">置顶</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentDiscussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
              ))}
            </div>

            {currentDiscussions.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到讨论</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || categoryFilter !== 'all'
                    ? '尝试调整搜索条件或筛选器'
                    : '还没有人发起讨论，来做一个吧！'}
                </p>
                <Button onClick={() => setShowNewDiscussionModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  发起第一个讨论
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 新建讨论弹窗 */}
        <NewDiscussionModal
          isOpen={showNewDiscussionModal}
          onClose={() => setShowNewDiscussionModal(false)}
        />
      </div>
    </MainLayout>
  );
}