import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function LumiaLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" fill="none" viewBox="0 0 48 46" aria-hidden="true">
      <path fill="#7B5EA7" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
    </svg>
  )
}

interface NavProps {
  onGoHome: () => void
}

export default function Nav({ onGoHome }: NavProps) {
  const { language, t, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          className="flex items-center gap-2.5 cursor-pointer text-left focus:outline-none"
        >
          <LumiaLogo />
          <span className="font-display font-semibold text-xl text-on-surface tracking-tight">
            {t.nav.logo}
          </span>
        </button>

        {/* Language toggle */}
        <div className="flex items-center bg-surface-container rounded-full p-1 gap-0.5">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
              language === 'en'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('pl')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
              language === 'pl'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            PL
          </button>
        </div>
      </div>
    </nav>
  )
}
