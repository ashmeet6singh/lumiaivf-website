import React, { createContext, useContext, useState } from 'react'
import { en } from '../i18n/en'
import { pl } from '../i18n/pl'

type Language = 'en' | 'pl'
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en')

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
