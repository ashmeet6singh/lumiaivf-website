import { useLanguage } from '../contexts/LanguageContext'

function LumiaLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="lmOrbFooter" cx="42%" cy="34%" r="80%">
          <stop offset="0%" stop-color="#FFD9A8"></stop>
          <stop offset="40%" stop-color="#E78FA6"></stop>
          <stop offset="74%" stop-color="#B1577C"></stop>
          <stop offset="100%" stop-color="#943E63"></stop>
        </radialGradient>
      </defs>
      <g transform="translate(0 2)">
        <path d="M10 32.5 C 19 49 43 49 52 32.5" stroke="#E78FA6" stroke-width="5" stroke-linecap="round" opacity="0.92"></path>
        <circle cx="31" cy="31" r="11.5" fill="url(#lmOrbFooter)"></circle>
      </g>
    </svg>
  )
}

interface FooterProps {
  onOpenModal: (modal: 'privacy' | 'disclaimer' | 'cookies') => void
  onGoToPage: (page: 'home' | 'contact' | 'articles') => void
}

export default function Footer({ onOpenModal, onGoToPage }: FooterProps) {
  const { language, t } = useLanguage()

  return (
    <footer className="bg-inverse-surface border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <button
            onClick={() => onGoToPage('home')}
            className="flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
          >
            <LumiaLogo />
            <span className="font-display font-semibold text-lg text-inverse-on-surface">
              {t.nav.logo}
            </span>
          </button>
          <p className="text-inverse-on-surface/65 text-sm max-w-xs text-center md:text-left">
            {t.footer.tagline}
          </p>
        </div>

        {/* Links & Copyright Column */}
        <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
          
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-inverse-on-surface/60">
            <button
              onClick={() => onGoToPage('contact')}
              className="hover:text-inverse-on-surface transition-colors cursor-pointer text-left"
            >
              {t.footer.links.contact}
            </button>
            {language !== 'pl' && (
              <button
                onClick={() => onGoToPage('articles')}
                className="hover:text-inverse-on-surface transition-colors cursor-pointer text-left"
              >
                {t.footer.links.articles}
              </button>
            )}
            <button
              onClick={() => onOpenModal('privacy')}
              className="hover:text-inverse-on-surface transition-colors cursor-pointer text-left"
            >
              {t.footer.links.privacy}
            </button>
            <button
              onClick={() => onOpenModal('disclaimer')}
              className="hover:text-inverse-on-surface transition-colors cursor-pointer text-left"
            >
              {t.footer.links.disclaimer}
            </button>
            <button
              onClick={() => onOpenModal('cookies')}
              className="hover:text-inverse-on-surface transition-colors cursor-pointer text-left"
            >
              {t.footer.links.cookies}
            </button>
          </nav>

          {/* Copyright */}
          <p className="text-inverse-on-surface/50 text-xs">
            {t.footer.copyright}
          </p>

        </div>

      </div>
    </footer>
  )
}
