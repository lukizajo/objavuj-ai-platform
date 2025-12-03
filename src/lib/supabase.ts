import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config'

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          preferred_language: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      courses: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          image_url: string | null
          category: string | null
          difficulty: string
          duration: string | null
          lessons_count: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['courses']['Insert']>
      }
      modules: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          order_index: number
          is_free: boolean
          is_locked: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['modules']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['modules']['Insert']>
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          title: string
          description: string | null
          content: string | null
          type: string
          duration: string | null
          order_index: number
          audio_url: string | null
          video_url: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>
      }
      lesson_files: {
        Row: {
          id: string
          lesson_id: string
          name: string
          url: string
          file_type: string
          file_size: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lesson_files']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['lesson_files']['Insert']>
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          lesson_id: string
          is_completed: boolean
          completed_at: string | null
          progress_percent: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_progress']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>
      }
    }
  }
}

// Create Supabase client (only if configured)
let supabaseClient: SupabaseClient<Database> | null = null

export const getSupabase = (): SupabaseClient<Database> | null => {
  if (!isSupabaseConfigured()) {
    return null
  }
  
  if (!supabaseClient) {
    supabaseClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
  
  return supabaseClient
}

// Export for convenience (will be null if not configured)
export const supabase = isSupabaseConfigured() 
  ? createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null
