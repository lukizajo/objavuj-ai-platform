import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'sk' | 'cz' | 'en'

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'sk',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'objavuj-ai-language',
    }
  )
)

export default useLanguageStore
