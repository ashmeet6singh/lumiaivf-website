import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EmailFormProps {
  variant: 'hero' | 'cta'
  placeholder: string
  buttonLabel: string
  thankyouMessage: string
}

export default function EmailForm({ variant, placeholder, buttonLabel, thankyouMessage }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
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
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
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
              className={`w-full rounded-xl px-4 py-3.5 text-base outline-none transition-all duration-200 ${
                isHero
                  ? 'bg-white/20 border border-white/40 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/70'
                  : 'bg-white/10 border border-white/20 text-inverse-on-surface placeholder:text-inverse-on-surface/50 focus:bg-white/15 focus:border-white/40'
              } ${error ? 'border-red-400' : ''}`}
            />
            {error && (
              <span className={`text-xs ${isHero ? 'text-white/80' : 'text-red-300'}`}>{error}</span>
            )}
          </div>
          <button
            type="submit"
            className={`shrink-0 rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-200 active:scale-95 ${
              isHero
                ? 'bg-white text-primary hover:bg-white/90 shadow-lg'
                : 'bg-primary text-on-primary hover:bg-primary/90 shadow-lg'
            }`}
          >
            {buttonLabel}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
