import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { Cookie } from 'lucide-react'

interface CookieBannerProps {
  onOpenSettings: () => void
}

export default function CookieBanner({ onOpenSettings }: CookieBannerProps) {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  const checkConsent = () => {
    try {
      const consent = localStorage.getItem('lumia_cookie_consent')
      if (!consent) {
        // Wait a second for smooth transition on initial load
        const timer = setTimeout(() => setIsVisible(true), 1200)
        return () => clearTimeout(timer)
      } else {
        setIsVisible(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    checkConsent()

    // Listen to changes from compliance modals
    window.addEventListener('lumia_cookie_update', checkConsent)
    return () => {
      window.removeEventListener('lumia_cookie_update', checkConsent)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('lumia_cookie_consent', JSON.stringify({
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    localStorage.setItem('lumia_cookie_consent', JSON.stringify({
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-40 bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-black/5 flex flex-col gap-4"
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-2xl bg-[#7B5EA7]/10 text-[#7B5EA7] flex-shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-[#1C1C19] text-sm">
                {t.footer.cookieBanner.title}
              </h3>
              <p className="text-xs text-[#1C1C19]/75 leading-relaxed">
                {t.footer.cookieBanner.desc}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-end gap-2 text-xs font-semibold pt-1 border-t border-black/5">
            <button
              onClick={onOpenSettings}
              className="px-3.5 py-2 text-[#1C1C19]/60 hover:text-[#1C1C19] rounded-xl hover:bg-black/5 transition-all"
            >
              {t.footer.cookieBanner.settings}
            </button>
            <button
              onClick={handleRejectAll}
              className="px-3.5 py-2 text-[#1C1C19]/70 hover:text-[#1C1C19] border border-black/10 hover:border-black/20 rounded-xl transition-all"
            >
              {t.footer.cookieBanner.rejectAll}
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-white bg-[#7B5EA7] hover:bg-[#684C93] rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              {t.footer.cookieBanner.acceptAll}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
