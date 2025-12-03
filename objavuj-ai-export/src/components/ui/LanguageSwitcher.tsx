import React, { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguageStore, type Language } from '@/stores/languageStore'
import { cn } from '@/lib/utils'

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'sk', label: 'Slovak', flag: 'SK' },
  { code: 'cz', label: 'Czech', flag: 'CZ' },
  { code: 'en', label: 'English', flag: 'EN' },
]

interface LanguageSwitcherProps {
  className?: string
  compact?: boolean
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className,
  compact = false 
}) => {
  const { language, setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const currentLang = languages.find(l => l.code === language) || languages[0]
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl',
          'bg-muted dark:bg-dark-muted hover:bg-muted/80 dark:hover:bg-dark-muted/80',
          'text-text-primary dark:text-dark-text-primary',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-background',
          compact && 'px-2'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
        <span className="text-sm font-medium">{currentLang.flag}</span>
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
            'absolute top-full right-0 mt-2 min-w-[140px] z-50',
            'bg-white dark:bg-dark-card rounded-xl shadow-soft-lg border border-border dark:border-dark-border',
            'py-1 animate-fade-in'
          )}
          role="listbox"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={cn(
                'w-full flex items-center justify-between px-4 py-2.5',
                'text-left text-sm transition-colors duration-150',
                language === lang.code
                  ? 'bg-primary-light dark:bg-primary/20 text-primary'
                  : 'text-text-primary dark:text-dark-text-primary hover:bg-muted dark:hover:bg-dark-muted'
              )}
              role="option"
              aria-selected={language === lang.code}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
              {language === lang.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
