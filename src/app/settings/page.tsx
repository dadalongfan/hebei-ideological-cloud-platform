'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/lib/store';
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Mail,
  Lock,
  Key,
  Smartphone,
  Monitor,
  Volume2,
  Download,
  Upload,
  RefreshCw,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';

// 系统设置配置
const systemSettings = {
  general: {
    siteName: '河北思政微电影云平台',
    siteDescription: '面向河北省的思政教育微电影学习和创作平台',
    adminEmail: 'admin@hebei-ideological.edu.cn',
    contactPhone: '0311-12345678',
    address: '河北省石家庄市裕华区',
    version: '1.0.0',
  },
  security: {
    passwordMinLength: 8,
    passwordRequireSpecialChar: true,
    sessionTimeout: 120,
    maxLoginAttempts: 5,
    enableTwoFactor: false,
    enableCaptcha: true,
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newCourseNotification: true,
    assignmentReminder: true,
    systemMaintenance: true,
  },
  storage: {
    maxFileSize: 500,
    allowedFileTypes: ['mp4', 'avi', 'mov', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'png'],
    storageQuota: 100,
    autoCleanup: true,
    retentionDays: 365,
  },
  appearance: {
    theme: 'light',
    primaryColor: '#B4282E',
    accentColor: '#1E3A8A',
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    dateFormat: 'YYYY-MM-DD',
  },
};

// 用户设置
const userSettings = {
  profile: {
    displayName: '管理员',
    email: 'admin@hebei-ideological.edu.cn',
    phone: '0311-12345678',
    avatar: '/avatars/admin.png',
    bio: '系统管理员，负责平台的日常维护和管理工作。',
  },
  privacy: {
    showEmail: false,
    showPhone: false,
    showProfile: true,
    allowDirectMessages: true,
    dataSharing: false,
  },
  preferences: {
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    emailNotifications: true,
    pushNotifications: true,
    autoPlay: false,
    videoQuality: 'auto',
  },
};

// 设置项组件
function SettingItem({ label, description, children }: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(systemSettings);
  const [userProfile, setUserProfile] = useState(userSettings);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    // 这里添加保存设置的逻辑
    alert('设置已保存！');
  };

  const handleExportData = () => {
    // 这里添加导出数据的逻辑
    alert('正在导出数据...');
  };

  const handleImportData = () => {
    // 这里添加导入数据的逻辑
    alert('正在导入数据...');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
            <p className="text-gray-600">管理平台配置和个人偏好设置</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleImportData}>
              <Upload className="h-4 w-4 mr-2" />
              导入配置
            </Button>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              导出配置
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">常规设置</TabsTrigger>
            <TabsTrigger value="security">安全设置</TabsTrigger>
            <TabsTrigger value="notifications">通知设置</TabsTrigger>
            <TabsTrigger value="storage">存储设置</TabsTrigger>
            <TabsTrigger value="appearance">外观设置</TabsTrigger>
            <TabsTrigger value="profile">个人设置</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>配置平台的基本信息</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <SettingItem label="网站名称" description="显示在浏览器标题和页面头部">
                    <Input
                      value={settings.general.siteName}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        general: { ...prev.general, siteName: e.target.value }
                      }))}
                      className="w-64"
                    />
                  </SettingItem>
                  <SettingItem label="网站描述" description="网站的简短描述">
                    <Textarea
                      value={settings.general.siteDescription}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        general: { ...prev.general, siteDescription: e.target.value }
                      }))}
                      className="w-64"
                      rows={3}
                    />
                  </SettingItem>
                  <SettingItem label="管理员邮箱" description="接收系统通知和管理邮件">
                    <Input
                      type="email"
                      value={settings.general.adminEmail}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        general: { ...prev.general, adminEmail: e.target.value }
                      }))}
                      className="w-64"
                    />
                  </SettingItem>
                  <SettingItem label="联系电话" description="客服和支持电话">
                    <Input
                      value={settings.general.contactPhone}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        general: { ...prev.general, contactPhone: e.target.value }
                      }))}
                      className="w-64"
                    />
                  </SettingItem>
                  <SettingItem label="系统版本" description="当前系统版本号">
                    <Badge variant="secondary">{settings.general.version}</Badge>
                  </SettingItem>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>安全配置</CardTitle>
                <CardDescription>管理平台安全策略和密码要求</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <SettingItem
                    label="密码最小长度"
                    description="用户密码的最小字符数要求"
                  >
                    <Input
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, passwordMinLength: parseInt(e.target.value) }
                      }))}
                      className="w-24"
                    />
                  </SettingItem>
                  <SettingItem
                    label="要求特殊字符"
                    description="密码必须包含特殊字符"
                  >
                    <Switch
                      checked={settings.security.passwordRequireSpecialChar}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, passwordRequireSpecialChar: checked }
                      }))}
                    />
                  </SettingItem>
                  <SettingItem
                    label="会话超时时间（分钟）"
                    description="用户无操作后自动退出的时间"
                  >
                    <Input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                      }))}
                      className="w-24"
                    />
                  </SettingItem>
                  <SettingItem
                    label="最大登录尝试次数"
                    description="超过此次数将锁定账户"
                  >
                    <Input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
                      }))}
                      className="w-24"
                    />
                  </SettingItem>
                  <SettingItem
                    label="启用验证码"
                    description="登录时要求输入验证码"
                  >
                    <Switch
                      checked={settings.security.enableCaptcha}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, enableCaptcha: checked }
                      }))}
                    />
                  </SettingItem>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>配置系统通知和提醒方式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <SettingItem
                    label="邮件通知"
                    description="通过邮件发送系统通知"
                  >
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, emailNotifications: checked }
                      }))}
                    />
                  </SettingItem>
                  <SettingItem
                    label="短信通知"
                    description="通过短信发送重要通知"
                  >
                    <Switch
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, smsNotifications: checked }
                      }))}
                    />
                  </SettingItem>
                  <SettingItem
                    label="推送通知"
                    description="在浏览器中推送通知"
                  >
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, pushNotifications: checked }
                      }))}
                    />
                  </SettingItem>
                  <SettingItem
                    label="新课程通知"
                    description="有新课程发布时通知用户"
                  >
                    <Switch
                      checked={settings.notifications.newCourseNotification}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, newCourseNotification: checked }
                      }))}
                    />
                  </SettingItem>
                  <SettingItem
                    label="作业提醒"
                    description="作业截止前提醒用户"
                  >
                    <Switch
                      checked={settings.notifications.assignmentReminder}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, assignmentReminder: checked }
                      }))}
                    />
                  </SettingItem>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>存储设置</CardTitle>
                <CardDescription>管理文件上传和存储策略</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <SettingItem
                    label="最大文件大小（MB）"
                    description="单个文件的最大允许大小"
                  >
                    <Input
                      type="number"
                      value={settings.storage.maxFileSize}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        storage: { ...prev.storage, maxFileSize: parseInt(e.target.value) }
                      }))}
                      className="w-24"
                    />
                  </SettingItem>
                  <SettingItem
                    label="存储配额（GB）"
                    description="平台总存储空间限制"
                  >
                    <Input
                      type="number"
                      value={settings.storage.storageQuota}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        storage: { ...prev.storage, storageQuota: parseInt(e.target.value) }
                      }))}
                      className="w-24"
                    />
                  </SettingItem>
                  <SettingItem
                    label="自动清理"
                    description="定期清理过期的临时文件"
                  >
                    <Switch
                      checked={settings.storage.autoCleanup}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        storage: { ...prev.storage, autoCleanup: checked }
                      }))}
                    />
                  </SettingItem>
                  <SettingItem
                    label="文件保留天数"
                    description="文件在系统中保留的最长时间"
                  >
                    <Input
                      type="number"
                      value={settings.storage.retentionDays}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        storage: { ...prev.storage, retentionDays: parseInt(e.target.value) }
                      }))}
                      className="w-24"
                    />
                  </SettingItem>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>外观设置</CardTitle>
                <CardDescription>自定义平台的外观和显示设置</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <SettingItem
                    label="主题"
                    description="选择平台主题风格"
                  >
                    <Select
                      value={settings.appearance.theme}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, theme: value }
                      }))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">浅色</SelectItem>
                        <SelectItem value="dark">深色</SelectItem>
                        <SelectItem value="auto">自动</SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingItem>
                  <SettingItem
                    label="主色调"
                    description="平台的主要颜色"
                  >
                    <Input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, primaryColor: e.target.value }
                      }))}
                      className="w-20 h-10"
                    />
                  </SettingItem>
                  <SettingItem
                    label="辅助色"
                    description="平台的次要颜色"
                  >
                    <Input
                      type="color"
                      value={settings.appearance.accentColor}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, accentColor: e.target.value }
                      }))}
                      className="w-20 h-10"
                    />
                  </SettingItem>
                  <SettingItem
                    label="语言"
                    description="选择界面显示语言"
                  >
                    <Select
                      value={settings.appearance.language}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, language: value }
                      }))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="en-US">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingItem>
                  <SettingItem
                    label="时区"
                    description="选择系统时区"
                  >
                    <Select
                      value={settings.appearance.timezone}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, timezone: value }
                      }))}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">北京时间</SelectItem>
                        <SelectItem value="UTC">UTC时间</SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingItem>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>个人信息</CardTitle>
                <CardDescription>管理您的个人资料和偏好设置</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <SettingItem label="显示名称" description="在平台上显示的名称">
                    <Input
                      value={userProfile.profile.displayName}
                      onChange={(e) => setUserProfile(prev => ({
                        ...prev,
                        profile: { ...prev.profile, displayName: e.target.value }
                      }))}
                      className="w-64"
                    />
                  </SettingItem>
                  <SettingItem label="邮箱地址" description="用于登录和接收通知">
                    <Input
                      type="email"
                      value={userProfile.profile.email}
                      onChange={(e) => setUserProfile(prev => ({
                        ...prev,
                        profile: { ...prev.profile, email: e.target.value }
                      }))}
                      className="w-64"
                    />
                  </SettingItem>
                  <SettingItem label="联系电话" description="用于紧急联系">
                    <Input
                      value={userProfile.profile.phone}
                      onChange={(e) => setUserProfile(prev => ({
                        ...prev,
                        profile: { ...prev.profile, phone: e.target.value }
                      }))}
                      className="w-64"
                    />
                  </SettingItem>
                  <SettingItem label="个人简介" description="介绍一下您自己">
                    <Textarea
                      value={userProfile.profile.bio}
                      onChange={(e) => setUserProfile(prev => ({
                        ...prev,
                        profile: { ...prev.profile, bio: e.target.value }
                      }))}
                      className="w-64"
                      rows={3}
                    />
                  </SettingItem>
                  <SettingItem label="修改密码" description="更新您的登录密码">
                    <div className="flex items-center space-x-2">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="输入新密码"
                        className="w-48"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </SettingItem>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>隐私设置</CardTitle>
                <CardDescription>控制您的信息可见性</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <SettingItem
                    label="显示邮箱"
                    description="其他用户可以看到您的邮箱地址"
                  >
                    <Switch
                      checked={userProfile.privacy.showEmail}
                      onCheckedChange={(checked) => setUserProfile(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showEmail: checked }
                      }))}
                    />
                  </SettingItem>
                  <SettingItem
                    label="显示电话"
                    description="其他用户可以看到您的电话号码"
                  >
                    <Switch
                      checked={userProfile.privacy.showPhone}
                      onCheckedChange={(checked) => setUserProfile(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showPhone: checked }
                      }))}
                    />
                  </SettingItem>
                  <SettingItem
                    label="允许私信"
                    description="其他用户可以给您发送私信"
                  >
                    <Switch
                      checked={userProfile.privacy.allowDirectMessages}
                      onCheckedChange={(checked) => setUserProfile(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, allowDirectMessages: checked }
                      }))}
                    />
                  </SettingItem>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}