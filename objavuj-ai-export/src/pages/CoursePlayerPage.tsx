import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  Wrench,
  Download,
  CheckCircle,
  Play,
  Menu,
  X,
} from 'lucide-react'
import PlayerLayout from '@/layouts/PlayerLayout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { LessonListItem } from '@/components/course/LessonListItem'
import { FloatingAIAssistant } from '@/components/course/FloatingAIAssistant'
import { ApplicationIcons } from '@/components/course/ApplicationIcons'
import { useTranslation } from '@/hooks/useTranslation'
import { usePlayerVisibility } from '@/hooks/usePlayerVisibility'
import {
  fetchCourseBySlug,
  fetchModules,
  type Course,
  type Module,
  type Lesson,
} from '@/lib/api'

const lessonTypeIcons = {
  video: Video,
  text: FileText,
  quiz: HelpCircle,
  interactive: Wrench,
  project: Wrench,
}

const CoursePlayerPage: React.FC = () => {
  const { slug, moduleId, lessonId } = useParams<{
    slug: string
    moduleId: string
    lessonId: string
  }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [course, setCourse] = useState<Course | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMainPlayerVisible, playerRef] = usePlayerVisibility()

  useEffect(() => {
    const loadData = async () => {
      if (!slug || !moduleId || !lessonId) return
      setIsLoading(true)

      const courseData = await fetchCourseBySlug(slug)
      setCourse(courseData)

      if (courseData) {
        const modulesData = await fetchModules(courseData.id)
        setModules(modulesData)

        const mod = modulesData.find((m) => m.id === moduleId)
        setCurrentModule(mod || null)

        if (mod) {
          const lesson = mod.lessons.find((l) => l.id === lessonId)
          setCurrentLesson(lesson || null)
        }
      }

      setIsLoading(false)
    }
    loadData()
  }, [slug, moduleId, lessonId])

  // Calculate overall progress
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const completedLessons = modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => l.isCompleted).length,
    0
  )
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Find previous and next lessons
  const allLessons = modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, isLocked: m.isLocked }))
  )
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const navigateToLesson = (mId: string, lId: string) => {
    navigate(`/course/${slug}/player/${mId}/${lId}`)
    setIsSidebarOpen(false)
  }

  if (isLoading) {
    return (
      <PlayerLayout courseTitle="Loading..." courseSlug={slug || ''}>
        <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
          <div className="animate-pulse text-center">
            <div className="w-16 h-16 bg-muted dark:bg-dark-muted rounded-full mx-auto mb-4" />
            <div className="h-4 bg-muted dark:bg-dark-muted rounded w-32 mx-auto" />
          </div>
        </div>
      </PlayerLayout>
    )
  }

  if (!course || !currentModule || !currentLesson) {
    return (
      <PlayerLayout courseTitle="Error" courseSlug={slug || ''}>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Lesson not found
          </h1>
          <Link to={`/course/${slug}`}>
            <Button variant="primary">{t('player.backToCourse')}</Button>
          </Link>
        </div>
      </PlayerLayout>
    )
  }

  const LessonIcon = lessonTypeIcons[currentLesson.type] || FileText

  // Demo audio URL (replace with real lesson audio URL)
  // Show audio for all lesson types except quiz (tests)
  const lessonAudioUrl = currentLesson.type !== 'quiz' 
    ? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    : undefined

  return (
    <PlayerLayout 
      courseTitle={course.title} 
      courseSlug={slug || ''}
      onPrevLesson={prevLesson ? () => navigateToLesson(prevLesson.moduleId, prevLesson.id) : undefined}
      onNextLesson={nextLesson ? () => navigateToLesson(nextLesson.moduleId, nextLesson.id) : undefined}
      hasPrevLesson={!!prevLesson && !prevLesson.isLocked}
      hasNextLesson={!!nextLesson && !nextLesson.isLocked}
      showMiniPlayer={!isMainPlayerVisible && !!lessonAudioUrl}
    >
      <div className="h-[calc(100vh-3.5rem)] flex">
        {/* Mobile Sidebar Toggle */}
        <button
          className="lg:hidden fixed bottom-20 left-4 z-40 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Left Sidebar - Modules & Lessons */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-30 w-80 
            bg-white dark:bg-dark-card border-r border-border dark:border-dark-border
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:pt-0 pt-14 overflow-y-auto
          `}
        >
          <div className="p-4 border-b border-border dark:border-dark-border">
            <h2 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">
              {t('player.courseContent')}
            </h2>
            <ProgressBar progress={progressPercent} showLabel size="sm" />
          </div>

          <nav className="p-2">
            {modules.map((module) => (
              <div key={module.id} className="mb-4">
                {/* Module Header */}
                <div
                  className={`px-3 py-2 rounded-lg mb-1 ${
                    module.id === currentModule.id
                      ? 'bg-primary-light dark:bg-primary/20'
                      : 'bg-muted/50 dark:bg-dark-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        module.id === currentModule.id
                          ? 'text-primary'
                          : 'text-text-primary dark:text-dark-text-primary'
                      }`}
                    >
                      M{module.order}: {module.title}
                    </span>
                    {module.isFree && (
                      <Badge variant="success" size="sm">
                        {t('player.free')}
                      </Badge>
                    )}
                    {module.isLocked && (
                      <Badge variant="muted" size="sm">
                        {t('player.locked')}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Lessons */}
                <div className="space-y-1">
                  {module.lessons.map((lesson) => (
                    <LessonListItem
                      key={lesson.id}
                      lesson={lesson}
                      moduleId={module.id}
                      courseSlug={slug || ''}
                      isActive={lesson.id === lessonId}
                      isLocked={module.isLocked}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto pb-32">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">

            {/* Lesson Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
                <span>{t('player.module')} {currentModule.order}</span>
                <ChevronRight className="w-4 h-4" />
                <span>{t('player.lesson')} {currentLesson.order}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                {currentLesson.title}
              </h1>
              
              {/* Audio Player - Directly under lesson title */}
              {lessonAudioUrl && (
                <div ref={playerRef} className="mb-6">
                  <AudioPlayer 
                    src={lessonAudioUrl} 
                    title={`${t('player.lesson')} ${currentLesson.order}: ${currentLesson.title}`}
                  />
                </div>
              )}
              
              {/* Lesson Meta Section - Duration and Applications as compact group */}
              <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                <div className="flex items-center gap-1">
                  <LessonIcon className="w-4 h-4" />
                  <span className="capitalize">{currentLesson.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{currentLesson.duration}</span>
                  {/* Show applications as compact horizontal group */}
                  {currentLesson.applications && currentLesson.applications.length > 0 ? (
                    <>
                      <span className="text-border dark:text-dark-border">•</span>
                      <ApplicationIcons applications={currentLesson.applications} className="gap-1" />
                    </>
                  ) : (
                    /* Show placeholder applications for lessons without specific apps */
                    !currentLesson.applications && (
                      <>
                        <span className="text-border dark:text-dark-border">•</span>
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded bg-muted dark:bg-dark-muted flex items-center justify-center">
                            <span className="text-xs">AI</span>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Lesson Content Placeholder */}
            <Card className="mb-8">
              {currentLesson.type === 'video' && (
                <div className="aspect-video bg-secondary dark:bg-dark-muted rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center text-white dark:text-dark-text-primary">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-medium">Video Content</p>
                    <p className="text-sm opacity-70">
                      Video will be embedded after integration
                    </p>
                  </div>
                </div>
              )}

              {currentLesson.type === 'text' && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    This is a placeholder for text lesson content. After database
                    integration, actual content will be displayed including:
                  </p>
                  <ul className="text-text-secondary dark:text-dark-text-secondary space-y-2 mt-4">
                    <li>Formatted text with headings and paragraphs</li>
                    <li>Images and diagrams</li>
                    <li>Code highlighting and examples</li>
                    <li>Interactive elements</li>
                  </ul>
                </div>
              )}

              {currentLesson.type === 'quiz' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary-light dark:bg-primary/20 rounded-2xl flex items-center justify-center">
                    <HelpCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                    Quiz: {currentLesson.title}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                    Interactive questions will be available after backend integration.
                  </p>
                  <Button variant="primary" disabled>
                    Start Quiz (Coming Soon)
                  </Button>
                </div>
              )}

              {(currentLesson.type === 'interactive' ||
                currentLesson.type === 'project') && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-success-light dark:bg-success/20 rounded-2xl flex items-center justify-center">
                    <Wrench className="w-10 h-10 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                    {currentLesson.type === 'project'
                      ? 'Project'
                      : 'Interactive Lesson'}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                    {currentLesson.description}
                  </p>
                  <Button variant="primary" disabled>
                    Start Activity (Coming Soon)
                  </Button>
                </div>
              )}

              {/* Downloads Section */}
              <div className="mt-6 pt-6 border-t border-border dark:border-dark-border">
                <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                  {t('player.materials')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-muted dark:bg-dark-muted rounded-lg text-sm text-text-secondary dark:text-dark-text-secondary hover:bg-muted/80 dark:hover:bg-dark-muted/80 transition-colors">
                    <Download className="w-4 h-4" />
                    Presentation.pdf
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-muted dark:bg-dark-muted rounded-lg text-sm text-text-secondary dark:text-dark-text-secondary hover:bg-muted/80 dark:hover:bg-dark-muted/80 transition-colors">
                    <Download className="w-4 h-4" />
                    Additional_materials.zip
                  </button>
                </div>
              </div>
            </Card>

            {/* Mark as Complete */}
            <Card className="mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">
                    {t('player.completed')}
                  </h4>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {t('player.completedDesc')}
                  </p>
                </div>
                <Button variant="success" className="gap-2 whitespace-nowrap">
                  <CheckCircle className="w-4 h-4" />
                  {t('player.markComplete')}
                </Button>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              {prevLesson && !prevLesson.isLocked ? (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() =>
                    navigateToLesson(prevLesson.moduleId, prevLesson.id)
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t('player.previous')}
                </Button>
              ) : (
                <div />
              )}

              {nextLesson && !nextLesson.isLocked ? (
                <Button
                  variant="primary"
                  className="gap-2"
                  onClick={() =>
                    navigateToLesson(nextLesson.moduleId, nextLesson.id)
                  }
                >
                  {t('player.next')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : nextLesson && nextLesson.isLocked ? (
                <Button variant="secondary" disabled className="gap-2">
                  {t('player.lockedLessons')}
                </Button>
              ) : (
                <Button variant="success" className="gap-2">
                  {t('player.finishCourse')}
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Floating AI Assistant - Bottom Panel */}
      <FloatingAIAssistant lessonContext={currentLesson.title} />
    </PlayerLayout>
  )
}

export default CoursePlayerPage
