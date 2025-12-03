import { useState } from 'react'
import { Play, Calendar, Clock, ExternalLink, Youtube, Music, Mic, Headphones } from 'lucide-react'
import { mockPodcastEpisodes } from '../lib/mockData'
import { useTranslation } from '@/hooks/useTranslation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PodcastPage() {
  const { t } = useTranslation()
  const [selectedEpisode, setSelectedEpisode] = useState(mockPodcastEpisodes[0])

  // Helper to extract YouTube video ID from URL for embed
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null
    // If already an embed URL, return as is
    if (url.includes('/embed/')) return url
    // Extract video ID from various YouTube URL formats
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\s]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6">
              <Headphones className="w-4 h-4" />
              {t('podcast.subtitle')}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('podcast.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t('podcast.description')}
            </p>
          </div>
        </section>

        {/* Intro Section - How the Podcast Started */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Mic className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {t('podcast.introTitle')}
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                    {t('podcast.introText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Episode Player */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Now Playing Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white font-medium">{t('podcast.nowPlaying')}</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Episode Info */}
                <div className="space-y-6">
                  <div>
                    <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                      {selectedEpisode.category}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {selectedEpisode.title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {selectedEpisode.description}
                    </p>
                  </div>

                  {/* Episode Meta */}
                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedEpisode.publishedAt).toLocaleDateString('sk-SK')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedEpisode.duration}
                    </div>
                  </div>

                  {/* Guests */}
                  {selectedEpisode.guests && selectedEpisode.guests.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {t('podcast.guests')}:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEpisode.guests.map((guest, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {guest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Listen On Links */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('podcast.listenOn')}:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={selectedEpisode.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <Music className="w-5 h-5" />
                        Spotify
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {selectedEpisode.youtubeUrl && (
                        <a
                          href={selectedEpisode.youtubeUrl.includes('/embed/') 
                            ? selectedEpisode.youtubeUrl.replace('/embed/', '/watch?v=')
                            : selectedEpisode.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          <Youtube className="w-5 h-5" />
                          YouTube
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Audio Player Area */}
                <div className="flex flex-col gap-6">
                  {/* Audio Player */}
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Headphones className="w-8 h-8 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {selectedEpisode.category}
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {selectedEpisode.title}
                        </p>
                      </div>
                    </div>
                    <audio controls className="w-full" key={selectedEpisode.id}>
                      <source src={selectedEpisode.audioUrl} type="audio/mpeg" />
                      {t('podcast.audioNotSupported')}
                    </audio>
                  </div>
                </div>
              </div>
              
              {/* YouTube Video Module - Only shows if YouTube URL exists */}
              {selectedEpisode.youtubeUrl && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('podcast.watchOnYouTube')}
                    </h3>
                  </div>
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(selectedEpisode.youtubeUrl)}
                      title={selectedEpisode.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* All Episodes */}
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {t('podcast.allEpisodes')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPodcastEpisodes.map((episode) => (
                <div
                  key={episode.id}
                  onClick={() => {
                    setSelectedEpisode(episode)
                    window.scrollTo({ top: 300, behavior: 'smooth' })
                  }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                    selectedEpisode.id === episode.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                    <img
                      src={episode.thumbnailUrl}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                    {/* Playing indicator */}
                    {selectedEpisode.id === episode.id && (
                      <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 bg-blue-600 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-xs text-white font-medium">{t('podcast.nowPlaying')}</span>
                      </div>
                    )}
                  </div>

                  {/* Episode Info */}
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                      {episode.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {episode.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {episode.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(episode.publishedAt).toLocaleDateString('sk-SK')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {episode.duration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
