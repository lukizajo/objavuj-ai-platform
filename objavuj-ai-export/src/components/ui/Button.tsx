import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-semibold 
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-background
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `

  const variants = {
    primary: `
      bg-primary text-white rounded-xl
      hover:bg-primary-hover hover:shadow-hover hover:-translate-y-0.5
      focus:ring-primary
    `,
    secondary: `
      bg-secondary dark:bg-dark-muted text-white dark:text-dark-text-primary rounded-xl
      hover:bg-secondary-hover dark:hover:bg-dark-background-tertiary hover:shadow-hover hover:-translate-y-0.5
      focus:ring-secondary
    `,
    outline: `
      bg-transparent border-2 border-secondary dark:border-dark-text-secondary text-secondary dark:text-dark-text-primary rounded-xl
      hover:bg-secondary dark:hover:bg-dark-muted hover:text-white dark:hover:text-dark-text-primary hover:-translate-y-0.5
      focus:ring-secondary
    `,
    ghost: `
      bg-transparent text-text-secondary dark:text-dark-text-secondary rounded-lg
      hover:bg-muted dark:hover:bg-dark-muted hover:text-text-primary dark:hover:text-dark-text-primary
      focus:ring-primary
    `,
    success: `
      bg-success text-white rounded-xl
      hover:bg-success-hover hover:shadow-hover hover:-translate-y-0.5
      focus:ring-success
    `,
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
