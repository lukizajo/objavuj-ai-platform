import { useLanguageStore } from '@/stores/languageStore'
import { getTranslation } from '@/i18n/translations'

export function useTranslation() {
  const { language, setLanguage } = useLanguageStore()
  
  const t = (key: string): string => {
    return getTranslation(language, key)
  }
  
  return { t, language, setLanguage }
}

export default useTranslation
