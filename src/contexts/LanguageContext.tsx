import React, { createContext, useContext, useState } from 'react'
import { en } from '../i18n/en'
import { pl } from '../i18n/pl'

export type Language = 'en' | 'pl'
type Strings = typeof en

interface LanguageContextType {
  language: Language
  t: Strings
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: en,
  setLanguage: () => {},
})

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage = 'en',
}) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = language === 'pl' ? pl : en

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
