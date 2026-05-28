import { useEffect, useState } from 'react'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeatureSection from './components/FeatureSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import ComplianceModals from './components/ComplianceModals'
import CookieBanner from './components/CookieBanner'
import ContactPage from './components/ContactPage'

function Site() {
  const { language, t } = useLanguage()
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home')
  const [activeModal, setActiveModal] = useState<'privacy' | 'disclaimer' | 'cookies' | null>(null)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const navigateTo = (page: 'home' | 'contact') => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="bg-background text-on-surface relative">
      <Nav onGoHome={() => navigateTo('home')} />
      
      <main>
        {currentPage === 'home' ? (
          <>
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
          </>
        ) : (
          <ContactPage onGoHome={() => navigateTo('home')} />
        )}
      </main>

      <Footer
        onOpenModal={(modal) => setActiveModal(modal)}
        onGoToPage={navigateTo}
      />

      {/* Compliance Modals (GDPR Privacy, Disclaimer, and Cookie Settings) */}
      <ComplianceModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* GDPR Consent Cookie Banner */}
      <CookieBanner onOpenSettings={() => setActiveModal('cookies')} />
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
