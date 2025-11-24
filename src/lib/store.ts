import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';

// 定义类型别名
type WatchHistoryItem = {
  url: string;
  title: string;
  watchedAt: string;
  progress: number;
  lastPosition: number;
};

type FavoriteItem = {
  url: string;
  title: string;
  addedAt: string;
};

type WatchHistory = WatchHistoryItem[];
type Favorites = FavoriteItem[];

interface AuthState {
  // 用户状态
  user: User | null;
  isAuthenticated: boolean;

  // 登录/登出
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // 角色检查
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;

  // 模拟登录（用于demo演示）
  demoLogin: (role: UserRole) => void;
}

// 创建认证状态管理
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: null,
      isAuthenticated: false,

      // 登录功能
      login: async (email: string, password: string) => {
        try {
          // 在实际项目中，这里会调用API
          // 现在使用Mock数据进行模拟
          const foundUser = mockUsers.find(user => user.email === email);

          if (foundUser && password === 'demo123') { // 简化的密码验证
            set({
              user: foundUser,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      // 登出功能
      logout: () => {
        // 清除状态
        set({
          user: null,
          isAuthenticated: false,
        });

        // 清除localStorage中的持久化数据
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
          localStorage.removeItem('video-storage');
          localStorage.removeItem('course-storage');
          localStorage.removeItem('app-storage');
        }
      },

      // 检查是否有特定角色
      hasRole: (role: UserRole) => {
        const { user } = get();
        return user?.role === role;
      },

      // 检查是否有任意一个角色
      hasAnyRole: (roles: UserRole[]) => {
        const { user } = get();
        return user ? roles.includes(user.role) : false;
      },

      // Demo登录功能
      demoLogin: (role: UserRole) => {
        const demoUser = mockUsers.find(user => user.role === role);
        if (demoUser) {
          set({
            user: demoUser,
            isAuthenticated: true,
          });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage中的key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);

// 应用全局状态
interface AppState {
  // 侧边栏状态
  sidebarOpen: boolean;

  // 主题模式
  theme: 'light' | 'dark';

  // 通知数量
  notificationCount: number;

  // 操作方法
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setNotificationCount: (count: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 初始状态
  sidebarOpen: true,
  theme: 'light',
  notificationCount: 0,

  // 切换侧边栏
  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),

  // 设置侧边栏状态
  setSidebarOpen: (open: boolean) => set({
    sidebarOpen: open
  }),

  // 设置主题
  setTheme: (theme: 'light' | 'dark') => set({
    theme
  }),

  // 设置通知数量
  setNotificationCount: (count: number) => set({
    notificationCount: count
  }),
}));

// 视频播放状态
interface VideoState {
  // 当前播放的视频
  currentVideo: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  quality: string;

  // 播放列表
  playlist: string[];
  currentIndex: number;

  // 播放历史和收藏
  watchHistory: Array<{
    url: string;
    title: string;
    watchedAt: string;
    progress: number;
    lastPosition: number;
  }>;
  favorites: Array<{
    url: string;
    title: string;
    addedAt: string;
  }>;

  // 视频进度记录
  videoProgress: Record<string, {
    progress: number;
    lastPosition: number;
    lastWatched: string;
  }>;

  // 操作方法
  setCurrentVideo: (videoId: string) => void;
  play: () => void;
  pause: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  setQuality: (quality: string) => void;
  nextVideo: () => void;
  previousVideo: () => void;
  addToPlaylist: (videoId: string) => void;
  removeFromPlaylist: (videoId: string) => void;

  // 新增方法
  addToHistory: (url: string, title: string) => void;
  updateProgress: (url: string, progress: number, lastPosition: number) => void;
  addToFavorites: (url: string, title: string) => void;
  removeFromFavorites: (url: string) => void;
  getVideoProgress: (url: string) => { progress: number; lastPosition: number } | null;
  getWatchHistory: () => WatchHistory;
  getFavorites: () => Favorites;
}

export const useVideoStore = create<VideoState>()(
  persist(
    (set, get) => ({
      // 初始状态
      currentVideo: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      playbackRate: 1,
      quality: 'auto',
      playlist: [],
      currentIndex: -1,
      watchHistory: [],
      favorites: [],
      videoProgress: {},

      // 设置当前视频
      setCurrentVideo: (videoId: string) => set({
        currentVideo: videoId,
        currentTime: 0,
        isPlaying: true
      }),

      // 播放
      play: () => set({ isPlaying: true }),

      // 暂停
      pause: () => set({ isPlaying: false }),

      // 跳转
      seekTo: (time: number) => set({ currentTime: time }),

      // 设置音量
      setVolume: (volume: number) => set({ volume }),

      // 设置播放速度
      setPlaybackRate: (rate: number) => set({ playbackRate: rate }),

      // 设置清晰度
      setQuality: (quality: string) => set({ quality }),

      // 下一个视频
      nextVideo: () => {
        const { playlist, currentIndex } = get();
        if (currentIndex < playlist.length - 1) {
          const nextIndex = currentIndex + 1;
          set({
            currentIndex: nextIndex,
            currentVideo: playlist[nextIndex],
            currentTime: 0,
          });
        }
      },

      // 上一个视频
      previousVideo: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          set({
            currentIndex: prevIndex,
            currentVideo: get().playlist[prevIndex],
            currentTime: 0,
          });
        }
      },

      // 添加到播放列表
      addToPlaylist: (videoId: string) => set((state) => ({
        playlist: state.playlist.includes(videoId)
          ? state.playlist
          : [...state.playlist, videoId]
      })),

      // 从播放列表移除
      removeFromPlaylist: (videoId: string) => set((state) => {
        const newPlaylist = state.playlist.filter(id => id !== videoId);
        const newIndex = state.currentIndex > newPlaylist.length - 1 ? 0 : state.currentIndex;

        return {
          playlist: newPlaylist,
          currentIndex: Math.max(0, newIndex),
          currentVideo: newIndex >= 0 ? newPlaylist[newIndex] : null,
        };
      }),

      // 新增方法实现
      // 添加到观看历史
      addToHistory: (url: string, title: string) => set((state) => {
        const existingIndex = state.watchHistory.findIndex(item => item.url === url);
        const newEntry = {
          url,
          title,
          watchedAt: new Date().toISOString(),
          progress: state.videoProgress[url]?.progress || 0,
          lastPosition: state.videoProgress[url]?.lastPosition || 0,
        };

        let newHistory;
        if (existingIndex !== -1) {
          // 更新现有记录
          newHistory = [...state.watchHistory];
          newHistory[existingIndex] = newEntry;
        } else {
          // 添加新记录，并按时间排序
          newHistory = [newEntry, ...state.watchHistory].slice(0, 50); // 保留最近50条记录
        }

        return { watchHistory: newHistory };
      }),

      // 更新播放进度
      updateProgress: (url: string, progress: number, lastPosition: number) => set((state) => ({
        videoProgress: {
          ...state.videoProgress,
          [url]: {
            progress,
            lastPosition,
            lastWatched: new Date().toISOString(),
          },
        },
      })),

      // 添加到收藏
      addToFavorites: (url: string, title: string) => set((state) => {
        if (state.favorites.some(fav => fav.url === url)) {
          return state; // 已存在，不重复添加
        }

        return {
          favorites: [{
            url,
            title,
            addedAt: new Date().toISOString(),
          }, ...state.favorites],
        };
      }),

      // 从收藏中移除
      removeFromFavorites: (url: string) => set((state) => ({
        favorites: state.favorites.filter(fav => fav.url !== url),
      })),

      // 获取视频进度
      getVideoProgress: (url: string) => {
        const { videoProgress } = get();
        return videoProgress[url] || null;
      },

      // 获取观看历史
      getWatchHistory: () => {
        const { watchHistory } = get();
        return watchHistory;
      },

      // 获取收藏列表
      getFavorites: () => {
        const { favorites } = get();
        return favorites;
      },
    }),
    {
      name: 'video-storage',
      partialize: (state) => ({
        watchHistory: state.watchHistory,
        favorites: state.favorites,
        videoProgress: state.videoProgress,
        volume: state.volume,
        playbackRate: state.playbackRate,
        quality: state.quality,
      }),
    }
  )
);

// 课程学习状态
interface CourseState {
  // 当前课程
  currentCourse: string | null;

  // 学习进度
  progress: Record<string, {
    videoId: string;
    completed: boolean;
    watchTime: number;
    lastPosition: number;
  }>;

  // 收藏的课程
  favoriteCourses: string[];

  // 学习统计
  totalWatchTime: number;
  completedVideos: string[];

  // 操作方法
  setCurrentCourse: (courseId: string) => void;
  updateProgress: (videoId: string, progress: number, position: number) => void;
  markVideoCompleted: (videoId: string) => void;
  toggleFavoriteCourse: (courseId: string) => void;
  isFavoriteCourse: (courseId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      // 初始状态
      currentCourse: null,
      progress: {},
      favoriteCourses: [],
      totalWatchTime: 0,
      completedVideos: [],

      // 设置当前课程
      setCurrentCourse: (courseId: string) => set({
        currentCourse: courseId
      }),

      // 更新学习进度
      updateProgress: (videoId: string, watchTime: number, position: number) => set((state) => ({
        progress: {
          ...state.progress,
          [videoId]: {
            videoId,
            completed: state.progress[videoId]?.completed || false,
            watchTime,
            lastPosition: position,
          },
        },
        totalWatchTime: state.totalWatchTime + watchTime,
      })),

      // 标记视频完成
      markVideoCompleted: (videoId: string) => set((state) => ({
        progress: {
          ...state.progress,
          [videoId]: {
            ...state.progress[videoId],
            completed: true,
          },
        },
        completedVideos: state.completedVideos.includes(videoId)
          ? state.completedVideos
          : [...state.completedVideos, videoId],
      })),

      // 切换收藏课程
      toggleFavoriteCourse: (courseId: string) => set((state) => ({
        favoriteCourses: state.favoriteCourses.includes(courseId)
          ? state.favoriteCourses.filter(id => id !== courseId)
          : [...state.favoriteCourses, courseId],
      })),

      // 检查是否收藏课程
      isFavoriteCourse: (courseId: string) => {
        const { favoriteCourses } = get();
        return favoriteCourses.includes(courseId);
      },

      // 获取课程进度
      getCourseProgress: (courseId: string) => {
        const { progress } = get();
        const courseProgress = Object.values(progress).filter(p => p.completed);
        return courseProgress.length > 0 ? 100 : 0; // 简化计算
      },
    }),
    {
      name: 'course-storage',
      partialize: (state) => ({
        progress: state.progress,
        favoriteCourses: state.favoriteCourses,
        totalWatchTime: state.totalWatchTime,
        completedVideos: state.completedVideos,
      }),
    }
  )
);