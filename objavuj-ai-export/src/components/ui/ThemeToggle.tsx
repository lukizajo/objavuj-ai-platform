import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useThemeStore()
  
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center justify-center w-10 h-10 rounded-xl',
        'bg-muted dark:bg-dark-muted hover:bg-muted/80 dark:hover:bg-dark-muted/80',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-background',
        className
      )}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <Sun 
        className={cn(
          'w-5 h-5 text-primary absolute transition-all duration-300',
          theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
        )} 
      />
      <Moon 
        className={cn(
          'w-5 h-5 text-primary absolute transition-all duration-300',
          theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        )} 
      />
    </button>
  )
}

export default ThemeToggle
