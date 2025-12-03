import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Play, Pause, Volume2, VolumeX, Maximize, Download, FileText, File, Image as ImageIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'

interface LessonFile {
  id: string
  name: string
  url: string
  fileType: string
  fileSize: number | null
}

interface LessonContentProps {
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'project'
  content: string | null
  videoUrl?: string | null
  materials?: LessonFile[]
}

const formatFileSize = (bytes: number | null): string => {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-500" />
    case 'docx':
    case 'doc':
      return <FileText className="w-5 h-5 text-blue-500" />
    case 'image':
    case 'png':
    case 'jpg':
    case 'jpeg':
      return <ImageIcon className="w-5 h-5 text-green-500" />
    default:
      return <File className="w-5 h-5 text-gray-500" />
  }
}

// Video Player Component
const VideoPlayer: React.FC<{ url: string }> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Check if it's a YouTube embed URL
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be')

  if (isYouTube) {
    return (
      <div className="aspect-video bg-secondary dark:bg-dark-muted rounded-xl overflow-hidden">
        <iframe
          src={url}
          title="Video Player"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="aspect-video bg-secondary dark:bg-dark-muted rounded-xl overflow-hidden relative group">
      <video
        className="w-full h-full object-cover"
        src={url}
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <div className="flex-grow" />
          <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Markdown Content Component
const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mt-6 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mt-5 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-text-secondary dark:text-dark-text-secondary">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-text-secondary dark:text-dark-text-secondary">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-text-secondary dark:text-dark-text-secondary">{children}</li>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="bg-muted dark:bg-dark-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                  {children}
                </code>
              )
            }
            return (
              <code
                className="block bg-secondary dark:bg-dark-muted p-4 rounded-lg text-sm font-mono overflow-x-auto text-white"
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="bg-secondary dark:bg-dark-muted p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary dark:text-dark-text-secondary my-4">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-text-primary dark:text-dark-text-primary">
              {children}
            </strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// Materials List Component
const MaterialsList: React.FC<{ materials: LessonFile[] }> = ({ materials }) => {
  const { t } = useTranslation()

  if (!materials || materials.length === 0) return null

  return (
    <div className="mt-6 pt-6 border-t border-border dark:border-dark-border">
      <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">
        {t('player.materials')}
      </h4>
      <div className="space-y-2">
        {materials.map((file) => (
          <a
            key={file.id}
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-muted dark:bg-dark-muted rounded-lg hover:bg-muted/80 dark:hover:bg-dark-muted/80 transition-colors group"
          >
            {getFileIcon(file.fileType)}
            <div className="flex-grow">
              <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary group-hover:text-primary transition-colors">
                {file.name}
              </p>
              {file.fileSize && (
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                  {formatFileSize(file.fileSize)}
                </p>
              )}
            </div>
            <Download className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </div>
  )
}

// Main Component
export const LessonContent: React.FC<LessonContentProps> = ({
  type,
  content,
  videoUrl,
  materials = []
}) => {
  const { t } = useTranslation()

  return (
    <Card className="mb-8">
      {/* Video Content */}
      {type === 'video' && videoUrl && (
        <div className="mb-6">
          <VideoPlayer url={videoUrl} />
        </div>
      )}

      {/* Text/Markdown Content */}
      {content && (
        <div className="mb-6">
          <MarkdownContent content={content} />
        </div>
      )}

      {/* Quiz Placeholder */}
      {type === 'quiz' && !content && (
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-primary-light dark:bg-primary/20 rounded-2xl flex items-center justify-center">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
            {t('player.quizTitle') || 'Interactive Quiz'}
          </h3>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
            {t('player.quizDesc') || 'Interactive quiz will be available after backend integration.'}
          </p>
          <Button variant="primary" disabled>
            {t('player.startQuiz') || 'Start Quiz (Coming Soon)'}
          </Button>
        </div>
      )}

      {/* Interactive/Project Placeholder */}
      {(type === 'interactive' || type === 'project') && !content && (
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-success-light dark:bg-success/20 rounded-2xl flex items-center justify-center">
            <Play className="w-10 h-10 text-success" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
            {type === 'project' ? t('player.projectTitle') || 'Project' : t('player.interactiveTitle') || 'Interactive Lesson'}
          </h3>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
            {t('player.interactiveDesc') || 'Interactive content will be available after backend integration.'}
          </p>
          <Button variant="primary" disabled>
            {t('player.startActivity') || 'Start Activity (Coming Soon)'}
          </Button>
        </div>
      )}

      {/* Materials */}
      <MaterialsList materials={materials} />
    </Card>
  )
}

export default LessonContent
