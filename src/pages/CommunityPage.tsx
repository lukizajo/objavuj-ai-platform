import { useState } from 'react'
import { MessageCircle, ThumbsUp, Tag, Calendar, Clock, Building2, TrendingUp, CheckCircle, Users } from 'lucide-react'
import { mockCommunityPosts, mockNewsArticles, mockUseCases } from '../lib/mockData'
import { useTranslation } from '@/hooks/useTranslation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type TabType = 'posts' | 'news' | 'usecases'

export default function CommunityPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>('posts')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Fixed Header */}
      <Header />
      
      {/* Add top padding for fixed header */}
      <div className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              {t('community.title')}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('community.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t('community.subtitle')}
            </p>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-8 py-3 text-lg font-semibold rounded-xl transition-all ${
                  activeTab === 'posts'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t('community.posts')}
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`px-8 py-3 text-lg font-semibold rounded-xl transition-all ${
                  activeTab === 'news'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t('community.news')}
              </button>
              <button
                onClick={() => setActiveTab('usecases')}
                className={`px-8 py-3 text-lg font-semibold rounded-xl transition-all ${
                  activeTab === 'usecases'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t('community.useCases')}
              </button>
            </div>

            {/* Community Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {mockCommunityPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    {/* Author Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {post.authorName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString('sk-SK')}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            post.category === 'question'
                              ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                              : post.category === 'showcase'
                              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                              : post.category === 'resource'
                              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                              : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          }`}
                        >
                          {t(`community.category.${post.category}`)}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {post.title}
                      {post.isResolved && (
                        <CheckCircle className="inline-block w-6 h-6 ml-2 text-green-500" />
                      )}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Stats */}
                    <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                      <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <ThumbsUp className="w-5 h-5" />
                        <span className="font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* News Tab */}
            {activeTab === 'news' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockNewsArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    {/* Article Image */}
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Article Content */}
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                        {article.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Article Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.publishedAt).toLocaleDateString('sk-SK')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {article.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Use Cases Tab */}
            {activeTab === 'usecases' && (
              <div className="space-y-8">
                {mockUseCases.map((useCase) => (
                  <div
                    key={useCase.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Use Case Image */}
                      <div className="aspect-video md:aspect-auto bg-gray-200 dark:bg-gray-700">
                        <img
                          src={useCase.imageUrl}
                          alt={useCase.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Use Case Content */}
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {useCase.company}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {useCase.industry}
                            </p>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {useCase.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {useCase.description}
                        </p>

                        {/* Challenge & Solution */}
                        <div className="space-y-4 mb-6">
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                              {t('community.challenge')}:
                            </h5>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {useCase.challenge}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                              {t('community.solution')}:
                            </h5>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {useCase.solution}
                            </p>
                          </div>
                        </div>

                        {/* Results */}
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            {t('community.results')}:
                          </h5>
                          <ul className="space-y-2">
                            {useCase.results.map((result, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-6">
                          {useCase.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
