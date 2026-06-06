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
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Defer a tick so the target (e.g. the hero #waitlist form) is mounted
      // after a cross-route navigation before we scroll to it.
      const id = hash.slice(1)
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Site() {
  const { language, t } = useLanguage()
  const [activeModal, setActiveModal] = useState<'privacy' | 'disclaimer' | 'cookies' | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const articlesPath = language === 'pl' ? '/pl/artykuly' : '/articles'
  const onGoHome = () => navigate('/')
  const onGoContact = () => navigate('/contact')
  const onGoToPage = (page: 'home' | 'contact' | 'articles') => {
    if (page === 'home') navigate('/')
    else if (page === 'contact') navigate('/contact')
    else if (page === 'articles') navigate(articlesPath)
  }

  return (
    <div className="bg-background text-on-surface relative">
      <ScrollToTop />
      <RouteHead />
      <Nav onGoHome={onGoHome} onGoContact={onGoContact} onGoArticles={() => navigate(articlesPath)} />

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
          <Route path="/pl/artykuly" element={<ArticlesIndex />} />
          <Route path="/pl/artykuly/:slug" element={<ArticlePage />} />
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
  // Derive the initial language from the URL so /pl/* routes render in Polish
  // on the server (StaticRouter) AND on first client render (BrowserRouter),
  // avoiding an English flash / hydration mismatch. Must NOT read
  // navigator/localStorage here — those would diverge between server and client.
  const { pathname } = useLocation()
  const initialLanguage = pathname.startsWith('/pl') ? 'pl' : 'en'

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <Site />
    </LanguageProvider>
  )
}
