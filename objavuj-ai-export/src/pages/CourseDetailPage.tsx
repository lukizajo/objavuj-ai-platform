import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Play,
  CheckCircle,
  Award,
  Download,
  MessageSquare,
  Video,
  HelpCircle,
} from 'lucide-react'
import MainLayout from '@/layouts/MainLayout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ModuleCard } from '@/components/course/ModuleCard'
import { useTranslation } from '@/hooks/useTranslation'
import {
  fetchCourseBySlug,
  fetchModules,
  type Course,
  type Module,
} from '@/lib/api'

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [course, setCourse] = useState<Course | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return
      setIsLoading(true)
      const courseData = await fetchCourseBySlug(slug)
      setCourse(courseData)
      if (courseData) {
        const modulesData = await fetchModules(courseData.id)
        setModules(modulesData)
      }
      setIsLoading(false)
    }
    loadData()
  }, [slug])

  const handleStartModule = (moduleId: string, lessonId: string) => {
    navigate(`/course/${slug}/player/${moduleId}/${lessonId}`)
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-custom section-padding">
          <div className="animate-pulse space-y-8">
            <div className="h-80 bg-muted dark:bg-dark-muted rounded-2xl" />
            <div className="h-8 bg-muted dark:bg-dark-muted rounded-lg w-1/2" />
            <div className="h-4 bg-muted dark:bg-dark-muted rounded-lg w-3/4" />
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Course not found
          </h1>
          <Link to="/courses">
            <Button variant="primary">{t('player.backToCourse')}</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  const freeModule = modules.find((m) => m.isFree)

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-secondary-hover dark:from-dark-background-tertiary dark:to-dark-background-secondary text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-4">
                {course.difficulty}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-white/80 mb-6">{course.subtitle}</p>
              <p className="text-white/70 mb-8">{course.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.modulesCount} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.studentsCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  <span>{course.rating} rating</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                {freeModule && (
                  <Button
                    variant="primary"
                    size="lg"
                    className="gap-2"
                    onClick={() =>
                      handleStartModule(freeModule.id, freeModule.lessons[0].id)
                    }
                  >
                    <Play className="w-5 h-5" />
                    Start Free Module
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-2 border-white/30 hover:bg-white/10"
                >
                  {course.price} {course.currency} - Buy Course
                </Button>
              </div>
            </div>

            {/* Course Image/Icon */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-white/10 rounded-3xl flex items-center justify-center">
                  <BookOpen className="w-32 h-32 text-white/50" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container-custom section-padding">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Modules */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
                {t('player.courseContent')}
              </h2>
              <div className="space-y-4">
                {modules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    isExpanded={expandedModule === module.id}
                    onToggle={() =>
                      setExpandedModule(
                        expandedModule === module.id ? null : module.id
                      )
                    }
                    onStartModule={
                      !module.isLocked
                        ? () => handleStartModule(module.id, module.lessons[0].id)
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>

            {/* What's Inside */}
            <Card>
              <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
                What's inside the course
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-light dark:bg-primary/20 rounded-xl flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary dark:text-dark-text-primary">Video Lessons</p>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      High quality recorded videos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-light dark:bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Download className="w-5 h-5 text-secondary dark:text-dark-text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary dark:text-dark-text-primary">Materials</p>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      PDFs and additional resources
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-light dark:bg-success/20 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-success dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary dark:text-dark-text-primary">Quizzes</p>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      Test your knowledge
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-community-light dark:bg-community/20 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-community" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary dark:text-dark-text-primary">{t('ai.title')}</p>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      Helps with questions
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills Card */}
            <Card>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                Skills you'll gain
              </h3>
              <ul className="space-y-3">
                {course.skills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">{skill}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Instructor Card */}
            <Card>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">Instructor</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-community rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary dark:text-dark-text-primary">
                    {course.instructor.name}
                  </p>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {course.instructor.role}
                  </p>
                </div>
              </div>
            </Card>

            {/* Certificate Card */}
            <Card className="bg-gradient-to-br from-primary-light to-community-light dark:from-primary/10 dark:to-community/10 border-none">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-white dark:bg-dark-card rounded-2xl flex items-center justify-center shadow-soft dark:shadow-dark-soft">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Certificate
                </h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  After completing the course, you'll receive a certificate confirming your knowledge.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default CourseDetailPage
