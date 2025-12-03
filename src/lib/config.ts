// Data source configuration
// Switch between 'mock' and 'supabase' data sources
export const DATA_SOURCE: 'mock' | 'supabase' = 
  (import.meta.env.VITE_DATA_SOURCE as 'mock' | 'supabase') || 'mock'

// Supabase configuration (only used when DATA_SOURCE = 'supabase')
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Feature flags
export const FEATURES = {
  // Enable real authentication (requires Supabase)
  realAuth: DATA_SOURCE === 'supabase',
  // Enable AI assistant API calls (requires OpenAI key)
  realAI: Boolean(import.meta.env.VITE_OPENAI_API_KEY),
  // Enable real-time features
  realtime: DATA_SOURCE === 'supabase',
}

// API configuration
export const API_CONFIG = {
  // OpenAI API key for AI assistant
  openaiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  // AI model to use
  aiModel: import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini',
}

// Check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

// Get effective data source (falls back to mock if Supabase not configured)
export const getEffectiveDataSource = (): 'mock' | 'supabase' => {
  if (DATA_SOURCE === 'supabase' && !isSupabaseConfigured()) {
    console.warn('Supabase credentials not configured, falling back to mock data')
    return 'mock'
  }
  return DATA_SOURCE
}
