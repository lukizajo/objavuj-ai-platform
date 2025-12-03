import React, { useEffect, useState } from 'react'
import { Search, Filter, BookOpen } from 'lucide-react'
import MainLayout from '@/layouts/MainLayout'
import { CourseCard } from '@/components/course/CourseCard'
import { Badge } from '@/components/ui/Badge'
import { useTranslation } from '@/hooks/useTranslation'
import { fetchCourses, type Course } from '@/lib/api'

const CoursesPage: React.FC = () => {
  const { t } = useTranslation()
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true)
      const data = await fetchCourses()
      setCourses(data)
      setFilteredCourses(data)
      setIsLoading(false)
    }
    loadCourses()
  }, [])

  useEffect(() => {
    let filtered = courses

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter((course) => course.difficulty === selectedDifficulty)
    }

    setFilteredCourses(filtered)
  }, [searchQuery, selectedDifficulty, courses])

  const difficulties = ['all', 'Zaciatocnik', 'Stredne pokrocily', 'Pokrocily']

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-white dark:from-dark-background dark:to-dark-background-secondary py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              {t('nav.courses')}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Choose a course for you
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              Quality education about artificial intelligence in your language.
              From basics to advanced techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white dark:bg-dark-card border-b border-border dark:border-dark-border sticky top-16 md:top-20 z-40">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-dark-text-secondary" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted dark:bg-dark-muted rounded-xl text-text-primary dark:text-dark-text-primary
                         placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-5 h-5 text-text-secondary dark:text-dark-text-secondary flex-shrink-0" />
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                    ${
                      selectedDifficulty === difficulty
                        ? 'bg-primary text-white'
                        : 'bg-muted dark:bg-dark-muted text-text-secondary dark:text-dark-text-secondary hover:bg-primary-light dark:hover:bg-primary/20 hover:text-primary'
                    }`}
                >
                  {difficulty === 'all' ? 'All' : difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container-custom section-padding">
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-dark-soft border border-border dark:border-dark-border h-96 animate-pulse"
              >
                <div className="h-48 bg-muted dark:bg-dark-muted rounded-t-2xl" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-muted dark:bg-dark-muted rounded-lg w-3/4" />
                  <div className="h-4 bg-muted dark:bg-dark-muted rounded-lg w-full" />
                  <div className="h-4 bg-muted dark:bg-dark-muted rounded-lg w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted dark:bg-dark-muted rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-text-secondary dark:text-dark-text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
              No courses found
            </h3>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Try changing filters or search term.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Results count */}
        {!isLoading && filteredCourses.length > 0 && (
          <p className="text-center text-text-secondary dark:text-dark-text-secondary mt-8">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        )}
      </section>
    </MainLayout>
  )
}

export default CoursesPage
