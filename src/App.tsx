import { useEffect } from 'react'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeatureSection from './components/FeatureSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'

function Site() {
  const { language, t } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <div className="bg-background text-on-surface">
      <Nav />
      <main>
        <Hero />
        {t.features.map((feature, index) => (
          <FeatureSection
            key={feature.id}
            feature={feature}
            reverse={index % 2 !== 0}
            featureIndex={index}
          />
        ))}
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}
