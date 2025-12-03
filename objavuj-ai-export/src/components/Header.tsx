import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, BookOpen, Trophy } from 'lucide-react'
import { Button } from './ui/Button'
import { ThemeToggle } from './ui/ThemeToggle'
import { LanguageSwitcher } from './ui/LanguageSwitcher'
import { UserProfile } from './ui/UserProfile'
import { useTranslation } from '@/hooks/useTranslation'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  // Check if user is currently viewing a course
  const isInCourse = location.pathname.includes('/course/') && location.pathname.includes('/')
  const courseSlugMatch = location.pathname.match(/\/course\/([^/]+)/)
  const currentCourseSlug = courseSlugMatch ? courseSlugMatch[1] : null

  // Context-aware rewards link
  const rewardsLink = {
    href: isInCourse && currentCourseSlug 
      ? `/course/${currentCourseSlug}#rewards`
      : '/rewards',
    label: t('rewards.title') || 'Odmeny',
    icon: Trophy,
    isRewards: true
  }

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/courses', label: t('nav.courses') },
    { href: '/community', label: t('nav.community') },
    { href: rewardsLink.href, label: rewardsLink.label, icon: rewardsLink.icon, isRewards: true },
    { href: '/podcast', label: t('nav.podcast') },
    { href: '/about', label: t('nav.about') },
  ]

  // Handle rewards navigation - if in course context, switch to rewards tab
  const handleRewardsClick = (e: React.MouseEvent) => {
    if (isInCourse && currentCourseSlug) {
      e.preventDefault()
      // Navigate to course with rewards tab
      navigate(`/course/${currentCourseSlug}#rewards`)
      setIsMenuOpen(false)
    }
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50',
      'bg-white/80 dark:bg-dark-background/80 backdrop-blur-md',
      'border-b border-border dark:border-dark-border',
      'transition-colors duration-300'
    )}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-community rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-text-primary dark:text-dark-text-primary">
              OBJAVUJ<span className="text-primary">-AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={link.isRewards ? handleRewardsClick : undefined}
                className={cn(
                  'text-base font-medium transition-colors duration-200',
                  isActive(link.href) || (link.isRewards && isInCourse)
                    ? 'text-primary'
                    : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
                )}
              >
                <div className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions: [LANG] [THEME] [USER/LOGIN] */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <UserProfile />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-text-primary dark:text-dark-text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={cn(
            'md:hidden py-4 border-t border-border dark:border-dark-border animate-fade-in',
            'bg-white dark:bg-dark-background'
          )}>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={link.isRewards ? handleRewardsClick : () => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive(link.href) || (link.isRewards && isInCourse)
                      ? 'bg-primary-light dark:bg-primary/20 text-primary'
                      : 'text-text-secondary dark:text-dark-text-secondary hover:bg-muted dark:hover:bg-dark-muted hover:text-text-primary dark:hover:text-dark-text-primary'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </div>
                </Link>
              ))}
              
              {/* Language Switcher in Mobile Menu */}
              <div className="px-4 py-2">
                <LanguageSwitcher className="w-full" />
              </div>
              
              <div className="mt-4 pt-4 border-t border-border dark:border-dark-border flex flex-col gap-2 px-4">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      {t('nav.myAccount')}
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      {t('nav.login')}
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
