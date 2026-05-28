import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { Shield, BookOpen, Cookie, X } from 'lucide-react'

interface ComplianceModalsProps {
  activeModal: 'privacy' | 'disclaimer' | 'cookies' | null
  onClose: () => void
}

export default function ComplianceModals({ activeModal, onClose }: ComplianceModalsProps) {
  const { t } = useLanguage()

  // Cookie states
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  // Sync state with localStorage when open
  useEffect(() => {
    if (activeModal === 'cookies') {
      try {
        const stored = localStorage.getItem('lumia_cookie_consent')
        if (stored) {
          const parsed = JSON.parse(stored)
          setAnalytics(parsed.analytics !== false)
          setMarketing(parsed.marketing !== false)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [activeModal])

  const saveCookieConsent = (newConsent: { analytics: boolean; marketing: boolean }) => {
    localStorage.setItem('lumia_cookie_consent', JSON.stringify({
      ...newConsent,
      timestamp: new Date().toISOString()
    }))
    // Trigger custom event so CookieBanner hears the update
    window.dispatchEvent(new Event('lumia_cookie_update'))
    onClose()
  }

  const handleSave = () => {
    saveCookieConsent({ analytics, marketing })
  }

  const handleAcceptAll = () => {
    saveCookieConsent({ analytics: true, marketing: true })
  }

  const handleRejectAll = () => {
    saveCookieConsent({ analytics: false, marketing: false })
  }

  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#31302D]/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-[#FAF6F1] rounded-3xl overflow-hidden shadow-2xl border border-black/5 max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 bg-white">
              <div className="flex items-center gap-2.5">
                {activeModal === 'privacy' && <Shield className="w-5 h-5 text-[#7B5EA7]" />}
                {activeModal === 'disclaimer' && <BookOpen className="w-5 h-5 text-[#7B5EA7]" />}
                {activeModal === 'cookies' && <Cookie className="w-5 h-5 text-[#7B5EA7]" />}
                <h2 className="font-display font-semibold text-lg text-[#1C1C19]">
                  {activeModal === 'privacy' && t.footer.privacyModal.title}
                  {activeModal === 'disclaimer' && t.footer.disclaimerModal.title}
                  {activeModal === 'cookies' && t.footer.cookieModal.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/5 text-[#1C1C19]/60 hover:text-[#1C1C19] transition-colors"
                aria-label={t.footer.privacyModal.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 text-[#1C1C19]/80 text-sm leading-relaxed space-y-5">
              {/* PRIVACY MODAL CONTENT */}
              {activeModal === 'privacy' && (
                <>
                  <p className="font-medium text-base text-[#1C1C19]">
                    {t.footer.privacyModal.intro}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm text-[#7B5EA7] mb-1">
                        {t.footer.privacyModal.section1Title}
                      </h3>
                      <p>{t.footer.privacyModal.section1Body}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#7B5EA7] mb-1">
                        {t.footer.privacyModal.section2Title}
                      </h3>
                      <p>{t.footer.privacyModal.section2Body}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#7B5EA7] mb-1">
                        {t.footer.privacyModal.section3Title}
                      </h3>
                      <p>{t.footer.privacyModal.section3Body}</p>
                    </div>
                  </div>
                </>
              )}

              {/* DISCLAIMER MODAL CONTENT */}
              {activeModal === 'disclaimer' && (
                <div className="space-y-4">
                  <p>{t.footer.disclaimerModal.body1}</p>
                  <div className="p-4 bg-[#7B5EA7]/5 rounded-2xl border border-[#7B5EA7]/10 text-[#7B5EA7] font-medium italic">
                    {t.footer.disclaimerModal.body2}
                  </div>
                </div>
              )}

              {/* COOKIES MODAL CONTENT */}
              {activeModal === 'cookies' && (
                <div className="space-y-6">
                  <p className="text-sm">{t.footer.cookieModal.desc}</p>
                  
                  <div className="space-y-4">
                    {/* Essential Toggles */}
                    <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white border border-black/5 shadow-sm">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm text-[#1C1C19]">{t.footer.cookieModal.essentialTitle}</h4>
                        <p className="text-xs text-[#1C1C19]/60">{t.footer.cookieModal.essentialDesc}</p>
                      </div>
                      <div className="relative inline-flex items-center h-6 rounded-full w-11 bg-[#7B5EA7] opacity-60 cursor-not-allowed">
                        <span className="inline-block w-4 h-4 transform translate-x-6 rounded-full bg-white transition-transform" />
                      </div>
                    </div>

                    {/* Analytics Toggle */}
                    <label className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white border border-black/5 shadow-sm hover:border-[#7B5EA7]/20 transition-all cursor-pointer">
                      <div className="space-y-1 select-none">
                        <h4 className="font-semibold text-sm text-[#1C1C19]">{t.footer.cookieModal.analyticsTitle}</h4>
                        <p className="text-xs text-[#1C1C19]/60">{t.footer.cookieModal.analyticsDesc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={analytics}
                        onChange={(e) => setAnalytics(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="relative inline-flex items-center h-6 rounded-full w-11 bg-black/10 peer-checked:bg-[#7B5EA7] transition-all flex-shrink-0">
                        <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${analytics ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>

                    {/* Marketing Toggle */}
                    <label className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white border border-black/5 shadow-sm hover:border-[#7B5EA7]/20 transition-all cursor-pointer">
                      <div className="space-y-1 select-none">
                        <h4 className="font-semibold text-sm text-[#1C1C19]">{t.footer.cookieModal.marketingTitle}</h4>
                        <p className="text-xs text-[#1C1C19]/60">{t.footer.cookieModal.marketingDesc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={marketing}
                        onChange={(e) => setMarketing(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="relative inline-flex items-center h-6 rounded-full w-11 bg-black/10 peer-checked:bg-[#7B5EA7] transition-all flex-shrink-0">
                        <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${marketing ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 border-t border-black/5 bg-white flex flex-wrap gap-2.5 justify-end">
              {activeModal === 'cookies' ? (
                <>
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-xs font-semibold text-[#1C1C19]/70 hover:text-[#1C1C19] border border-black/10 hover:border-black/20 rounded-xl transition-all"
                  >
                    {t.footer.cookieModal.rejectAll}
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-xs font-semibold text-[#7B5EA7] hover:bg-[#7B5EA7]/5 rounded-xl transition-all border border-[#7B5EA7]/10"
                  >
                    {t.footer.cookieModal.save}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#7B5EA7] hover:bg-[#684C93] rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    {t.footer.cookieModal.acceptAll}
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#7B5EA7] hover:bg-[#684C93] rounded-xl transition-all shadow-sm"
                >
                  {activeModal === 'privacy' ? t.footer.privacyModal.close : t.footer.disclaimerModal.close}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
