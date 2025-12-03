import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      
      setTheme: (theme) => {
        set({ theme })
        updateDocumentTheme(theme)
      },
      
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light'
        updateDocumentTheme(newTheme)
        return { theme: newTheme }
      }),
    }),
    {
      name: 'objavuj-ai-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          updateDocumentTheme(state.theme)
        }
      },
    }
  )
)

function updateDocumentTheme(theme: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }
}

export default useThemeStore
