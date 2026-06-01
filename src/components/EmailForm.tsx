import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

interface EmailFormProps {
  variant: 'hero' | 'cta'
  placeholder: string
  buttonLabel: string
  thankyouMessage: string
  betaCheckboxLabel?: string
  urgencyLine?: string
}

function readUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const val = params.get(key)
    if (val) utm[key] = val
  }
  return utm
}

export default function EmailForm({
  variant,
  placeholder,
  buttonLabel,
  thankyouMessage,
  betaCheckboxLabel,
  urgencyLine,
}: EmailFormProps) {
  const { language } = useLanguage()
  const [email, setEmail] = useState('')
  const [isBetaCandidate, setIsBetaCandidate] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  useEffect(() => {
    setUtmParams(readUtmParams())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          lang: language,
          is_beta_candidate: isBetaCandidate,
          ...utmParams,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Something went wrong. Please try again.')
      }
      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isHero = variant === 'hero'

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.p
          key="thankyou"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-base font-medium ${isHero ? 'text-white' : 'text-inverse-on-surface'}`}
        >
          {thankyouMessage}
        </motion.p>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-3 w-full max-w-md"
        >
          {/* Email + button row */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                placeholder={placeholder}
                aria-label={placeholder}
                disabled={loading}
                className={`w-full rounded-xl px-4 py-3.5 text-base outline-none transition-all duration-200 disabled:opacity-60 ${
                  isHero
                    ? 'bg-white/20 border border-white/45 text-white placeholder:text-white/70 focus:bg-white/28 focus:border-white/75'
                    : 'bg-white/[0.12] border border-white/35 text-inverse-on-surface placeholder:text-inverse-on-surface/65 focus:bg-white/[0.18] focus:border-white/55'
                } ${error ? 'border-red-400' : ''}`}
              />
              {error && (
                <span className={`text-xs ${isHero ? 'text-white/80' : 'text-red-300'}`}>{error}</span>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`shrink-0 rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isHero
                  ? 'bg-white text-primary hover:bg-white/90 shadow-lg focus-visible:ring-white focus-visible:ring-offset-transparent'
                  : 'bg-primary text-on-primary hover:bg-primary/90 shadow-lg focus-visible:ring-primary focus-visible:ring-offset-inverse-surface'
              }`}
            >
              {loading ? 'Sending…' : buttonLabel}
            </button>
          </div>

          {/* Beta opt-in checkbox */}
          {betaCheckboxLabel && (
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isBetaCandidate}
                onChange={e => setIsBetaCandidate(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/40 bg-white/20 accent-white checked:accent-white cursor-pointer"
              />
              <span
                className="text-sm leading-snug"
                style={{ color: isHero ? 'rgba(255,255,255,0.82)' : 'rgba(244,240,235,0.75)', fontSize: '14px' }}
              >
                {betaCheckboxLabel}
              </span>
            </label>
          )}

          {/* Urgency micro-copy */}
          {urgencyLine && (
            <p
              className="text-xs"
              style={{ color: isHero ? 'rgba(255,255,255,0.55)' : 'rgba(244,240,235,0.5)', fontSize: '13px' }}
            >
              {urgencyLine}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  )
}
