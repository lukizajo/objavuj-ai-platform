import React from 'react'
import { Brain, MessageSquare, Image, Sparkles, Zap } from 'lucide-react'

interface ApplicationIconsProps {
  applications?: string[]
  className?: string
}

const applicationIconMap: Record<string, { icon: React.FC<any>, label: string }> = {
  'chatgpt': { icon: MessageSquare, label: 'ChatGPT' },
  'claude': { icon: Brain, label: 'Claude' },
  'midjourney': { icon: Image, label: 'Midjourney' },
  'gemini': { icon: Sparkles, label: 'Gemini' },
  'perplexity': { icon: Zap, label: 'Perplexity' },
}

export const ApplicationIcons: React.FC<ApplicationIconsProps> = ({ 
  applications = [], 
  className = '' 
}) => {
  if (!applications || applications.length === 0) {
    return null
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {applications.map((app) => {
        const appConfig = applicationIconMap[app.toLowerCase()]
        if (!appConfig) return null
        
        const IconComponent = appConfig.icon
        
        return (
          <div
            key={app}
            className="group relative"
            title={appConfig.label}
          >
            <div className="w-6 h-6 rounded-md bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
              <IconComponent className="w-3.5 h-3.5" />
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              {appConfig.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
