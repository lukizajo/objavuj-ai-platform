import React from 'react'
import { Clock, BookOpen, Lock, Unlock, ChevronRight, Play } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Module } from '@/lib/api'

interface ModuleCardProps {
  module: Module
  isExpanded?: boolean
  onToggle?: () => void
  onStartModule?: () => void
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isExpanded = false,
  onToggle,
  onStartModule,
}) => {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        module.isLocked ? 'opacity-75' : ''
      }`}
      padding="none"
    >
      {/* Module Header */}
      <div
        className={`p-6 cursor-pointer ${onToggle ? 'hover:bg-muted/50' : ''} transition-colors`}
        onClick={onToggle}
      >
        <div className="flex items-start gap-4">
          {/* Module Number */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              module.isFree
                ? 'bg-success text-white'
                : module.isLocked
                ? 'bg-muted text-text-secondary'
                : 'bg-secondary text-white'
            }`}
          >
            {module.isLocked ? (
              <Lock className="w-5 h-5" />
            ) : (
              <span className="font-bold text-lg">M{module.order}</span>
            )}
          </div>

          {/* Module Info */}
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                {module.title}
              </h3>
              {module.isFree && (
                <Badge variant="success" size="sm">
                  ZADARMO
                </Badge>
              )}
              {module.isLocked && !module.isFree && (
                <Badge variant="muted" size="sm">
                  ZAMKNUTE
                </Badge>
              )}
            </div>
            <p className="text-text-secondary dark:text-dark-text-secondary text-sm mb-3 line-clamp-2">
              {module.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{module.lessonsCount} lekcii</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{module.duration}</span>
              </div>
            </div>
          </div>

          {/* Action / Expand Icon */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {!module.isLocked && onStartModule && (
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onStartModule()
                }}
                className="gap-1"
              >
                <Play className="w-4 h-4" />
                Spustit
              </Button>
            )}
            {onToggle && (
              <ChevronRight
                className={`w-5 h-5 text-text-secondary transition-transform duration-200 ${
                  isExpanded ? 'rotate-90' : ''
                }`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Lessons List */}
      {isExpanded && !module.isLocked && (
        <div className="border-t border-border dark:border-dark-border bg-muted/30 dark:bg-dark-muted/30">
          <ul className="divide-y divide-border dark:divide-dark-border">
            {module.lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-muted/50 dark:hover:bg-dark-muted/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-dark-card border border-border dark:border-dark-border flex items-center justify-center">
                  <span className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                    {lesson.order}
                  </span>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-text-primary dark:text-dark-text-primary text-sm">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{lesson.description}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <Badge variant="muted" size="sm">
                    {lesson.type}
                  </Badge>
                  <span>{lesson.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}

export default ModuleCard
