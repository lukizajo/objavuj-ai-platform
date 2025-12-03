import React, { useState } from 'react'
import { Bot, Send, X, Sparkles, MessageCircle, ChevronDown } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface FloatingAIAssistantProps {
  lessonContext?: string
  className?: string
}

export const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({
  lessonContext,
  className,
}) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: t('ai.greeting'),
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Thank you for your question! This is a placeholder response.

After OpenAI API integration, I will be able to provide relevant answers about ${
          lessonContext || 'artificial intelligence'
        }.

You can ask me about:
- Explanation of lesson concepts
- Practical examples
- Additional resources
- Exercises and tasks`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Collapsed state - just the button
  if (!isOpen) {
    return (
      <div className={cn('fixed bottom-4 right-4 z-50', className)}>
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-2xl shadow-soft-lg',
            'bg-gradient-to-r from-community to-primary text-white',
            'hover:shadow-hover hover:-translate-y-1 transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="font-semibold text-sm">{t('ai.title')}</p>
            <p className="text-xs text-white/80">{t('ai.question')}</p>
          </div>
        </button>
      </div>
    )
  }

  // Open state - floating panel
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        isExpanded ? 'h-[70vh] md:h-[500px]' : 'h-auto',
        className
      )}
    >
      <div
        className={cn(
          'bg-white dark:bg-dark-card border-t border-border dark:border-dark-border',
          'shadow-soft-xl mx-auto max-w-4xl',
          'rounded-t-2xl overflow-hidden flex flex-col',
          isExpanded ? 'h-full' : ''
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'p-4 border-b border-border dark:border-dark-border flex items-center justify-between',
            'bg-gradient-to-r from-community/10 to-primary/10 dark:from-community/5 dark:to-primary/5',
            'cursor-pointer'
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-community to-primary rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                {t('ai.title')}
              </h3>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                {t('ai.subtitle')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="p-2 hover:bg-muted dark:hover:bg-dark-muted rounded-lg transition-colors"
            >
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-text-secondary dark:text-dark-text-secondary transition-transform duration-200',
                  isExpanded ? 'rotate-180' : ''
                )}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                setIsExpanded(false)
              }}
              className="p-2 hover:bg-muted dark:hover:bg-dark-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary dark:text-dark-text-secondary" />
            </button>
          </div>
        </div>

        {/* Messages - only show when expanded */}
        {isExpanded && (
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-muted dark:bg-dark-muted text-text-primary dark:text-dark-text-primary rounded-bl-md'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted dark:bg-dark-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      {t('ai.thinking')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => !isExpanded && setIsExpanded(true)}
              placeholder={t('ai.placeholder')}
              className={cn(
                'flex-grow px-4 py-2.5 bg-muted dark:bg-dark-muted rounded-xl text-sm',
                'text-text-primary dark:text-dark-text-primary',
                'placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary',
                'focus:outline-none focus:ring-2 focus:ring-primary'
              )}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                'w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center',
                'hover:bg-primary-hover transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FloatingAIAssistant
