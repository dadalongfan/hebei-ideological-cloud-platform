'use client'

import React, { useState, useRef, useCallback } from 'react'
import ReactPlayer from 'react-player'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  SkipBack,
  SkipForward,
  Settings,
  Subtitles
} from 'lucide-react'
import { useVideoStore } from '@/lib/store'

interface VideoPlayerProps {
  url: string
  poster?: string
  title?: string
  autoplay?: boolean
  onProgress?: (progress: { played: number; playedSeconds: number }) => void
  onEnded?: () => void
  className?: string
}

export function VideoPlayer({
  url,
  poster,
  title,
  autoplay = false,
  onProgress,
  onEnded,
  className = ''
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)

  const playerRef = useRef<any>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const {
    addToHistory,
    updateProgress,
    getVideoProgress,
    favorites,
    addToFavorites,
    removeFromFavorites
  } = useVideoStore()

  // 鼠标移动时显示控制栏
  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }, [isPlaying])

  // 播放/暂停
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // 音量控制
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  // 进度控制
  const handleSeekChange = (value: number[]) => {
    setPlayed(value[0])
  }

  const handleSeekMouseUp = (value: number[]) => {
    playerRef.current?.seekTo(value[0])
  }

  // 快进/快退
  const handleSkip = (seconds: number) => {
    const currentTime = playerRef.current?.getCurrentTime() || 0
    playerRef.current?.seekTo(currentTime + seconds)
  }

  // 全屏
  const handleFullscreen = () => {
    const player = document.querySelector('.video-player-container')
    if (player) {
      if (player.requestFullscreen) {
        player.requestFullscreen()
      } else if ((player as any).webkitRequestFullscreen) {
        (player as any).webkitRequestFullscreen()
      } else if ((player as any).mozRequestFullScreen) {
        (player as any).mozRequestFullScreen()
      } else if ((player as any).msRequestFullscreen) {
        (player as any).msRequestFullscreen()
      }
    }
  }

  // 播放速度调整
  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  // ReactPlayer 事件处理
  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setPlayed(state.played)
    setLoaded(state.loaded)

    // 更新进度到store
    updateProgress(url, state.played, state.playedSeconds)

    // 回调外部进度处理
    if (onProgress) {
      onProgress(state)
    }
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    if (onEnded) {
      onEnded()
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
    addToHistory(url, title || '')
  }

  // 格式化时间
  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
    }
    return `${mm}:${ss}`
  }

  const isFavorite = favorites.some(fav => fav.url === url)

  return (
    <div
      className={`video-player-container relative bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* 视频播放器 */}
      <div className="relative aspect-video">
        {(ReactPlayer as any)({
          ref: playerRef,
          url: url,
          width: "100%",
          height: "100%",
          playing: isPlaying,
          volume: volume,
          muted: isMuted,
          playbackRate: playbackRate,
          light: poster,
          onPlay: handlePlay,
          onPause: () => setIsPlaying(false),
          onProgress: handleProgress as any,
          onDuration: handleDuration,
          onEnded: handleEnded,
          progressInterval: 1000,
          config: {
            file: {
              attributes: {
                poster: poster
              }
            }
          } as any,
          style: { background: 'black' }
        })}

        {/* 加载进度条 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <div
            className="h-full bg-gray-500 transition-all duration-300"
            style={{ width: `${loaded * 100}%` }}
          />
        </div>

        {/* 控制栏 */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* 进度条 */}
          <div className="mb-3">
            <Slider
              value={[played * 100]}
              onValueChange={(value) => handleSeekChange([value[0] / 100])}
              onValueCommit={(value) => handleSeekMouseUp([value[0] / 100])}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white mt-1">
              <span>{formatTime(played * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center justify-between">
            {/* 左侧控制 */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="text-white hover:text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSkip(-10)}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSkip(10)}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              {/* 音量控制 */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMuteToggle}
                  className="text-white hover:text-white hover:bg-white/20"
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume * 100]}
                    onValueChange={(value) => handleVolumeChange([value[0] / 100])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 右侧控制 */}
            <div className="flex items-center gap-2">
              {/* 播放速度设置 */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-white hover:bg-white/20"
                >
                  <Settings className="h-4 w-4" />
                </Button>

                {showSettings && (
                  <div className="absolute right-0 bottom-full mb-2 bg-black/90 rounded-lg p-2 min-w-32">
                    <div className="text-xs text-white font-medium mb-2">播放速度</div>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                      <button
                        key={rate}
                        onClick={() => handlePlaybackRateChange(rate)}
                        className={`block w-full text-left text-xs text-white hover:bg-white/20 px-2 py-1 rounded ${
                          playbackRate === rate ? 'bg-white/20' : ''
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 字幕按钮 (暂时占位) */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/20"
              >
                <Subtitles className="h-4 w-4" />
              </Button>

              {/* 收藏按钮 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => isFavorite ? removeFromFavorites(url) : addToFavorites(url, title || '')}
                className="text-white hover:text-white hover:bg-white/20"
              >
                {isFavorite ? '♥' : '♡'}
              </Button>

              {/* 全屏按钮 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFullscreen}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 视频信息 */}
      {title && (
        <div className="p-4 bg-white">
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer