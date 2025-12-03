import { Check, Star, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockSubscriptionTiers } from '../lib/mockData'
import { useTranslation } from '@/hooks/useTranslation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PricingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleSelectPlan = (tierId: string) => {
    if (tierId === 'tier-free') {
      // Free tier - just redirect to courses
      navigate('/courses')
    } else {
      // Paid tiers - go to purchase page
      navigate('/purchase', { state: { tierId } })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Fixed Header */}
      <Header />
      
      {/* Add top padding for fixed header */}
      <div className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6">
              <CreditCard className="w-4 h-4" />
              {t('pricing.title')}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('pricing.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {mockSubscriptionTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 ${
                    tier.isPopular ? 'ring-4 ring-blue-500' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {tier.isPopular && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 font-semibold flex items-center justify-center gap-2">
                      <Star className="w-5 h-5 fill-current" />
                      {t('pricing.mostPopular')}
                    </div>
                  )}

                  <div className="p-8">
                    {/* Tier Name */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {tier.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-gray-900 dark:text-white">
                          {tier.price}EUR
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          /{t(`pricing.${tier.billingPeriod}`)}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleSelectPlan(tier.id)}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                        tier.isPopular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tier.ctaText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {t('pricing.faqTitle')}
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('pricing.faq1Question')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('pricing.faq1Answer')}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('pricing.faq2Question')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('pricing.faq2Answer')}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('pricing.faq3Question')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('pricing.faq3Answer')}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('pricing.faq4Question')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('pricing.faq4Answer')}
                </p>
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
