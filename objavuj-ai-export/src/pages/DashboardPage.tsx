import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Trophy,
  Zap,
  Star,
  Clock,
  ArrowRight,
  Play,
  Award,
} from 'lucide-react'
import MainLayout from '@/layouts/MainLayout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useAuthStore } from '@/stores/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import {
  fetchCurrentUser,
  fetchCourseBySlug,
  fetchModules,
  type User,
  type Course,
} from '@/lib/api'

const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { user: authUser, isAuthenticated } = useAuthStore()
  const { t } = useTranslation()
  const [user, setUser] = useState<User | null>(null)
  const [enrolledCourseDetails, setEnrolledCourseDetails] = useState<
    Array<{
      course: Course
      progress: number
      currentModule: string
      currentLesson: string
      nextLessonTitle: string
    }>
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const userData = await fetchCurrentUser()
      setUser(userData)

      if (userData) {
        const courseDetails = await Promise.all(
          userData.enrolledCourses.map(async (enrolled) => {
            const course = await fetchCourseBySlug(enrolled.courseId)
            const modules = await fetchModules(enrolled.courseId)
            const currentMod = modules.find((m) => m.id === enrolled.currentModule)
            const currentLesson = currentMod?.lessons.find(
              (l) => l.id === enrolled.currentLesson
            )
            return {
              course: course!,
              progress: enrolled.progress,
              currentModule: enrolled.currentModule,
              currentLesson: enrolled.currentLesson,
              nextLessonTitle: currentLesson?.title || 'Continue Learning',
            }
          })
        )
        setEnrolledCourseDetails(courseDetails.filter((d) => d.course))
      }

      setIsLoading(false)
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-custom section-padding">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted dark:bg-dark-muted rounded-lg w-1/3" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted dark:bg-dark-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!user && !isAuthenticated) {
    return (
      <MainLayout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Please sign in
          </h1>
          <Link to="/login">
            <Button variant="primary">{t('nav.login')}</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  const displayName = authUser?.name || user?.name || 'User'
  const firstName = displayName.split(' ')[0]

  return (
    <MainLayout>
      {/* Welcome Section */}
      <section className="bg-gradient-to-b from-background to-white dark:from-dark-background dark:to-dark-background-secondary py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Welcome back, {firstName}!
              </h1>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Continue your journey to learn about artificial intelligence.
              </p>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="gap-2">
                {t('whyUs.browseCourses')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="container-custom -mt-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light dark:bg-primary/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{user?.xp || 0}</p>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">XP Points</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success-light dark:bg-success/20 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-success dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">Level {user?.level || 1}</p>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Your Level</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary-light dark:bg-secondary/20 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-secondary dark:text-dark-text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                {user?.badges?.length || 0}
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Badges</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-community-light dark:bg-community/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-community" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                {user?.enrolledCourses?.length || 1}
              </p>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Active Courses</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom section-padding">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Courses */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            {enrolledCourseDetails.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                  Continue Learning
                </h2>
                <Card
                  className="bg-gradient-to-r from-primary/5 to-community/5 dark:from-primary/10 dark:to-community/10 border-none"
                  hover
                  onClick={() => {
                    const first = enrolledCourseDetails[0]
                    navigate(
                      `/course/${first.course.slug}/player/${first.currentModule}/${first.currentLesson}`
                    )
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-community rounded-2xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-grow">
                      <Badge variant="primary" size="sm" className="mb-2">
                        Continue
                      </Badge>
                      <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-1">
                        {enrolledCourseDetails[0].course.title}
                      </h3>
                      <p className="text-text-secondary dark:text-dark-text-secondary mb-3">
                        Next: {enrolledCourseDetails[0].nextLessonTitle}
                      </p>
                      <ProgressBar
                        progress={enrolledCourseDetails[0].progress}
                        showLabel
                        color="primary"
                      />
                    </div>
                    <Button variant="primary" className="gap-2 self-start md:self-center">
                      <Play className="w-4 h-4" />
                      Continue
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* My Courses */}
            <div>
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                My Courses
              </h2>
              {enrolledCourseDetails.length === 0 ? (
                <Card className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted dark:bg-dark-muted rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-text-secondary dark:text-dark-text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                    No courses yet
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                    Browse our courses and start learning.
                  </p>
                  <Link to="/courses">
                    <Button variant="primary">{t('whyUs.browseCourses')}</Button>
                  </Link>
                </Card>
              ) : (
                <div className="space-y-4">
                  {enrolledCourseDetails.map(({ course, progress, currentModule, currentLesson }) => (
                    <Card key={course.id} hover>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-hover rounded-xl flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-1">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </span>
                            <span>{progress}% complete</span>
                          </div>
                          <ProgressBar progress={progress} size="sm" />
                        </div>
                        <Link
                          to={`/course/${course.slug}/player/${currentModule}/${currentLesson}`}
                          className="flex-shrink-0"
                        >
                          <Button variant="outline" size="sm" className="gap-1">
                            Continue
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                Your Badges
              </h3>
              {!user?.badges || user.badges.length === 0 ? (
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  No badges yet. Complete lessons to earn them!
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {user.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="text-center p-3 bg-muted dark:bg-dark-muted rounded-xl"
                    >
                      <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-primary to-community rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs font-medium text-text-primary dark:text-dark-text-primary truncate">
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Quick Links */}
            <Card>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  to="/courses"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted dark:hover:bg-dark-muted transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-text-secondary dark:text-dark-text-secondary" />
                  <span className="text-sm text-text-primary dark:text-dark-text-primary">{t('footer.allCourses')}</span>
                </Link>
                <Link
                  to="/course/objavuj-ai"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted dark:hover:bg-dark-muted transition-colors"
                >
                  <Star className="w-5 h-5 text-text-secondary dark:text-dark-text-secondary" />
                  <span className="text-sm text-text-primary dark:text-dark-text-primary">OBJAVUJ-AI</span>
                </Link>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted dark:hover:bg-dark-muted transition-colors"
                >
                  <Trophy className="w-5 h-5 text-text-secondary dark:text-dark-text-secondary" />
                  <span className="text-sm text-text-primary dark:text-dark-text-primary">My Certificates</span>
                </a>
              </div>
            </Card>

            {/* Motivation */}
            <Card className="bg-gradient-to-br from-success to-success-hover text-white">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Tip of the Day</h3>
                <p className="text-sm text-white/90">
                  Consistent learning is the key to success. Try to learn at least 15 minutes a day!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default DashboardPage
