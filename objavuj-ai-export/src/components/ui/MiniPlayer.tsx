import React, { useEffect, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAudioStore } from '@/stores/audioStore'

interface MiniPlayerProps {
  className?: string
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({ className }) => {
  const {
    currentSrc,
    currentTitle,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    seek,
  } = useAudioStore()
  
  const progressRef = useRef<HTMLDivElement>(null)
  
  // Don't render if no audio is set
  if (!currentSrc || !currentTitle) {
    return null
  }
  
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || duration === 0) return
    
    const rect = progressRef.current.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    seek(newTime)
  }
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  
  return (
    <div className={cn(
      'flex items-center gap-3 px-4 py-2',
      'bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm',
      'border border-border/50 dark:border-dark-border/50',
      'rounded-lg shadow-soft',
      'min-w-0 max-w-md',
      className
    )}>
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full',
          'bg-primary text-white hover:bg-primary/90',
          'transition-all duration-200',
          'flex items-center justify-center',
          'shadow-sm'
        )}
        aria-label={isPlaying ? 'Pozastavi' : 'Prehrať'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>
      
      {/* Lesson Title */}
      <div className="flex-grow min-w-0">
        <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary truncate">
          {currentTitle}
        </p>
        
        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="h-1.5 bg-muted dark:bg-dark-muted rounded-full cursor-pointer group mt-1"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-primary rounded-full relative transition-all duration-100"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
      
      {/* Time Display - Hidden on small screens */}
      <div className="flex-shrink-0 hidden sm:flex items-center text-xs text-text-secondary dark:text-dark-text-secondary">
        <span>{formatTime(currentTime)}</span>
        <span className="mx-1">/</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

export default MiniPlayer