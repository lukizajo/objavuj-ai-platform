import { Mail, Linkedin, Twitter, Heart, Lightbulb, Target, Users, BookOpen, Sparkles, Award } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Fixed Header */}
      <Header />
      
      {/* Add top padding for fixed header */}
      <div className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                OBJAVUJ-AI
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('about.title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                {t('about.subtitle')}
              </p>
            </div>

            {/* Personal Introduction */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                <div className="relative">
                  <img
                    src="/images/about/founder.jpg"
                    alt="Founder"
                    className="w-48 h-48 rounded-full shadow-lg object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('about.founderName')}
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                    {t('about.founderTitle')}
                  </p>
                  <div className="flex gap-4 justify-center md:justify-start">
                    <a
                      href="mailto:kontakt@objavuj.ai"
                      className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.intro1')}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.intro2')}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.intro3')}
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('about.missionTitle')}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {t('about.missionText')}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('about.visionTitle')}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {t('about.visionText')}
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('about.valuesTitle')}
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl mb-4">
                    <Award className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t('about.value1Title')}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('about.value1Text')}
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-xl mb-4">
                    <BookOpen className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t('about.value2Title')}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('about.value2Text')}
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900/50 rounded-xl mb-4">
                    <Users className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t('about.value3Title')}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('about.value3Text')}
                  </p>
                </div>
              </div>
            </div>

            {/* Community Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  {t('about.communityTitle')}
                </h3>
                <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                  {t('about.communityText')}
                </p>
                <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-4xl font-bold mb-2">5,000+</div>
                    <div className="opacity-90">{t('about.studentsCount')}</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="opacity-90">{t('about.coursesCount')}</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-4xl font-bold mb-2">4.8/5</div>
                    <div className="opacity-90">{t('about.averageRating')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
