'use client';

import React, { useState, useCallback } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/lib/store';
import {
  Upload,
  Video,
  FileText,
  Image,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  File,
  Eye,
  Download,
  Trash2,
  Plus,
  Film,
  FileVideo,
  FileImage,
  FileText as FileTextIcon,
} from 'lucide-react';

// 文件类型配置
const fileTypes = {
  video: {
    name: '视频文件',
    icon: FileVideo,
    accept: '.mp4,.avi,.mov,.wmv,.flv,.mkv',
    maxSize: 500 * 1024 * 1024, // 500MB
    description: '支持 MP4, AVI, MOV, WMV, FLV, MKV 格式',
  },
  document: {
    name: '文档文件',
    icon: FileTextIcon,
    accept: '.pdf,.doc,.docx,.ppt,.pptx,.txt',
    maxSize: 50 * 1024 * 1024, // 50MB
    description: '支持 PDF, DOC, DOCX, PPT, PPTX, TXT 格式',
  },
  image: {
    name: '图片文件',
    icon: FileImage,
    accept: '.jpg,.jpeg,.png,.gif,.bmp,.webp',
    maxSize: 20 * 1024 * 1024, // 20MB
    description: '支持 JPG, PNG, GIF, BMP, WEBP 格式',
  },
  script: {
    name: '剧本文件',
    icon: FileText,
    accept: '.pdf,.doc,.docx,.txt',
    maxSize: 10 * 1024 * 1024, // 10MB
    description: '支持 PDF, DOC, DOCX, TXT 格式',
  },
};

// 上传文件接口
interface UploadFile {
  id: string;
  file: File;
  type: keyof typeof fileTypes;
  title: string;
  description: string;
  category: string;
  tags: string[];
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  url?: string;
}

// 上传历史记录
const uploadHistory = [
  {
    id: '1',
    fileName: '社会主义核心价值观.mp4',
    fileType: 'video',
    fileSize: '128MB',
    uploadTime: '2024-03-01 14:30',
    status: 'completed',
    url: '/videos/soc1.mp4',
  },
  {
    id: '2',
    fileName: '爱国主义教育课件.pdf',
    fileType: 'document',
    fileSize: '5.2MB',
    uploadTime: '2024-02-28 10:15',
    status: 'completed',
    url: '/docs/patriotism.pdf',
  },
  {
    id: '3',
    fileName: '青年担当海报.png',
    fileType: 'image',
    fileSize: '3.8MB',
    uploadTime: '2024-02-25 16:45',
    status: 'completed',
    url: '/images/youth-poster.png',
  },
];

// 文件上传卡片组件
function UploadFileCard({ file, onRemove, onPreview }: {
  file: UploadFile;
  onRemove: (id: string) => void;
  onPreview: (file: UploadFile) => void;
}) {
  const fileTypeConfig = fileTypes[file.type];
  const FileIcon = fileTypeConfig.icon;

  const getStatusIcon = () => {
    switch (file.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusText = () => {
    switch (file.status) {
      case 'pending':
        return '等待上传';
      case 'uploading':
        return '上传中...';
      case 'completed':
        return '上传完成';
      case 'error':
        return '上传失败';
      default:
        return '未知状态';
    }
  };

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{file.title}</h4>
              <p className="text-sm text-gray-600">{file.file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-sm text-gray-600">{getStatusText()}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemove(file.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {file.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{file.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            {file.status === 'uploading' && (
              <Progress value={file.progress} className="h-2" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            {file.status === 'completed' && (
              <Button size="sm" variant="outline" onClick={() => onPreview(file)}>
                <Eye className="h-4 w-4 mr-1" />
                预览
              </Button>
            )}
            {file.status === 'error' && (
              <Button size="sm" variant="outline">
                重试
              </Button>
            )}
          </div>
        </div>

        {file.error && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {file.error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 上传历史卡片组件
function HistoryItem({ item }: { item: any }) {
  const fileTypeConfig = fileTypes[item.fileType as keyof typeof fileTypes];
  const FileIcon = fileTypeConfig.icon;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileIcon className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">{item.fileName}</h4>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{item.fileSize}</span>
                <span>•</span>
                <span>{item.uploadTime}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              已完成
            </Badge>
            <Button size="sm" variant="ghost">
              <Download className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UploadPage() {
  const { user } = useAuthStore();
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [selectedType, setSelectedType] = useState<keyof typeof fileTypes>('video');
  const [isDragging, setIsDragging] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  // 处理文件选择
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      // 检查文件类型
      const fileType = Object.entries(fileTypes).find(([_, config]) =>
        config.accept.split(',').some(ext => file.name.toLowerCase().endsWith(ext.replace('.', '')))
      )?.[0] as keyof typeof fileTypes;

      if (!fileType) {
        alert(`不支持的文件类型: ${file.name}`);
        return;
      }

      const fileTypeConfig = fileTypes[fileType];
      if (file.size > fileTypeConfig.maxSize) {
        alert(`文件过大: ${file.name} (最大 ${fileTypeConfig.maxSize / 1024 / 1024}MB)`);
        return;
      }

      const uploadFile: UploadFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: fileType,
        title: file.name.replace(/\.[^/.]+$/, ''),
        description: '',
        category: '',
        tags: [],
        progress: 0,
        status: 'pending',
      };

      setUploadFiles(prev => [...prev, uploadFile]);
      setShowForm(true);
      setCurrentFile(file);
    });
  }, []);

  // 拖拽处理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  // 模拟文件上传
  const simulateUpload = useCallback((fileId: string) => {
    setUploadFiles(prev => prev.map(f =>
      f.id === fileId ? { ...f, status: 'uploading' as const } : f
    ));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadFiles(prev => prev.map(f =>
          f.id === fileId ? {
            ...f,
            status: 'completed' as const,
            progress: 100,
            url: `/uploads/${f.file.name}`
          } : f
        ));
      } else {
        setUploadFiles(prev => prev.map(f =>
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 500);
  }, []);

  // 移除文件
  const removeFile = useCallback((id: string) => {
    setUploadFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  // 预览文件
  const previewFile = useCallback((file: UploadFile) => {
    if (file.url) {
      window.open(file.url, '_blank');
    }
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">文件上传</h1>
          <p className="text-gray-600">上传视频、文档、图片等教学资源</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 上传区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 文件类型选择 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">选择文件类型</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(fileTypes).map(([type, config]) => {
                    const Icon = config.icon;
                    return (
                      <Button
                        key={type}
                        variant={selectedType === type ? 'default' : 'outline'}
                        className="flex flex-col items-center space-y-2 h-20"
                        onClick={() => setSelectedType(type as keyof typeof fileTypes)}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-xs">{config.name}</span>
                      </Button>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  {fileTypes[selectedType].description}
                </p>
              </CardContent>
            </Card>

            {/* 拖拽上传区域 */}
            <Card>
              <CardContent className="p-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    拖拽文件到此处上传
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    或者点击下方按钮选择文件
                  </p>
                  <input
                    type="file"
                    id="file-input"
                    className="hidden"
                    accept={fileTypes[selectedType].accept}
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                  />
                  <label htmlFor="file-input">
                    <Button asChild>
                      <span>
                        <Plus className="h-4 w-4 mr-2" />
                        选择文件
                      </span>
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* 上传文件列表 */}
            {uploadFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>上传队列</CardTitle>
                  <CardDescription>
                    {uploadFiles.filter(f => f.status === 'completed').length} / {uploadFiles.length} 已完成
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {uploadFiles.map((file) => (
                      <UploadFileCard
                        key={file.id}
                        file={file}
                        onRemove={removeFile}
                        onPreview={previewFile}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setUploadFiles([])}
                    >
                      清空列表
                    </Button>
                    <Button
                      onClick={() => uploadFiles.forEach(f => {
                        if (f.status === 'pending') {
                          simulateUpload(f.id);
                        }
                      })}
                    >
                      开始上传
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 上传统计 */}
            <Card>
              <CardHeader>
                <CardTitle>上传统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">今日上传</span>
                    <span className="font-medium text-gray-900">12 个文件</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">本月上传</span>
                    <span className="font-medium text-gray-900">156 个文件</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">存储使用</span>
                    <span className="font-medium text-gray-900">2.3 GB / 10 GB</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">使用率</span>
                      <span className="text-gray-900">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 上传历史 */}
            <Card>
              <CardHeader>
                <CardTitle>上传历史</CardTitle>
                <CardDescription>最近上传的文件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadHistory.map((item) => (
                    <HistoryItem key={item.id} item={item} />
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  查看全部历史
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}