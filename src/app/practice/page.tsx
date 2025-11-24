'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/lib/store';
import {
  Trophy,
  Video,
  FileText,
  Image,
  Upload,
  Search,
  Plus,
  Calendar,
  Users,
  Star,
  Eye,
  Heart,
  MessageSquare,
  Clock,
  Target,
  Award,
  BookOpen,
  Lightbulb,
  Camera,
  Edit,
  Play,
  Download,
  Share,
} from 'lucide-react';
import Link from 'next/link';

// 模拟创作数据
const creativeWorks = [
  {
    id: '1',
    title: '青春心向党',
    description: '展现新时代青年对党的忠诚和对祖国的热爱，通过微电影形式表达青年一代的理想与担当',
    type: 'video',
    author: {
      id: '1',
      name: '张同学',
      avatar: '/avatars/student1.png',
      role: 'student',
      school: '石家庄第一中学',
    },
    thumbnail: '/images/work1.jpg',
    duration: '5分23秒',
    fileSize: '128MB',
    views: 1256,
    likes: 89,
    comments: 23,
    category: '爱国主题',
    tags: ['青春', '爱党', '理想担当'],
    status: 'published',
    submittedAt: '2024-02-15',
    competitionId: '1',
    competitionTitle: '青春献给党微电影大赛',
    score: 92,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: '2',
    title: '传承红色基因',
    description: '通过纪录片形式，记录和展示革命先辈的英勇事迹，传承和弘扬红色基因',
    type: 'video',
    author: {
      id: '2',
      name: '李同学',
      avatar: '/avatars/student2.png',
      role: 'student',
      school: '保定第二中学',
    },
    thumbnail: '/images/work2.jpg',
    duration: '8分15秒',
    fileSize: '256MB',
    views: 892,
    likes: 67,
    comments: 15,
    category: '红色传承',
    tags: ['红色基因', '革命精神', '纪录片'],
    status: 'published',
    submittedAt: '2024-02-10',
    competitionId: '1',
    competitionTitle: '青春献给党微电影大赛',
    score: 88,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '3',
    title: '我的中国梦剧本',
    description: '原创剧本，讲述当代青年如何在新时代背景下实现个人理想与中国梦的统一',
    type: 'script',
    author: {
      id: '3',
      name: '王同学',
      avatar: '/avatars/student3.png',
      role: 'student',
      school: '唐山第一中学',
    },
    thumbnail: '/images/work3.jpg',
    duration: '约15分钟',
    fileSize: '2.5MB',
    views: 445,
    likes: 34,
    comments: 8,
    category: '原创剧本',
    tags: ['中国梦', '青春剧本', '原创作品'],
    status: 'published',
    submittedAt: '2024-02-08',
    competitionId: '2',
    competitionTitle: '思政原创剧本征集',
    score: 85,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '4',
    title: '社会主义核心价值观海报设计',
    description: '通过视觉设计展现社会主义核心价值观的内涵，采用现代设计元素与传统文化相结合',
    type: 'poster',
    author: {
      id: '4',
      name: '刘同学',
      avatar: '/avatars/student4.png',
      role: 'student',
      school: '邯郸第一中学',
    },
    thumbnail: '/images/work4.jpg',
    duration: '静态作品',
    fileSize: '5.8MB',
    views: 678,
    likes: 56,
    comments: 12,
    category: '视觉设计',
    tags: ['海报设计', '核心价值观', '视觉传达'],
    status: 'published',
    submittedAt: '2024-02-05',
    competitionId: '3',
    competitionTitle: '核心价值观视觉设计大赛',
    score: 90,
    isLiked: true,
    isBookmarked: true,
  },
];

// 模拟赛事数据
const competitions = [
  {
    id: '1',
    title: '青春献给党微电影大赛',
    description: '围绕建党主题，展现青年一代的爱党情怀和时代担当',
    type: 'individual',
    category: '微电影创作',
    startDate: '2024-01-15',
    endDate: '2024-03-31',
    registrationDeadline: '2024-03-15',
    maxParticipants: 500,
    currentParticipants: 234,
    status: 'ongoing',
    prizes: ['一等奖5000元', '二等奖3000元', '三等奖1000元'],
    requirements: ['时长5-10分钟', '原创作品', '主题鲜明', '制作精良'],
  },
  {
    id: '2',
    title: '思政原创剧本征集',
    description: '征集具有思想政治教育意义的原创剧本，推动思政教育创新发展',
    type: 'individual',
    category: '文学创作',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    registrationDeadline: '2024-04-15',
    maxParticipants: 200,
    currentParticipants: 89,
    status: 'ongoing',
    prizes: ['一等奖3000元', '二等奖1500元', '三等奖800元'],
    requirements: ['原创剧本', '主题明确', '结构完整', '积极向上'],
  },
  {
    id: '3',
    title: '社会主义核心价值观视觉设计大赛',
    description: '通过视觉设计作品展现和传播社会主义核心价值观',
    type: 'individual',
    category: '视觉设计',
    startDate: '2024-01-01',
    endDate: '2024-03-15',
    registrationDeadline: '2024-02-28',
    maxParticipants: 300,
    currentParticipants: 156,
    status: 'completed',
    prizes: ['一等奖4000元', '二等奖2000元', '三等奖1000元'],
    requirements: ['原创设计', '主题贴切', '视觉效果好', '适合传播'],
  },
];

// 创作工具
const creativeTools = [
  {
    id: '1',
    name: '微电影创作助手',
    description: '提供剧本模板、分镜指导、拍摄技巧等创作支持',
    icon: Video,
    category: '视频创作',
    features: ['剧本模板', '分镜工具', '拍摄指导', '后期制作'],
  },
  {
    id: '2',
    name: '剧本创作工具',
    description: '专业的剧本编写工具，支持标准格式和智能提示',
    icon: Edit,
    category: '文学创作',
    features: ['标准格式', '智能提示', '版本管理', '协作编辑'],
  },
  {
    id: '3',
    name: '海报设计工具',
    description: '在线设计工具，提供丰富的模板和素材库',
    icon: Image,
    category: '视觉设计',
    features: ['模板库', '素材库', '在线编辑', '一键导出'],
  },
  {
    id: '4',
    name: '创意灵感库',
    description: '收集和分享创意灵感，激发创作思路',
    icon: Lightbulb,
    category: '灵感获取',
    features: ['灵感收集', '创意分享', '主题推荐', '案例分析'],
  },
];

// 作品卡片组件
function WorkCard({ work }: { work: any }) {
  const getTypeIcon = () => {
    switch (work.type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'script':
        return <FileText className="h-4 w-4" />;
      case 'poster':
        return <Image className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeText = () => {
    switch (work.type) {
      case 'video':
        return '微电影';
      case 'script':
        return '剧本';
      case 'poster':
        return '海报';
      default:
        return '其他';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* 作品缩略图 */}
          <div className="w-full md:w-48 h-32 md:h-auto bg-gray-200 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center relative">
            {work.type === 'video' ? (
              <>
                <Video className="h-12 w-12 text-gray-400" />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {work.duration}
                </div>
              </>
            ) : work.type === 'script' ? (
              <FileText className="h-12 w-12 text-gray-400" />
            ) : (
              <Image className="h-12 w-12 text-gray-400" />
            )}
          </div>

          {/* 作品信息 */}
          <div className="flex-1 p-6">
            <div className="flex items-center space-x-2 mb-2">
              {getTypeIcon()}
              <Badge variant="outline" className="bg-blue-50 text-blue-800">
                {getTypeText()}
              </Badge>
              <Badge variant="secondary">{work.category}</Badge>
              {work.competitionId && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
                  <Trophy className="h-3 w-3 mr-1" />
                  {work.competitionTitle}
                </Badge>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{work.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{work.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{work.author.name}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{work.submittedAt}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{work.fileSize}</span>
              </span>
              {work.score && (
                <span className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{work.score}分</span>
                </span>
              )}
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {work.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* 统计信息 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{work.views}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Heart className="h-3 w-3" />
                  <span>{work.likes}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{work.comments}</span>
                </span>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4 mr-1" />
                  查看
                </Button>
                <Button size="sm" variant="ghost">
                  <Heart className={`h-4 w-4 mr-1 ${work.isLiked ? 'text-red-500 fill-current' : ''}`} />
                  {work.isLiked ? '已赞' : '点赞'}
                </Button>
                <Button size="sm" variant="ghost">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 赛事卡片组件
function CompetitionCard({ competition }: { competition: any }) {
  const getStatusColor = () => {
    switch (competition.status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (competition.status) {
      case 'ongoing':
        return '进行中';
      case 'upcoming':
        return '即将开始';
      case 'completed':
        return '已结束';
      default:
        return '未知';
    }
  };

  const progress = (competition.currentParticipants / competition.maxParticipants) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <Badge variant="secondary" className={getStatusColor()}>
              {getStatusText()}
            </Badge>
            <Badge variant="outline">{competition.category}</Badge>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{competition.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{competition.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>开始: {competition.startDate}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>截止: {competition.endDate}</span>
          </div>
        </div>

        {/* 参赛进度 */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">参赛人数</span>
            <span className="font-medium text-gray-900">
              {competition.currentParticipants}/{competition.maxParticipants}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* 奖项 */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">奖项设置:</div>
          <div className="flex flex-wrap gap-2">
            {competition.prizes.slice(0, 2).map((prize: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs bg-yellow-50 text-yellow-800">
                <Award className="h-3 w-3 mr-1" />
                {prize}
              </Badge>
            ))}
            {competition.prizes.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{competition.prizes.length - 2}项
              </Badge>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {competition.status === 'ongoing' && (
              <Button size="sm">
                <Upload className="h-4 w-4 mr-1" />
                立即参赛
              </Button>
            )}
            {competition.status === 'upcoming' && (
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-1" />
                设置提醒
              </Button>
            )}
            {competition.status === 'completed' && (
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-1" />
                查看结果
              </Button>
            )}
          </div>
          <Button size="sm" variant="ghost">
            <BookOpen className="h-4 w-4 mr-1" />
            查看详情
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PracticePage() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('works');

  // 过滤作品
  const filteredWorks = creativeWorks.filter((work) => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || work.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || work.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  // 过滤赛事
  const filteredCompetitions = competitions.filter((competition) => {
    const matchesSearch = competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || competition.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // 统计数据
  const stats = {
    totalWorks: creativeWorks.length,
    myWorks: creativeWorks.filter(w => w.author.id === user?.id).length,
    totalCompetitions: competitions.length,
    ongoingCompetitions: competitions.filter(c => c.status === 'ongoing').length,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">创作实践</h1>
            <p className="text-gray-600">展示您的创作才华，参与思政主题创作活动</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/practice/upload">
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                上传作品
              </Button>
            </Link>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">作品总数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalWorks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">我的作品</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.myWorks}</p>
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
                  <p className="text-sm text-gray-600">创作赛事</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCompetitions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Camera className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">创作工具</p>
                  <p className="text-2xl font-bold text-gray-900">{creativeTools.length}</p>
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
                    placeholder="搜索作品或赛事..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {activeTab === 'works' && (
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="作品类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="video">微电影</SelectItem>
                    <SelectItem value="script">剧本</SelectItem>
                    <SelectItem value="poster">海报</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem value="爱国主题">爱国主题</SelectItem>
                  <SelectItem value="红色传承">红色传承</SelectItem>
                  <SelectItem value="原创剧本">原创剧本</SelectItem>
                  <SelectItem value="视觉设计">视觉设计</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 主要内容 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="works">作品展示</TabsTrigger>
            <TabsTrigger value="competitions">创作赛事</TabsTrigger>
            <TabsTrigger value="tools">创作工具</TabsTrigger>
            <TabsTrigger value="my-works">我的作品</TabsTrigger>
          </TabsList>

          <TabsContent value="works" className="space-y-4">
            {filteredWorks.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
            {filteredWorks.length === 0 && (
              <div className="text-center py-12">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到作品</h3>
                <p className="text-gray-600">尝试调整搜索条件或筛选器</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="competitions" className="space-y-4">
            {filteredCompetitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
            {filteredCompetitions.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到赛事</h3>
                <p className="text-gray-600">尝试调整搜索条件或筛选器</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tools" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creativeTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <tool.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 mb-2">主要功能:</div>
                          <div className="flex flex-wrap gap-2">
                            {tool.features.map((feature: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          使用工具
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-works" className="space-y-4">
            {creativeWorks.filter(w => w.author.id === user?.id).map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
            {creativeWorks.filter(w => w.author.id === user?.id).length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">还没有作品</h3>
                  <p className="text-gray-600 mb-4">上传您的第一部作品开始创作之旅</p>
                  <Link href="/practice/upload">
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      上传作品
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}