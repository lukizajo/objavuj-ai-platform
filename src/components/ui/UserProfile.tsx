import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, LogOut, Settings, BookOpen, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import { Button } from './Button'
import { cn } from '@/lib/utils'

interface UserProfileProps {
  className?: string
}

export const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const { user, isAuthenticated, logout } = useAuthStore()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  if (!isAuthenticated || !user) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <Link to="/login">
          <Button variant="primary" size="sm">
            {t('nav.login')}
          </Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 p-1.5 pr-3 rounded-full',
          'bg-muted dark:bg-dark-muted hover:bg-muted/80 dark:hover:bg-dark-muted/80',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-background'
        )}
        aria-expanded={isOpen}
      >
        {user.photo ? (
          <img 
            src={user.photo} 
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-community flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        )}
        <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary hidden sm:inline">
          {user.name.split(' ')[0]}
        </span>
        <ChevronDown 
          className={cn(
            'w-4 h-4 text-text-secondary dark:text-dark-text-secondary transition-transform duration-200',
            isOpen && 'rotate-180'
          )} 
        />
      </button>
      
      {isOpen && (
        <div 
          className={cn(
            'absolute top-full right-0 mt-2 w-56 z-50',
            'bg-white dark:bg-dark-card rounded-xl shadow-soft-lg border border-border dark:border-dark-border',
            'py-2 animate-fade-in'
          )}
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border dark:border-dark-border">
            <p className="font-semibold text-text-primary dark:text-dark-text-primary truncate">
              {user.name}
            </p>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary truncate">
              {user.email}
            </p>
          </div>
          
          {/* Menu Items */}
          <div className="py-1">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5',
                'text-sm text-text-primary dark:text-dark-text-primary',
                'hover:bg-muted dark:hover:bg-dark-muted transition-colors'
              )}
            >
              <BookOpen className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
              {t('nav.myAccount')}
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5',
                'text-sm text-text-primary dark:text-dark-text-primary',
                'hover:bg-muted dark:hover:bg-dark-muted transition-colors'
              )}
            >
              <Settings className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
              Settings
            </Link>
          </div>
          
          {/* Logout */}
          <div className="pt-1 border-t border-border dark:border-dark-border">
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5',
                'text-sm text-destructive',
                'hover:bg-destructive/10 transition-colors'
              )}
            >
              <LogOut className="w-4 h-4" />
              {t('nav.logout')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
