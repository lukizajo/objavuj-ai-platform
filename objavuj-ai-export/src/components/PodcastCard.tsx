import React from 'react'
import { ExternalLink, Headphones, Radio } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { cn } from '@/lib/utils'

interface PodcastCardProps {
  className?: string
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ className }) => {
  const { t } = useTranslation()
  
  const spotifyUrl = 'https://open.spotify.com/show/2jIqrsDtegW0adPe0FRpbh'
  
  return (
    <section className={cn('section-padding bg-gradient-to-br from-success/5 to-community/5 dark:from-success/10 dark:to-community/10', className)}>
      <div className="container-custom">
        <div className="text-center mb-10">
          <Badge variant="success" className="mb-4">
            <Headphones className="w-3.5 h-3.5 mr-1.5" />
            Podcast
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary">
            {t('podcast.title')}
          </h2>
        </div>
        
        <div className={cn(
          'max-w-3xl mx-auto',
          'bg-white dark:bg-dark-card rounded-2xl shadow-soft-lg',
          'border border-border dark:border-dark-border overflow-hidden',
          'hover:shadow-hover transition-all duration-300'
        )}>
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-success via-secondary to-community p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Radio className="w-10 h-10 text-white" />
              </div>
              <div className="text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                    {t('podcast.live')}
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-tight">
                  {t('podcast.name')}
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  {t('podcast.subtitle')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
              {t('podcast.description')}
            </p>
            
            {/* Spotify Embed Placeholder */}
            <div className="bg-muted dark:bg-dark-muted rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#1DB954]" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <div>
                  <p className="font-medium text-text-primary dark:text-dark-text-primary text-sm">
                    Available on Spotify
                  </p>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    New episodes every week
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <a 
              href={spotifyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Button 
                variant="success" 
                size="lg" 
                className="w-full gap-2 bg-[#1DB954] hover:bg-[#1aa34a]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                {t('podcast.cta')}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PodcastCard
