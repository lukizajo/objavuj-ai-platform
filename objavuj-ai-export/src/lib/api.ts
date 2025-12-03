/**
 * API Integration Layer
 * 
 * This file serves as a placeholder for future API integrations:
 * - Supabase (Auth, Database, Storage)
 * - OpenAI (Chat, Completions)
 * 
 * To integrate Supabase:
 * 1. Install: pnpm add @supabase/supabase-js
 * 2. Create .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * 3. Initialize client below
 * 
 * To integrate OpenAI:
 * 1. Set up Edge Function or Backend API to handle OpenAI requests
 * 2. Store API key securely (never in frontend)
 */

// ============================================
// SUPABASE INTEGRATION (PLACEHOLDER)
// ============================================

// Uncomment and configure when ready to integrate Supabase:
/*
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Database helpers
export const getCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const getCourseById = async (courseId: string) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*, modules(*)')
    .eq('id', courseId)
    .single()
  return { data, error }
}

export const getUserProgress = async (userId: string, courseId: string) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
  return { data, error }
}

export const updateLessonProgress = async (
  userId: string, 
  lessonId: string, 
  isCompleted: boolean
) => {
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null
    })
  return { data, error }
}
*/

// ============================================
// OPENAI CHAT INTEGRATION (PLACEHOLDER)
// ============================================

// The AI chatbot should be implemented via a secure backend/edge function
// Never expose OpenAI API keys in the frontend

/*
// Example: Calling your Supabase Edge Function for AI chat
export const sendChatMessage = async (message: string, context?: string) => {
  const response = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      message, 
      context,
      courseId: 'objavuj-ai' 
    })
  })
  
  if (!response.ok) {
    throw new Error('Failed to get AI response')
  }
  
  return response.json()
}

// Example: Supabase Edge Function for AI chat
// Create file: supabase/functions/ai-chat/index.ts
//
// import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// import OpenAI from "https://deno.land/x/openai@v4.28.0/mod.ts"
// 
// serve(async (req) => {
//   const { message, context, courseId } = await req.json()
//   
//   const openai = new OpenAI({
//     apiKey: Deno.env.get('OPENAI_API_KEY'),
//   })
//   
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4-turbo-preview",
//     messages: [
//       { 
//         role: "system", 
//         content: `You are an AI learning assistant for the OBJAVUJ-AI course. 
//                   Help students understand AI concepts. Current context: ${context || 'general'}` 
//       },
//       { role: "user", content: message }
//     ],
//   })
//   
//   return new Response(
//     JSON.stringify({ response: completion.choices[0].message.content }),
//     { headers: { "Content-Type": "application/json" } }
//   )
// })
*/

// ============================================
// LOCAL DATA FETCHERS (CURRENT IMPLEMENTATION)
// ============================================

import coursesData from '../data/courses.json'
import modulesData from '../data/modules.json'
import userData from '../data/user.json'

export interface Course {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  duration: string
  difficulty: string
  modulesCount: number
  lessonsCount: number
  studentsCount: number
  rating: number
  price: number
  currency: string
  isFeatured: boolean
  skills: string[]
  instructor: {
    name: string
    role: string
    avatar: string
  }
}

export interface Lesson {
  id: string
  order: number
  title: string
  description: string
  duration: string
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'project'
  isCompleted: boolean
  applications?: string[]  // AI tools used in this lesson (e.g., 'chatgpt', 'claude', 'midjourney')
}

export interface Module {
  id: string
  order: number
  title: string
  description: string
  duration: string
  lessonsCount: number
  isFree: boolean
  isLocked: boolean
  lessons: Lesson[]
}

export interface UserBadge {
  id: string
  name: string
  icon: string
  earnedAt: string
}

export interface EnrolledCourse {
  courseId: string
  enrolledAt: string
  progress: number
  currentModule: string
  currentLesson: string
  completedLessons: string[]
  lastAccessedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  joinedAt: string
  xp: number
  level: number
  badges: UserBadge[]
  enrolledCourses: EnrolledCourse[]
}

// Fetch all courses
export const fetchCourses = async (): Promise<Course[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return coursesData.courses as Course[]
}

// Fetch single course by slug
export const fetchCourseBySlug = async (slug: string): Promise<Course | null> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  const course = coursesData.courses.find(c => c.slug === slug)
  return course as Course || null
}

// Fetch modules for a course
export const fetchModules = async (courseId: string): Promise<Module[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  if (modulesData.courseId === courseId) {
    return modulesData.modules as Module[]
  }
  return []
}

// Fetch single module
export const fetchModule = async (moduleId: string): Promise<Module | null> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  const module = modulesData.modules.find(m => m.id === moduleId)
  return module as Module || null
}

// Fetch single lesson
export const fetchLesson = async (lessonId: string): Promise<Lesson | null> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  for (const module of modulesData.modules) {
    const lesson = module.lessons.find(l => l.id === lessonId)
    if (lesson) return lesson as Lesson
  }
  return null
}

// Fetch current user
export const fetchCurrentUser = async (): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return userData.user as User
}

// Get user's progress for a course
export const getUserCourseProgress = async (userId: string, courseId: string) => {
  const user = await fetchCurrentUser()
  if (!user) return null
  return user.enrolledCourses.find(ec => ec.courseId === courseId) || null
}
