import { useLanguage } from '../contexts/LanguageContext'

function LumiaLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" fill="none" viewBox="0 0 48 46" aria-hidden="true">
      <path fill="#D0BCFF" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-inverse-surface border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <LumiaLogo />
            <span className="font-display font-semibold text-lg text-inverse-on-surface">
              {t.nav.logo}
            </span>
          </div>
          <p className="text-inverse-on-surface/50 text-sm max-w-xs">
            {t.footer.tagline}
          </p>
        </div>

        {/* Copyright */}
        <p className="text-inverse-on-surface/40 text-sm self-end">
          {t.footer.copyright}
        </p>

      </div>
    </footer>
  )
}
