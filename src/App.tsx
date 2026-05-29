import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeatureSection from './components/FeatureSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import ComplianceModals from './components/ComplianceModals'
import CookieBanner from './components/CookieBanner'
import ContactPage from './components/ContactPage'
import ArticlesIndex from './components/ArticlesIndex'
import ArticlePage from './components/ArticlePage'
import RouteHead from './components/RouteHead'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Site() {
  const { language, t } = useLanguage()
  const [activeModal, setActiveModal] = useState<'privacy' | 'disclaimer' | 'cookies' | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const onGoHome = () => navigate('/')
  const onGoContact = () => navigate('/contact')
  const onGoToPage = (page: 'home' | 'contact' | 'articles') => {
    if (page === 'home') navigate('/')
    else if (page === 'contact') navigate('/contact')
    else if (page === 'articles') navigate('/articles')
  }

  return (
    <div className="bg-background text-on-surface relative">
      <ScrollToTop />
      <RouteHead />
      <Nav onGoHome={onGoHome} onGoContact={onGoContact} onGoArticles={() => navigate('/articles')} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
          <Route path="/contact" element={<ContactPage onGoHome={onGoHome} />} />
          <Route path="/articles" element={<ArticlesIndex />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Routes>
      </main>

      <Footer
        onOpenModal={(modal) => setActiveModal(modal)}
        onGoToPage={onGoToPage}
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
