import React, { useEffect, useState, useRef } from 'react'
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
  Bot,
  Cpu,
  CircuitBoard,
  Atom,
  Rocket,
  Star,
  TrendingUp,
  Globe,
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const howItWorks = [
    {
      icon: Bot,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BookOpen,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc'),
      gradient: 'from-primary to-primary-hover',
    },
    {
      icon: Cpu,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.desc'),
      gradient: 'from-emerald-500 to-teal-500',
    },
  ]

  const whatYouWillLearn = [
    {
      icon: Brain,
      title: t('learn.ai.title'),
      description: t('learn.ai.desc'),
      gradient: 'from-primary to-primary-hover',
      glowColor: 'primary',
    },
    {
      icon: MessageSquare,
      title: t('learn.practical.title'),
      description: t('learn.practical.desc'),
      gradient: 'from-blue-500 to-cyan-500',
      glowColor: 'blue',
    },
    {
      icon: Sparkles,
      title: t('learn.create.title'),
      description: t('learn.create.desc'),
      gradient: 'from-purple-500 to-pink-500',
      glowColor: 'purple',
    },
  ]

  const aiFeatures = [
    {
      icon: CircuitBoard,
      title: 'Neural Networks',
      description: 'Understand how artificial minds learn and think',
      stats: '96% Success Rate',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Atom,
      title: 'Deep Learning',
      description: 'Master the fundamental building blocks of AI',
      stats: '12+ Models',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Rocket,
      title: 'AI Applications',
      description: 'Build real-world AI solutions that work',
      stats: '24+ Projects',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ]

  const useCases = [
    {
      icon: Briefcase,
      title: t('useCases.business'),
      description: t('useCases.businessDesc'),
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Palette,
      title: t('useCases.creativity'),
      description: t('useCases.creativityDesc'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Target,
      title: t('useCases.productivity'),
      description: t('useCases.productivityDesc'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Lightbulb,
      title: t('useCases.education'),
      description: t('useCases.educationDesc'),
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Shield,
      title: t('useCases.security'),
      description: t('useCases.securityDesc'),
      gradient: 'from-red-500 to-rose-500',
    },
    {
      icon: Zap,
      title: t('useCases.innovation'),
      description: t('useCases.innovationDesc'),
      gradient: 'from-primary to-primary-hover',
    },
  ]

  const whyChooseUs = [
    {
      title: t('whyUs.slovak'),
      description: t('whyUs.slovakDesc'),
      icon: Globe,
    },
    {
      title: t('whyUs.practical'),
      description: t('whyUs.practicalDesc'),
      icon: Target,
    },
    {
      title: t('whyUs.updated'),
      description: t('whyUs.updatedDesc'),
      icon: TrendingUp,
    },
    {
      title: t('whyUs.support'),
      description: t('whyUs.supportDesc'),
      icon: Users,
    },
  ]

  return (
    <MainLayout>
      {/* Futuristic Background Effects */}

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Floating Orbs */}
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
            }}
          />
          <div 
            className="absolute top-20 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-float"
            style={{
              transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px)`,
              animationDelay: '2s'
            }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float"
            style={{
              transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
              animationDelay: '4s'
            }}
          />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img 
                  src="/logo-white.png" 
                  alt="OBJAVUJ AI" 
                  className="h-24 md:h-32 w-auto drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-glow" />
              </div>
            </div>

            {/* AI Badge */}
            <Badge variant="primary" className="mb-6 bg-gradient-to-r from-primary to-purple-500 text-white border-0 shadow-2xl">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('hero.badge')}
            </Badge>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            {/* Subtitle with typing effect */}
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link to="/course/objavuj-ai">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="gap-3 w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
                >
                  <Play className="w-6 h-6" />
                  {t('hero.freeModule')}
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-3 w-full sm:w-auto border-2 border-white/30 hover:border-white/60 hover:bg-white/10 backdrop-blur-xl px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  {t('hero.viewPricing')}
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
            </div>

            {/* AI Stats with Glow Effects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-colors duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">2,500+</div>
                  <div className="text-gray-300 flex items-center justify-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{t('hero.students')}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">24+</div>
                  <div className="text-gray-300 flex items-center justify-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{t('hero.lessons')}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9</div>
                  <div className="text-gray-300 flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{t('hero.rating')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Course */}
      {featuredCourse && (
        <section className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 section-padding">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10" />
          <div className="container-custom relative z-10">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <Star className="w-4 h-4 mr-2" />
                {t('featured.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('featured.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Start your AI journey with our flagship course designed for the future
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative">
                  <CourseCard course={featuredCourse} variant="featured" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AI Features Showcase */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 section-padding">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-6 bg-gradient-to-r from-primary to-purple-500 text-white border-0">
              <Brain className="w-4 h-4 mr-2" />
              AI Technologies
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Master the Future Technologies
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Dive deep into cutting-edge AI technologies that are shaping tomorrow's world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-300 text-center mb-6">{feature.description}</p>
                  <div className="text-center">
                    <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="muted" className="mb-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 border-0">
              <Rocket className="w-4 h-4 mr-2" />
              {t('howItWorks.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              Your AI education journey in four powerful steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <Card hover className="relative text-center p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-white/20 dark:border-slate-700/20 hover:transform hover:scale-105 transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-2xl">
                    {index + 1}
                  </div>
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="relative bg-gradient-to-br from-slate-900 to-purple-900 section-padding">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-cyan-500/10" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('learn.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('learn.title')}
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              {t('learn.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whatYouWillLearn.map((item, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                <div className="relative text-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div
                    className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-br ${item.gradient} rounded-3xl flex items-center justify-center shadow-2xl`}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 section-padding">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <Target className="w-4 h-4 mr-2" />
              {t('useCases.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('useCases.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              {t('useCases.description')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((item, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-slate-700/20 hover:border-white/30 dark:hover:border-slate-600/30 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className={`w-14 h-14 mb-6 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative bg-gradient-to-br from-slate-900 to-purple-900 section-padding">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="success" className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('whyUs.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {t('whyUs.title')}
              </h2>
              <p className="text-gray-300 mb-10 text-lg leading-relaxed">
                {t('whyUs.description')}
              </p>

              <div className="space-y-6">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:transform group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 text-lg">{item.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/courses" className="inline-block mt-10">
                <Button 
                  variant="primary" 
                  className="gap-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
                >
                  {t('whyUs.browseCourses')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20">
                <div className="text-center mb-8">
                  <img 
                    src="/logo-white.png" 
                    alt="OBJAVUJ AI" 
                    className="h-16 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-white">OBJAVUJ-AI</h3>
                  <p className="text-gray-300">Komplexný AI kurz</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-300">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>12 hodín obsahu</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>6 modulov, 24 lekcií</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Certifikát po dokončení</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <Bot className="w-5 h-5 text-primary" />
                    <span>AI asistent pre každú lekciu</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl -z-10 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 rounded-2xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 section-padding">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center p-12 bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 border-0 backdrop-blur-xl shadow-2xl">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('newsletter.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                {t('newsletter.description')}
              </p>
              
              {newsletterSuccess ? (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl flex items-center justify-center gap-3 text-lg font-semibold">
                  <CheckCircle className="w-6 h-6" />
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
                    className="flex-1 px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent shadow-lg text-lg"
                  />
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    {t('newsletter.subscribe')}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <PodcastCard />

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 section-padding overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 animate-pulse" />
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-white/90 mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
            {t('cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/courses">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 gap-3 shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                {t('cta.startNow')}
                <Rocket className="w-5 h-5" />
              </Button>
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 gap-3 shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
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
                  className="text-white border-2 border-white/30 hover:bg-white/10 gap-3 px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  {t('nav.login')}
                  <ArrowRight className="w-5 h-5" />
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