import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function LumiaLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="lmOrb" cx="42%" cy="34%" r="80%">
          <stop offset="0%" stop-color="#FFD9A8"></stop>
          <stop offset="40%" stop-color="#E78FA6"></stop>
          <stop offset="74%" stop-color="#B1577C"></stop>
          <stop offset="100%" stop-color="#943E63"></stop>
        </radialGradient>
      </defs>
      <g transform="translate(0 2)">
        <path d="M10 32.5 C 19 49 43 49 52 32.5" stroke="#943E63" stroke-width="5" stroke-linecap="round" opacity="0.92"></path>
        <circle cx="31" cy="31" r="11.5" fill="url(#lmOrb)"></circle>
      </g>
    </svg>
  )
}

interface NavProps {
  onGoHome: () => void
  onGoContact: () => void
  onGoArticles: () => void
}

export default function Nav({ onGoHome, onGoContact, onGoArticles }: NavProps) {
  const { language, t, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const atTop = !scrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md shadow-nav'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md"
        >
          <LumiaLogo />
          <span
            className={`font-display font-semibold text-xl tracking-tight transition-colors duration-300 ${
              atTop ? 'text-white' : 'text-on-surface'
            }`}
          >
            {t.nav.logo}
          </span>
        </button>

        {/* Right side: Articles + Contact + Language */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoArticles}
            className={`hidden sm:flex items-center px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
              atTop
                ? 'text-white/80 hover:text-white'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t.nav.articles}
          </button>
          <button
            onClick={onGoContact}
            className={`hidden sm:flex items-center px-4 py-1.5 text-sm font-semibold rounded-full border transition-all duration-200 ${
              atTop
                ? 'border-white/40 text-white hover:bg-white/10'
                : 'border-primary/30 text-primary hover:bg-primary/10'
            }`}
          >
            {t.nav.contact}
          </button>

          {/* Language toggle */}
          <div
            className={`flex items-center rounded-full p-1 gap-0.5 transition-colors duration-300 ${
              atTop ? 'bg-white/15' : 'bg-surface-container'
            }`}
          >
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                language === 'en'
                  ? atTop
                    ? 'bg-white text-primary shadow-sm'
                    : 'bg-primary text-on-primary shadow-sm'
                  : atTop
                  ? 'text-white/70 hover:text-white'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('pl')}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                language === 'pl'
                  ? atTop
                    ? 'bg-white text-primary shadow-sm'
                    : 'bg-primary text-on-primary shadow-sm'
                  : atTop
                  ? 'text-white/70 hover:text-white'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              PL
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
