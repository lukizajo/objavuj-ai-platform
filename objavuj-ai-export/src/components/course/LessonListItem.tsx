import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Video, FileText, HelpCircle, Wrench, Check, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Lesson } from '@/lib/api'

interface LessonListItemProps {
  lesson: Lesson
  moduleId: string
  courseSlug: string
  isActive?: boolean
  isLocked?: boolean
}

const lessonTypeIcons = {
  video: Video,
  text: FileText,
  quiz: HelpCircle,
  interactive: Wrench,
  project: Wrench,
}

export const LessonListItem: React.FC<LessonListItemProps> = ({
  lesson,
  moduleId,
  courseSlug,
  isActive = false,
  isLocked = false,
}) => {
  const IconComponent = lessonTypeIcons[lesson.type] || FileText

  const content = (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
        isActive
          ? 'bg-primary/10 border-l-4 border-primary'
          : 'hover:bg-muted/70',
        isLocked && 'opacity-60 cursor-not-allowed',
        lesson.isCompleted && 'bg-success/5'
      )}
    >
      {/* Status Icon */}
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
          lesson.isCompleted
            ? 'bg-success text-white'
            : isActive
            ? 'bg-primary text-white'
            : isLocked
            ? 'bg-muted text-text-secondary'
            : 'bg-white border border-border text-text-secondary'
        )}
      >
        {lesson.isCompleted ? (
          <Check className="w-4 h-4" />
        ) : isLocked ? (
          <Lock className="w-3 h-3" />
        ) : (
          <span className="text-xs font-medium">{lesson.order}</span>
        )}
      </div>

      {/* Lesson Info */}
      <div className="flex-grow min-w-0">
        <p
          className={cn(
            'font-medium text-sm truncate',
            isActive ? 'text-primary' : 'text-text-primary'
          )}
        >
          {lesson.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <IconComponent className="w-3 h-3" />
          <span>{lesson.duration}</span>
        </div>
      </div>

      {/* Play Icon for Active */}
      {isActive && !isLocked && (
        <div className="flex-shrink-0">
          <Play className="w-4 h-4 text-primary fill-primary" />
        </div>
      )}
    </div>
  )

  if (isLocked) {
    return content
  }

  return (
    <Link to={`/course/${courseSlug}/player/${moduleId}/${lesson.id}`}>
      {content}
    </Link>
  )
}

export default LessonListItem
