'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ClipboardList,
  Calendar,
  Clock,
  FileText,
  Video,
  CheckCircle,
  AlertCircle,
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Star,
  Timer,
  User,
  BookOpen,
  Download,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

// 模拟作业数据
const assignments = [
  {
    id: '1',
    title: '我的中国梦征文',
    description: '结合自身实际，谈谈对中国梦的理解和感悟，不少于800字',
    type: 'essay',
    courseTitle: '思想道德修养',
    teacherName: '张老师',
    dueDate: '2024-03-15',
    dueTime: '23:59',
    totalPoints: 100,
    status: 'submitted',
    submissionDate: '2024-03-10',
    score: 85,
    feedback: '文章结构清晰，观点鲜明，但在论证深度上还可以进一步加强。',
    attachments: [
      { name: '征文要求.docx', size: '256KB', url: '#' },
      { name: '评分标准.pdf', size: '128KB', url: '#' },
    ],
    estimatedTime: '2小时',
    difficulty: 'medium',
  },
  {
    id: '2',
    title: '观看《建党伟业》并撰写观后感',
    description: '观看指定电影，撰写不少于500字的观后感，重点谈谈对党的认识',
    type: 'video',
    courseTitle: '党史学习专题',
    teacherName: '李老师',
    dueDate: '2024-03-20',
    dueTime: '18:00',
    totalPoints: 50,
    status: 'in_progress',
    submissionDate: null,
    score: null,
    feedback: null,
    attachments: [
      { name: '观看指南.pdf', size: '512KB', url: '#' },
    ],
    estimatedTime: '3小时',
    difficulty: 'easy',
  },
  {
    id: '3',
    title: '社会主义核心价值观知识问答',
    description: '完成关于社会主义核心价值观的在线测验，共20道选择题',
    type: 'quiz',
    courseTitle: '社会主义核心价值观专题',
    teacherName: '王老师',
    dueDate: '2024-03-08',
    dueTime: '12:00',
    totalPoints: 30,
    status: 'overdue',
    submissionDate: null,
    score: null,
    feedback: null,
    attachments: [],
    estimatedTime: '45分钟',
    difficulty: 'easy',
  },
  {
    id: '4',
    title: '思政微电影创作策划案',
    description: '设计一个思政主题的微电影创作策划案，包括故事梗概、角色设定、拍摄计划等',
    type: 'project',
    courseTitle: '思政创作实践',
    teacherName: '刘老师',
    dueDate: '2024-03-25',
    dueTime: '23:59',
    totalPoints: 150,
    status: 'not_started',
    submissionDate: null,
    score: null,
    feedback: null,
    attachments: [
      { name: '策划案模板.docx', size: '384KB', url: '#' },
      { name: '评分细则.pdf', size: '196KB', url: '#' },
    ],
    estimatedTime: '4小时',
    difficulty: 'hard',
  },
  {
    id: '5',
    title: '爱国主义主题演讲稿',
    description: '撰写一篇关于爱国主义主题的演讲稿，时长3-5分钟',
    type: 'essay',
    courseTitle: '爱国主义教育',
    teacherName: '陈老师',
    dueDate: '2024-02-28',
    dueTime: '16:00',
    totalPoints: 80,
    status: 'graded',
    submissionDate: '2024-02-25',
    score: 92,
    feedback: '演讲稿情感真挚，内容充实，表达流畅，是一次优秀的作品！',
    attachments: [
      { name: '演讲技巧指导.pdf', size: '256KB', url: '#' },
    ],
    estimatedTime: '1.5小时',
    difficulty: 'medium',
  },
];

// 作业卡片组件
function AssignmentCard({ assignment }: { assignment: any }) {
  const getStatusIcon = () => {
    switch (assignment.status) {
      case 'graded':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'submitted':
        return <Timer className="h-4 w-4 text-blue-600" />;
      case 'in_progress':
        return <Edit className="h-4 w-4 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (assignment.status) {
      case 'graded':
        return '已批改';
      case 'submitted':
        return '已提交';
      case 'in_progress':
        return '进行中';
      case 'overdue':
        return '已逾期';
      default:
        return '未开始';
    }
  };

  const getStatusColor = () => {
    switch (assignment.status) {
      case 'graded':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = () => {
    switch (assignment.type) {
      case 'essay':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'quiz':
        return <CheckCircle className="h-4 w-4" />;
      case 'project':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeText = () => {
    switch (assignment.type) {
      case 'essay':
        return '征文作业';
      case 'video':
        return '视频作业';
      case 'quiz':
        return '测验作业';
      case 'project':
        return '项目作业';
      default:
        return '其他作业';
    }
  };

  const getDifficultyColor = () => {
    switch (assignment.difficulty) {
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
    switch (assignment.difficulty) {
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

  const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status !== 'graded' && assignment.status !== 'submitted';

  return (
    <Card className={`hover:shadow-lg transition-shadow ${isOverdue ? 'border-red-200' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <Badge variant="secondary" className={getStatusColor()}>
              {getStatusText()}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-800">
              {getTypeIcon()}
              <span className="ml-1">{getTypeText()}</span>
            </Badge>
            <Badge variant="outline" className={getDifficultyColor()}>
              {getDifficultyText()}
            </Badge>
            {isOverdue && (
              <Badge variant="destructive">已逾期</Badge>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">总分</div>
            <div className="text-lg font-semibold text-gray-900">{assignment.totalPoints}分</div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{assignment.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{assignment.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <BookOpen className="h-4 w-4" />
            <span>{assignment.courseTitle}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>{assignment.teacherName}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>截止: {assignment.dueDate} {assignment.dueTime}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>预计用时: {assignment.estimatedTime}</span>
          </div>
        </div>

        {/* 附件 */}
        {assignment.attachments.length > 0 && (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">附件:</div>
            <div className="flex flex-wrap gap-2">
              {assignment.attachments.map((attachment: any, index: number) => (
                <div key={index} className="flex items-center space-x-1 text-xs bg-gray-100 px-2 py-1 rounded">
                  <Download className="h-3 w-3" />
                  <span>{attachment.name}</span>
                  <span className="text-gray-500">({attachment.size})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 分数和反馈 */}
        {assignment.score !== null && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-green-800">得分: {assignment.score}/{assignment.totalPoints}</span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(assignment.score / 20) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            {assignment.feedback && (
              <p className="text-sm text-green-700">{assignment.feedback}</p>
            )}
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {assignment.status === 'graded' && (
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-1" />
                查看详情
              </Button>
            )}
            {assignment.status === 'not_started' && (
              <Button size="sm">
                <Edit className="h-4 w-4 mr-1" />
                开始作业
              </Button>
            )}
            {assignment.status === 'in_progress' && (
              <Button size="sm">
                <Edit className="h-4 w-4 mr-1" />
                继续编辑
              </Button>
            )}
          </div>
          {assignment.submissionDate && (
            <div className="text-xs text-gray-500">
              提交时间: {assignment.submissionDate}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // 过滤作业
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesType = typeFilter === 'all' || assignment.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // 根据标签页过滤
  const getTabAssignments = (tab: string) => {
    switch (tab) {
      case 'pending':
        return filteredAssignments.filter(a => a.status === 'not_started' || a.status === 'in_progress');
      case 'submitted':
        return filteredAssignments.filter(a => a.status === 'submitted' || a.status === 'graded');
      case 'overdue':
        return filteredAssignments.filter(a => {
          const dueDate = new Date(a.dueDate);
          return dueDate < new Date() && a.status !== 'graded' && a.status !== 'submitted';
        });
      default:
        return filteredAssignments;
    }
  };

  // 统计数据
  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'not_started' || a.status === 'in_progress').length,
    submitted: assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length,
    overdue: assignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      return dueDate < new Date() && a.status !== 'graded' && a.status !== 'submitted';
    }).length,
    avgScore: assignments
      .filter(a => a.score !== null)
      .reduce((acc, a) => acc + a.score, 0) / assignments.filter(a => a.score !== null).length || 0,
  };

  const currentAssignments = getTabAssignments(activeTab);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">作业任务</h1>
            <p className="text-gray-600">查看和完成您的学习任务</p>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ClipboardList className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总作业数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Timer className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">待完成</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
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
                  <p className="text-sm text-gray-600">已提交</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.submitted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">已逾期</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">平均分</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgScore.toFixed(1)}</p>
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
                    placeholder="搜索作业..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="作业状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="not_started">未开始</SelectItem>
                  <SelectItem value="in_progress">进行中</SelectItem>
                  <SelectItem value="submitted">已提交</SelectItem>
                  <SelectItem value="graded">已批改</SelectItem>
                  <SelectItem value="overdue">已逾期</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="作业类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="essay">征文作业</SelectItem>
                  <SelectItem value="video">视频作业</SelectItem>
                  <SelectItem value="quiz">测验作业</SelectItem>
                  <SelectItem value="project">项目作业</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 作业列表 */}
        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">全部作业 ({stats.total})</TabsTrigger>
                <TabsTrigger value="pending">待完成 ({stats.pending})</TabsTrigger>
                <TabsTrigger value="submitted">已提交 ({stats.submitted})</TabsTrigger>
                <TabsTrigger value="overdue">已逾期 ({stats.overdue})</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="all" className="space-y-4">
                {currentAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
              </TabsContent>
              <TabsContent value="pending" className="space-y-4">
                {currentAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
              </TabsContent>
              <TabsContent value="submitted" className="space-y-4">
                {currentAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
              </TabsContent>
              <TabsContent value="overdue" className="space-y-4">
                {currentAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
              </TabsContent>
            </Tabs>

            {currentAssignments.length === 0 && (
              <div className="text-center py-12">
                <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到作业</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                    ? '尝试调整搜索条件或筛选器'
                    : '当前分类下没有作业'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}