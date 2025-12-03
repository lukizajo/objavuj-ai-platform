import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, Users, Star, BookOpen, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Course } from '@/lib/api'

interface CourseCardProps {
  course: Course
  variant?: 'default' | 'featured'
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <Card className="overflow-hidden" padding="none" hover>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="relative bg-gradient-to-br from-primary/10 to-community/10 dark:from-primary/5 dark:to-community/5 p-8 md:p-12 flex items-center justify-center min-h-[300px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,138,38,0.1),transparent_50%)]" />
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-community rounded-2xl flex items-center justify-center shadow-soft-lg">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <Badge variant="primary" className="mt-2">Recommended Course</Badge>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-3">
              {course.title}
            </h3>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary mb-6">
              {course.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-text-secondary dark:text-dark-text-secondary">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>{course.modulesCount} modules</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{course.studentsCount.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="font-medium text-text-primary dark:text-dark-text-primary">{course.rating}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={`/course/${course.slug}`}>
                <Button variant="primary" className="w-full sm:w-auto gap-2">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Badge variant="success" size="md" className="justify-center py-3">
                First Module FREE
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card hover className="overflow-hidden h-full flex flex-col" padding="none">
      {/* Image */}
      <div className="relative bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 p-6 flex items-center justify-center h-48">
        <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-hover rounded-xl flex items-center justify-center shadow-soft">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <Badge variant="muted" className="absolute top-4 right-4">
          {course.difficulty}
        </Badge>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
          {course.title}
        </h3>
        <p className="text-text-secondary dark:text-dark-text-secondary mb-4 flex-grow line-clamp-2">
          {course.subtitle}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary dark:text-dark-text-secondary">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessonsCount} lessons</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="font-semibold text-text-primary dark:text-dark-text-primary">{course.rating}</span>
            <span className="text-text-secondary dark:text-dark-text-secondary text-sm">({course.studentsCount})</span>
          </div>
          <span className="font-bold text-lg text-text-primary dark:text-dark-text-primary">
            {course.price} {course.currency}
          </span>
        </div>
        
        <Link to={`/course/${course.slug}`} className="mt-4">
          <Button variant="outline" className="w-full gap-2">
            View Details
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default CourseCard
