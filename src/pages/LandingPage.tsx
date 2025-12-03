import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Users,
  Target,
  Zap,
  Brain,
  Lightbulb,
  Briefcase,
  Palette,
  MessageSquare,
  Shield,
  Clock,
  Award,
  CheckCircle,
  Play,
  Mail,
  User,
} from 'lucide-react'
import MainLayout from '@/layouts/MainLayout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CourseCard } from '@/components/course/CourseCard'
import { PodcastCard } from '@/components/PodcastCard'
import { useTranslation } from '@/hooks/useTranslation'
import { useAuthStore } from '@/stores/authStore'
import { fetchCourses, type Course } from '@/lib/api'

const LandingPage: React.FC = () => {
  const [featuredCourse, setFeaturedCourse] = useState<Course | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    const loadCourse = async () => {
      const courses = await fetchCourses()
      const featured = courses.find((c) => c.isFeatured)
      setFeaturedCourse(featured || null)
    }
    loadCourse()
  }, [])

  const howItWorks = [
    {
      icon: Users,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc'),
    },
    {
      icon: BookOpen,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc'),
    },
    {
      icon: Play,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc'),
    },
    {
      icon: Award,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.desc'),
    },
  ]

  const whatYouWillLearn = [
    {
      icon: Brain,
      title: t('learn.ai.title'),
      description: t('learn.ai.desc'),
      color: 'from-primary to-primary-hover',
    },
    {
      icon: MessageSquare,
      title: t('learn.practical.title'),
      description: t('learn.practical.desc'),
      color: 'from-secondary to-secondary-hover',
    },
    {
      icon: Sparkles,
      title: t('learn.create.title'),
      description: t('learn.create.desc'),
      color: 'from-community to-community-hover',
    },
  ]

  const useCases = [
    {
      icon: Briefcase,
      title: t('useCases.business'),
      description: t('useCases.businessDesc'),
    },
    {
      icon: Palette,
      title: t('useCases.creativity'),
      description: t('useCases.creativityDesc'),
    },
    {
      icon: Target,
      title: t('useCases.productivity'),
      description: t('useCases.productivityDesc'),
    },
    {
      icon: Lightbulb,
      title: t('useCases.education'),
      description: t('useCases.educationDesc'),
    },
    {
      icon: Shield,
      title: t('useCases.security'),
      description: t('useCases.securityDesc'),
    },
    {
      icon: Zap,
      title: t('useCases.innovation'),
      description: t('useCases.innovationDesc'),
    },
  ]

  const whyChooseUs = [
    {
      title: t('whyUs.slovak'),
      description: t('whyUs.slovakDesc'),
    },
    {
      title: t('whyUs.practical'),
      description: t('whyUs.practicalDesc'),
    },
    {
      title: t('whyUs.updated'),
      description: t('whyUs.updatedDesc'),
    },
    {
      title: t('whyUs.support'),
      description: t('whyUs.supportDesc'),
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-white dark:from-dark-background dark:to-dark-background-secondary">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-20 w-60 h-60 bg-community/5 dark:bg-community/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">
              {t('hero.badge')}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary dark:text-dark-text-primary mb-6 leading-tight">
              {t('hero.title')}{' '}
              <span className="text-gradient">{t('hero.titleHighlight')}</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary dark:text-dark-text-secondary mb-10 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/course/objavuj-ai">
                <Button variant="primary" size="lg" className="gap-2 w-full sm:w-auto">
                  <Play className="w-5 h-5" />
                  {t('hero.freeModule')}
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  {t('hero.viewPricing')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-border dark:border-dark-border">
              <div className="text-center">
                <p className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">2,500+</p>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{t('hero.students')}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">24+</p>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{t('hero.lessons')}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">4.9</p>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{t('hero.rating')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Course */}
      {featuredCourse && (
        <section className="container-custom section-padding">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t('featured.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary">
              {t('featured.title')}
            </h2>
          </div>
          <CourseCard course={featuredCourse} variant="featured" />
        </section>
      )}

      {/* How It Works */}
      <section className="bg-white dark:bg-dark-background-secondary section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="muted" className="mb-4">
              {t('howItWorks.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary">
              {t('howItWorks.title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <Card key={index} hover className="text-center relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="w-14 h-14 mx-auto mb-4 bg-primary-light dark:bg-primary/20 rounded-xl flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="container-custom section-padding">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            {t('learn.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            {t('learn.title')}
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            {t('learn.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {whatYouWillLearn.map((item, index) => (
            <Card key={index} hover className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-soft`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="bg-secondary dark:bg-dark-background-tertiary section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">
              {t('useCases.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('useCases.title')}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              {t('useCases.description')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300"
              >
                <div className="w-12 h-12 mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="success" className="mb-4">
              {t('whyUs.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
              {t('whyUs.title')}
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-8">
              {t('whyUs.description')}
            </p>

            <div className="space-y-4">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</h4>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/courses" className="inline-block mt-8">
              <Button variant="primary" className="gap-2">
                {t('whyUs.browseCourses')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-community/10 dark:from-primary/5 dark:to-community/5 rounded-3xl p-8 md:p-12">
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-soft-lg dark:shadow-dark-soft-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-community rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary dark:text-dark-text-primary">OBJAVUJ-AI</h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Komplexny kurz</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
                    <span className="text-text-secondary dark:text-dark-text-secondary">12 hodin obsahu</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <BookOpen className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
                    <span className="text-text-secondary dark:text-dark-text-secondary">6 modulov, 24 lekcii</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
                    <span className="text-text-secondary dark:text-dark-text-secondary">Certifikat po dokonceni</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 dark:bg-primary/5 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-community/10 dark:bg-community/5 rounded-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container-custom section-padding">
        <div className="max-w-3xl mx-auto">
          <Card className="text-center p-8 md:p-12 bg-gradient-to-br from-primary-light to-community-light dark:from-primary/10 dark:to-community/10">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
              {t('newsletter.description')}
            </p>
            
            {newsletterSuccess ? (
              <div className="bg-success/10 text-success p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 inline-block mr-2" />
                {t('newsletter.success')}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setNewsletterSuccess(true)
                  setNewsletterEmail('')
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  className="flex-1 px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-dark-background text-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button type="submit" variant="primary" size="lg">
                  {t('newsletter.subscribe')}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Podcast Section - Moved to bottom */}
      <PodcastCard />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-community section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/courses">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 gap-2"
              >
                {t('cta.startNow')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 gap-2"
                >
                  <User className="w-5 h-5" />
                  {t('nav.myAccount')}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-2 border-white/30 hover:bg-white/10"
                >
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default LandingPage
