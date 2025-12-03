// Data Layer - Abstraction for mock and Supabase data sources
import { getEffectiveDataSource } from './config'
import { getSupabase } from './supabase'
import { 
  mockCourses, 
  mockModules, 
  mockLessons,
  mockUserProgress,
  type MockCourse,
  type MockModule,
  type MockLesson
} from './mockData'

// Types
export interface Course {
  id: string
  slug: string
  title: string
  description: string | null
  imageUrl: string | null
  category: string | null
  difficulty: string
  duration: string | null
  lessonsCount: number
  isPublished: boolean
}

export interface Module {
  id: string
  courseId: string
  title: string
  description: string | null
  order: number
  isFree: boolean
  isLocked: boolean
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  description: string | null
  content: string | null
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'project'
  duration: string | null
  order: number
  audioUrl: string | null
  videoUrl: string | null
  applications?: string[]  // AI tools used in this lesson
  materials: LessonFile[]
  isCompleted: boolean
}

export interface LessonFile {
  id: string
  name: string
  url: string
  fileType: string
  fileSize: number | null
}

export interface UserProgress {
  lessonId: string
  isCompleted: boolean
  completedAt: string | null
  progressPercent: number
}

// Data Layer API
class DataLayer {
  private dataSource: 'mock' | 'supabase'
  
  constructor() {
    this.dataSource = getEffectiveDataSource()
  }
  
  // Courses
  async getCourses(): Promise<Course[]> {
    if (this.dataSource === 'supabase') {
      return this.getSupabaseCourses()
    }
    return this.getMockCourses()
  }
  
  async getCourseBySlug(slug: string): Promise<Course | null> {
    if (this.dataSource === 'supabase') {
      return this.getSupabaseCourseBySlug(slug)
    }
    return this.getMockCourseBySlug(slug)
  }
  
  // Modules
  async getModulesByCourse(courseId: string): Promise<Module[]> {
    if (this.dataSource === 'supabase') {
      return this.getSupabaseModules(courseId)
    }
    return this.getMockModules(courseId)
  }
  
  // Lessons
  async getLessonById(lessonId: string): Promise<Lesson | null> {
    if (this.dataSource === 'supabase') {
      return this.getSupabaseLessonById(lessonId)
    }
    return this.getMockLessonById(lessonId)
  }
  
  // Progress
  async getUserProgress(userId: string, courseId: string): Promise<UserProgress[]> {
    if (this.dataSource === 'supabase') {
      return this.getSupabaseProgress(userId, courseId)
    }
    return this.getMockProgress(userId, courseId)
  }
  
  async markLessonComplete(userId: string, courseId: string, lessonId: string): Promise<boolean> {
    if (this.dataSource === 'supabase') {
      return this.markSupabaseLessonComplete(userId, courseId, lessonId)
    }
    return this.markMockLessonComplete(userId, courseId, lessonId)
  }
  
  // Mock Data Methods
  private getMockCourses(): Course[] {
    return mockCourses.map(this.transformMockCourse)
  }
  
  private getMockCourseBySlug(slug: string): Course | null {
    const course = mockCourses.find(c => c.slug === slug)
    return course ? this.transformMockCourse(course) : null
  }
  
  private getMockModules(courseId: string): Module[] {
    const modules = mockModules.filter(m => m.courseId === courseId)
    return modules.map(m => this.transformMockModule(m, courseId))
  }
  
  private getMockLessonById(lessonId: string): Lesson | null {
    const lesson = mockLessons.find(l => l.id === lessonId)
    return lesson ? this.transformMockLesson(lesson) : null
  }

  private getMockProgress(userId: string, courseId: string): UserProgress[] {
    return mockUserProgress
      .filter(p => p.userId === userId && p.courseId === courseId)
      .map(p => ({
        lessonId: p.lessonId,
        isCompleted: p.isCompleted,
        completedAt: p.completedAt,
        progressPercent: p.progressPercent
      }))
  }
  
  private markMockLessonComplete(_userId: string, _courseId: string, lessonId: string): boolean {
    const key = `progress_mock_${lessonId}`
    localStorage.setItem(key, JSON.stringify({ completed: true, completedAt: new Date().toISOString() }))
    return true
  }
  
  // Transform helpers
  private transformMockCourse(course: MockCourse): Course {
    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      imageUrl: course.imageUrl,
      category: course.category,
      difficulty: course.difficulty,
      duration: course.duration,
      lessonsCount: course.lessonsCount,
      isPublished: course.isPublished
    }
  }
  
  private transformMockModule(module: MockModule, courseId: string): Module {
    const lessons = mockLessons
      .filter(l => l.moduleId === module.id)
      .map(l => this.transformMockLesson(l))
    
    return {
      id: module.id,
      courseId,
      title: module.title,
      description: module.description,
      order: module.order,
      isFree: module.isFree,
      isLocked: module.isLocked,
      lessons
    }
  }
  
  private transformMockLesson(lesson: MockLesson): Lesson {
    return {
      id: lesson.id,
      moduleId: lesson.moduleId,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      type: lesson.type as Lesson['type'],
      duration: lesson.duration,
      order: lesson.order,
      audioUrl: lesson.audioUrl,
      videoUrl: lesson.videoUrl,
      materials: lesson.materials || [],
      isCompleted: this.checkMockCompletion(lesson.id)
    }
  }
  
  private checkMockCompletion(lessonId: string): boolean {
    const key = `progress_mock_${lessonId}`
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data).completed : false
  }
  
  // Supabase Methods - use type assertions to avoid TypeScript issues
  private async getSupabaseCourses(): Promise<Course[]> {
    const supabase = getSupabase()
    if (!supabase) return this.getMockCourses()
    
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
      
      if (error || !data) return []
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data as any[]).map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        imageUrl: c.image_url,
        category: c.category,
        difficulty: c.difficulty,
        duration: c.duration,
        lessonsCount: c.lessons_count,
        isPublished: c.is_published
      }))
    } catch {
      return []
    }
  }
  
  private async getSupabaseCourseBySlug(slug: string): Promise<Course | null> {
    const supabase = getSupabase()
    if (!supabase) return this.getMockCourseBySlug(slug)
    
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()
      
      if (error || !data) return null
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const c = data as any
      return {
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        imageUrl: c.image_url,
        category: c.category,
        difficulty: c.difficulty,
        duration: c.duration,
        lessonsCount: c.lessons_count,
        isPublished: c.is_published
      }
    } catch {
      return null
    }
  }
  
  private async getSupabaseModules(courseId: string): Promise<Module[]> {
    const supabase = getSupabase()
    if (!supabase) return this.getMockModules(courseId)
    
    try {
      const { data: modulesData, error } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true })
      
      if (error || !modulesData) return []
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const modules = modulesData as any[]
      const result: Module[] = []
      
      for (const m of modules) {
        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('*')
          .eq('module_id', m.id)
          .order('order_index', { ascending: true })
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lessons = (lessonsData || []) as any[]
        const lessonIds = lessons.map(l => l.id)
        
        let files: unknown[] = []
        if (lessonIds.length > 0) {
          const { data: filesData } = await supabase
            .from('lesson_files')
            .select('*')
            .in('lesson_id', lessonIds)
          files = (filesData || []) as unknown[]
        }
        
        result.push({
          id: m.id,
          courseId: m.course_id,
          title: m.title,
          description: m.description,
          order: m.order_index,
          isFree: m.is_free,
          isLocked: m.is_locked,
          lessons: lessons.map(l => ({
            id: l.id,
            moduleId: l.module_id,
            title: l.title,
            description: l.description,
            content: l.content,
            type: l.type as Lesson['type'],
            duration: l.duration,
            order: l.order_index,
            audioUrl: l.audio_url,
            videoUrl: l.video_url,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            materials: (files as any[])
              .filter(f => f.lesson_id === l.id)
              .map(f => ({
                id: f.id,
                name: f.name,
                url: f.url,
                fileType: f.file_type,
                fileSize: f.file_size
              })),
            isCompleted: false
          }))
        })
      }
      
      return result
    } catch {
      return []
    }
  }
  
  private async getSupabaseLessonById(lessonId: string): Promise<Lesson | null> {
    const supabase = getSupabase()
    if (!supabase) return this.getMockLessonById(lessonId)
    
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .maybeSingle()
      
      if (error || !data) return null
      
      const { data: filesData } = await supabase
        .from('lesson_files')
        .select('*')
        .eq('lesson_id', lessonId)
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const l = data as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const files = (filesData || []) as any[]
      
      return {
        id: l.id,
        moduleId: l.module_id,
        title: l.title,
        description: l.description,
        content: l.content,
        type: l.type as Lesson['type'],
        duration: l.duration,
        order: l.order_index,
        audioUrl: l.audio_url,
        videoUrl: l.video_url,
        materials: files.map(f => ({
          id: f.id,
          name: f.name,
          url: f.url,
          fileType: f.file_type,
          fileSize: f.file_size
        })),
        isCompleted: false
      }
    } catch {
      return null
    }
  }
  
  private async getSupabaseProgress(userId: string, courseId: string): Promise<UserProgress[]> {
    const supabase = getSupabase()
    if (!supabase) return this.getMockProgress(userId, courseId)
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
      
      if (error || !data) return []
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data as any[]).map(p => ({
        lessonId: p.lesson_id,
        isCompleted: p.is_completed,
        completedAt: p.completed_at,
        progressPercent: p.progress_percent
      }))
    } catch {
      return []
    }
  }
  
  private async markSupabaseLessonComplete(userId: string, courseId: string, lessonId: string): Promise<boolean> {
    const supabase = getSupabase()
    if (!supabase) return this.markMockLessonComplete(userId, courseId, lessonId)
    
    try {
      // Use raw fetch to bypass TypeScript strict typing
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      const response = await fetch(`${supabaseUrl}/rest/v1/user_progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId,
          is_completed: true,
          completed_at: new Date().toISOString(),
          progress_percent: 100
        })
      })
      
      return response.ok
    } catch {
      return false
    }
  }
}

// Export singleton
export const dataLayer = new DataLayer()
