import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getEffectiveDataSource } from '@/lib/config'
import { getSupabase } from '@/lib/supabase'
import { getMockUser } from '@/lib/mockData'

export interface User {
  id: string
  name: string
  email: string
  photo: string | null
  preferredLanguage?: 'sk' | 'cz' | 'en'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>
  loginWithMock: () => void
  logout: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  updateUser: (updates: Partial<User>) => void
  checkAuth: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Login with email/password
      login: async (email: string, password: string): Promise<boolean> => {
        const dataSource = getEffectiveDataSource()
        set({ isLoading: true, error: null })
        
        try {
          if (dataSource === 'supabase') {
            const supabase = getSupabase()
            if (!supabase) {
              throw new Error('Supabase not configured')
            }
            
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password
            })
            
            if (error) throw error
            
            if (data.user) {
              // Fetch profile
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', data.user.id)
                .maybeSingle()
              
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const profile = profileData as any
              
              set({
                user: {
                  id: data.user.id,
                  name: profile?.full_name || data.user.email?.split('@')[0] || 'User',
                  email: data.user.email || '',
                  photo: profile?.avatar_url || null,
                  preferredLanguage: profile?.preferred_language || 'sk'
                },
                isAuthenticated: true,
                isLoading: false
              })
              return true
            }
          } else {
            // Mock login - simulate API call
            await new Promise(resolve => setTimeout(resolve, 500))
            
            // For demo, accept any email/password
            if (email && password) {
              const mockUser = getMockUser()
              set({
                user: {
                  id: mockUser.id,
                  name: mockUser.fullName,
                  email: email,
                  photo: mockUser.avatarUrl,
                  preferredLanguage: mockUser.preferredLanguage
                },
                isAuthenticated: true,
                isLoading: false
              })
              return true
            }
          }
          
          set({ isLoading: false })
          return false
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed'
          set({ error: message, isLoading: false })
          return false
        }
      },
      
      // Quick login with mock user (for demo)
      loginWithMock: () => {
        const mockUser = getMockUser()
        set({
          user: {
            id: mockUser.id,
            name: mockUser.fullName,
            email: mockUser.email,
            photo: mockUser.avatarUrl,
            preferredLanguage: mockUser.preferredLanguage
          },
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      },
      
      // Logout
      logout: async () => {
        const dataSource = getEffectiveDataSource()
        set({ isLoading: true })
        
        try {
          if (dataSource === 'supabase') {
            const supabase = getSupabase()
            if (supabase) {
              await supabase.auth.signOut()
            }
          }
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          })
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          })
        }
      },
      
      // Sign up new user
      signUp: async (email: string, password: string, name: string): Promise<boolean> => {
        const dataSource = getEffectiveDataSource()
        set({ isLoading: true, error: null })
        
        try {
          if (dataSource === 'supabase') {
            const supabase = getSupabase()
            if (!supabase) {
              throw new Error('Supabase not configured')
            }
            
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: { full_name: name },
                emailRedirectTo: `${window.location.origin}/auth/callback`
              }
            })
            
            if (error) throw error
            
            if (data.user) {
              // Create profile using raw fetch to bypass TypeScript strict typing
              const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
              const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
              
              await fetch(`${supabaseUrl}/rest/v1/profiles`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'apikey': supabaseKey,
                  'Authorization': `Bearer ${supabaseKey}`,
                  'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                  user_id: data.user.id,
                  email,
                  full_name: name,
                  preferred_language: 'sk'
                })
              })
              
              set({
                user: {
                  id: data.user.id,
                  name,
                  email,
                  photo: null,
                  preferredLanguage: 'sk'
                },
                isAuthenticated: true,
                isLoading: false
              })
              return true
            }
          } else {
            // Mock sign up
            await new Promise(resolve => setTimeout(resolve, 500))
            
            const mockUser = getMockUser()
            set({
              user: {
                id: `user-${Date.now()}`,
                name,
                email,
                photo: mockUser.avatarUrl,
                preferredLanguage: 'sk'
              },
              isAuthenticated: true,
              isLoading: false
            })
            return true
          }
          
          set({ isLoading: false })
          return false
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Sign up failed'
          set({ error: message, isLoading: false })
          return false
        }
      },
      
      // Update user data
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
      
      // Check current auth state
      checkAuth: async () => {
        const dataSource = getEffectiveDataSource()
        
        if (dataSource === 'supabase') {
          const supabase = getSupabase()
          if (!supabase) return
          
          set({ isLoading: true })
          
          try {
            const { data: { user } } = await supabase.auth.getUser()
            
            if (user) {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle()
              
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const profile = profileData as any
              
              set({
                user: {
                  id: user.id,
                  name: profile?.full_name || user.email?.split('@')[0] || 'User',
                  email: user.email || '',
                  photo: profile?.avatar_url || null,
                  preferredLanguage: profile?.preferred_language || 'sk'
                },
                isAuthenticated: true,
                isLoading: false
              })
            } else {
              set({ isLoading: false })
            }
          } catch {
            set({ isLoading: false })
          }
        }
        // For mock mode, the persisted state is sufficient
      },
      
      // Clear error
      clearError: () => set({ error: null })
    }),
    {
      name: 'objavuj-ai-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export default useAuthStore
