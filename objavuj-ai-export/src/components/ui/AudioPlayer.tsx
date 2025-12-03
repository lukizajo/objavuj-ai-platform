import React, { useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAudioStore } from '@/stores/audioStore'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

interface AudioPlayerProps {
  src?: string
  title?: string
  className?: string
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  src, 
  title = 'Audio Lesson',
  className 
}) => {
  const progressRef = useRef<HTMLDivElement>(null)
  const audioRef = useAudioPlayer({ src, title, autoPlay: false })
  
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoaded,
    togglePlay,
    toggleMute,
    seek,
    setVolume
  } = useAudioStore()
  
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setVolume(value)
  }
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const progress = progressRef.current
    if (!audio || !progress) return
    
    const rect = progress.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    audio.currentTime = percent * duration
  }
  
  const skip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(currentTime + seconds, duration))
    seek(newTime)
  }
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  
  if (!src) {
    return (
      <div className={cn(
        'bg-muted dark:bg-dark-muted rounded-xl p-4 flex items-center justify-center',
        className
      )}>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          No audio available for this lesson
        </p>
      </div>
    )
  }
  
  return (
    <div className={cn(
      'bg-gradient-to-r from-secondary to-secondary-hover dark:from-dark-card dark:to-dark-muted',
      'rounded-xl p-4 shadow-soft',
      className
    )}>
      <audio ref={audioRef} preload="metadata" />
      
      <div className="flex items-center gap-4">
        {/* Play Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => skip(-10)}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Skip back 10 seconds"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={togglePlay}
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              'bg-white text-secondary hover:bg-white/90',
              'transition-all duration-200 shadow-soft'
            )}
            aria-label={isPlaying ? 'Pozastavi' : 'Prehrať'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>
          
          <button
            onClick={() => skip(10)}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress */}
        <div className="flex-grow">
          <p className="text-sm font-medium text-white mb-2 truncate">{title}</p>
          <div 
            ref={progressRef}
            className="h-2 bg-white/20 rounded-full cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-white rounded-full relative transition-all duration-100"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/70 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label={isMuted ? 'Zapnúť zvuk' : 'Stlmiť zvuk'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                     [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
