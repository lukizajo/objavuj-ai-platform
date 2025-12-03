import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number // 0-100
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  color?: 'primary' | 'success' | 'secondary'
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  showLabel = false,
  color = 'primary',
  className,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const colors = {
    primary: 'bg-primary',
    success: 'bg-success',
    secondary: 'bg-secondary dark:bg-dark-text-secondary',
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Progress</span>
          <span className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{clampedProgress}%</span>
        </div>
      )}
      <div className={cn('w-full bg-muted dark:bg-dark-muted rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colors[color]
          )}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
