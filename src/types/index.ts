// 用户角色类型
export type UserRole = 'admin' | 'teacher' | 'student' | 'manager';

// 用户信息接口
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  organization?: string;
  grade?: string;
  subject?: string;
}

// 视频内容接口
export interface VideoContent {
  id: string;
  title: string;
  description: string;
  tags: string[];
  fileUrl: string;
  thumbnailUrl: string;
  creator: string;
  creatorId: string;
  duration: number; // 秒
  fileSize: number;
  uploadTime: string;
  auditStatus: 'pending' | 'approved' | 'rejected';
  auditLog?: {
    auditor: string;
    time: string;
    comment: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
  rightsExpireAt?: string;
  viewCount: number;
  category: string;
  grade: string;
  subject: string;
}

// 课程接口
export interface Course {
  id: string;
  title: string;
  description: string;
  grade: string;
  theme: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  instructorId: string;
  instructorName: string;
  instructorSchool: string;
  videoIds: string[];
  materials: CourseMaterial[];
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'published' | 'draft' | 'archived';
  enrolledStudents: number;
  estimatedHours: number;
  rating?: number;
  objectives: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  subscribedStudents: string[];
  totalStudents: number;
  progress?: {
    videoId: string;
    completed: boolean;
    watchTime: number;
  }[];
}

// 课程资料接口
export interface CourseMaterial {
  id: string;
  name: string;
  type: 'document' | 'presentation' | 'worksheet' | 'other' | 'video';
  fileUrl: string;
  fileSize: number;
  uploadTime: string;
  title: string;
  duration?: number;
  completed?: boolean;
}

// 教案接口
export interface LessonPlan {
  id: string;
  teacherId: string;
  title: string;
  content: string;
  topic: string;
  courseId: string;
  grade: string;
  subject: string;
  status: 'published' | 'draft' | 'in-progress';
  duration: number;
  targetAudience: string;
  difficulty: 'easy' | 'medium' | 'hard';
  objectives: string[];
  teachingMethods: string[];
  assessment: string[];
  materials: LessonMaterial[];
  aiSuggestions?: string[];
  createdAt: string;
  updatedAt: string;
  isShared: boolean;
  tags: string[];
  likes: number;
  downloads: number;
}

// 教案材料接口
export interface LessonMaterial {
  id: string;
  title: string;
  type: 'video' | 'document' | 'presentation' | 'quiz';
  url: string;
  duration?: number;
  completed?: boolean;
}

// 学生作品接口
export interface StudentWork {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  type: 'video' | 'script' | 'poster';
  fileUrl: string;
  thumbnailUrl?: string;
  description: string;
  competitionId?: string;
  score?: number;
  feedback?: string;
  teacherId?: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
}

// 赛事活动接口
export interface Competition {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team';
  category: string;
  grade: string[];
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  teacherId?: string;
  requirements: string[];
  rules: string;
  prizes: string[];
  materials?: CompetitionMaterial[];
}

// 赛事资料接口
export interface CompetitionMaterial {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  type: 'guideline' | 'template' | 'example' | 'other';
}

// 作业接口
export interface Assignment {
  id: string;
  courseId: string;
  teacherId: string;
  title: string;
  description: string;
  type: 'quiz' | 'essay' | 'video' | 'other';
  dueDate: string;
  totalPoints: number;
  instructions: string;
  attachments: AssignmentAttachment[];
  submissions: AssignmentSubmission[];
  createdAt: string;
}

// 作业附件接口
export interface AssignmentAttachment {
  id: string;
  name: string;
  fileUrl: string;
  type: string;
}

// 作业提交接口
export interface AssignmentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  content: string;
  attachments: string[];
  submittedAt: string;
  score?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'returned';
}

// 评估报告接口
export interface EvaluationReport {
  id: string;
  period: 'weekly' | 'monthly' | 'quarterly';
  startDate: string;
  endDate: string;
  metrics: {
    activeTeachers: number;
    activeStudents: number;
    totalVideos: number;
    totalCourses: number;
    avgCompletionRate: number;
    totalWatchTime: number;
    engagement: number;
  };
  recommendations: string;
  insights: string[];
  charts: ChartData[];
  createdAt: string;
}

// 图表数据接口
export interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  data: any[];
  config?: Record<string, any>;
}

// 评论接口
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  targetId: string;
  targetType: 'video' | 'course' | 'work' | 'discussion';
  parentId?: string;
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

// 讨论主题接口
export interface Discussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  courseId?: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: Comment[];
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// 通知接口
export interface Notification {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

// API响应接口
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 分页接口
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}