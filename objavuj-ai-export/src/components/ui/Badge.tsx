import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'community' | 'muted'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
}) => {
  const variants = {
    primary: 'bg-primary-light dark:bg-primary/20 text-primary',
    secondary: 'bg-secondary-light dark:bg-secondary/20 text-secondary dark:text-dark-text-secondary',
    success: 'bg-success-light dark:bg-success/20 text-success dark:text-green-400',
    community: 'bg-community-light dark:bg-community/20 text-community',
    muted: 'bg-muted dark:bg-dark-muted text-text-secondary dark:text-dark-text-secondary',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge
