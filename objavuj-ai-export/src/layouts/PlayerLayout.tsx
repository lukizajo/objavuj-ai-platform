import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowLeft, ChevronLeft, ChevronRight, Home, Trophy } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { UserProfile } from '@/components/ui/UserProfile'
import { MiniPlayer } from '@/components/ui/MiniPlayer'

interface PlayerLayoutProps {
  children: React.ReactNode
  courseTitle: string
  courseSlug: string
  onPrevLesson?: () => void
  onNextLesson?: () => void
  hasPrevLesson?: boolean
  hasNextLesson?: boolean
  showMiniPlayer?: boolean
}

const PlayerLayout: React.FC<PlayerLayoutProps> = ({ 
  children, 
  courseTitle, 
  courseSlug,
  onPrevLesson,
  onNextLesson,
  hasPrevLesson = false,
  hasNextLesson = false,
  showMiniPlayer = false
}) => {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-dark-background transition-colors duration-300">
      {/* Course Player Header with New Layout */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border-b border-border dark:border-dark-border h-14">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left: Back to Courses Button */}
          <div className="flex items-center gap-2">
            <Link
              to="/courses"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-muted dark:hover:bg-dark-muted hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">{t('player.backToCourse')}</span>
            </Link>
          </div>
          
          {/* Center: Mini Player or Navigation */}
          {showMiniPlayer ? (
            <MiniPlayer className="mx-auto" />
          ) : (
            <div className="flex items-center gap-3">
              {/* Previous Lesson */}
              {hasPrevLesson && onPrevLesson && (
                <button
                  onClick={onPrevLesson}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary dark:text-dark-text-secondary hover:bg-muted dark:hover:bg-dark-muted hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden md:inline">{t('player.previous')}</span>
                </button>
              )}
              
              {/* Home Link */}
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium text-sm">{t('nav.home')}</span>
              </Link>
              
              {/* Rewards Link */}
              <Link
                to="/rewards"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-muted dark:hover:bg-dark-muted hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
              >
                <Trophy className="w-4 h-4" />
                <span className="font-medium text-sm">{t('nav.rewards')}</span>
              </Link>
              
              {/* Next Lesson */}
              {hasNextLesson && onNextLesson && (
                <button
                  onClick={onNextLesson}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary dark:text-dark-text-secondary hover:bg-muted dark:hover:bg-dark-muted hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
                >
                  <span className="hidden md:inline">{t('player.next')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
          
          {/* Right: Settings & Profile */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <UserProfile />
          </div>
        </div>
      </header>
      
      <main className="flex-grow pt-14">
        {children}
      </main>
    </div>
  )
}

export default PlayerLayout
