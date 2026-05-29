import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { Mail, ChevronRight, Info, Clock, Heart, Send, CheckCircle } from 'lucide-react'

interface ContactPageProps {
  onGoHome: () => void
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export default function ContactPage({ onGoHome }: ContactPageProps) {
  const { t } = useLanguage()

  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('general')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Something went wrong. Please try again.')
      }
      setIsSubmitted(true)
      setName('')
      setEmail('')
      setSubject('general')
      setMessage('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] pt-24 pb-16">
      {/* Page Header (Mauve & Lavender theme background) */}
      <section className="relative overflow-hidden bg-primary-container/40 border-b border-primary/5 py-12 px-6">
        {/* Soft radial bloom behind the title */}
        <div
          className="absolute right-0 top-0 w-96 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(123,94,167,0.08), transparent)' }}
        />

        <div className="max-w-6xl mx-auto relative flex flex-col gap-4">
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-[#1C1C19]/45 select-none">
            <button
              onClick={onGoHome}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {t.contact.breadcrumbHome}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#1C1C19]/30" />
            <span className="text-[#1C1C19]/70">{t.contact.breadcrumbActive}</span>
          </nav>

          <div className="space-y-3">
            <motion.h1
              {...fadeUp(0.1)}
              className="font-display font-bold text-[#1C1C19] leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
            >
              {t.contact.title}
            </motion.h1>
            <motion.p
              {...fadeUp(0.15)}
              className="text-[#1C1C19]/70 text-lg leading-relaxed max-w-2xl"
            >
              {t.contact.tagline}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct email & guidelines */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <motion.a
              {...fadeUp(0.2)}
              href="mailto:hello@lumiaivf.com"
              className="group flex items-center gap-4 bg-white border border-black/5 hover:border-primary/20 rounded-3xl p-6 shadow-card hover:shadow-lg transition-all duration-300 block text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-semibold text-primary/80">
                  {t.contact.emailCardTitle}
                </span>
                <p className="text-base md:text-lg font-bold text-[#1C1C19] group-hover:text-primary transition-colors truncate mt-1">
                  hello@lumiaivf.com
                </p>
              </div>
            </motion.a>

            {/* General Info Guides */}
            <motion.div
              {...fadeUp(0.25)}
              className="space-y-4"
            >
              {/* Response Time Card */}
              <div className="flex gap-3.5 p-5 bg-white border border-black/5 rounded-3xl shadow-sm">
                <div className="p-1.5 rounded-full bg-secondary-container text-on-secondary-container flex-shrink-0 self-start">
                  <Clock className="w-4 h-4" />
                </div>
                <p className="text-sm text-[#1C1C19]/75 font-medium leading-relaxed">
                  {t.contact.responseTime}
                </p>
              </div>

              {/* Technical Help Card */}
              <div className="flex gap-3.5 p-5 bg-white border border-black/5 rounded-3xl shadow-sm">
                <div className="p-1.5 rounded-full bg-[#B8D4F5]/25 text-[#00325A] flex-shrink-0 self-start">
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-sm text-[#1C1C19]/75 font-medium leading-relaxed">
                  {t.contact.appIssuesNote}
                </p>
              </div>

              {/* Empathetic Listening Ear Card */}
              <div className="flex gap-3.5 p-6 bg-primary/5 border border-primary/10 rounded-3xl shadow-sm">
                <div className="p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0 self-start">
                  <Heart className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-sm text-[#1C1C19]">
                    {t.contact.emotionalNoteTitle}
                  </h4>
                  <p className="text-xs text-[#1C1C19]/70 leading-relaxed font-medium">
                    {t.contact.emotionalNoteBody}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Custom Message Form */}
          <div className="lg:col-span-7">
            <motion.div
              {...fadeUp(0.3)}
              className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-card"
            >
              <h2 className="font-display font-semibold text-xl text-[#1C1C19] mb-6">
                {t.contact.formCardTitle}
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-tertiary-container/30 border border-tertiary/20 rounded-2xl flex flex-col items-center text-center gap-3.5 text-[#002111]"
                >
                  <div className="w-12 h-12 rounded-full bg-tertiary-container text-[#7A9E7E] flex items-center justify-center border border-[#7A9E7E]/20">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold max-w-sm">
                    {t.contact.formSuccess}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-primary hover:text-[#684C93] underline transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-[#1C1C19]/60 select-none">
                      {t.contact.formName}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anna"
                      className="w-full px-4 py-3 bg-[#FAF6F1] border border-[#DDD9D5] hover:border-[#88726C]/30 focus:border-primary focus:bg-white rounded-xl text-sm text-[#1C1C19] placeholder-[#1C1C19]/35 outline-none transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-[#1C1C19]/60 select-none">
                      {t.contact.formEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. anna@example.com"
                      className="w-full px-4 py-3 bg-[#FAF6F1] border border-[#DDD9D5] hover:border-[#88726C]/30 focus:border-primary focus:bg-white rounded-xl text-sm text-[#1C1C19] placeholder-[#1C1C19]/35 outline-none transition-all"
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-[#1C1C19]/60 select-none">
                      {t.contact.formSubject}
                    </label>
                    <div className="relative">
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF6F1] border border-[#DDD9D5] hover:border-[#88726C]/30 focus:border-primary focus:bg-white rounded-xl text-sm text-[#1C1C19] outline-none transition-all cursor-pointer appearance-none"
                      >
                        <option value="general">{t.contact.formSubjects.general}</option>
                        <option value="feedback">{t.contact.formSubjects.feedback}</option>
                        <option value="waitlist">{t.contact.formSubjects.waitlist}</option>
                        <option value="partnership">{t.contact.formSubjects.partnership}</option>
                        <option value="other">{t.contact.formSubjects.other}</option>
                      </select>
                      {/* Custom dropdown caret indicator */}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#1C1C19]/40">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-[#1C1C19]/60 select-none">
                      {t.contact.formMessage}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full px-4 py-3 bg-[#FAF6F1] border border-[#DDD9D5] hover:border-[#88726C]/30 focus:border-primary focus:bg-white rounded-xl text-sm text-[#1C1C19] placeholder-[#1C1C19]/35 outline-none transition-all resize-y"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 font-medium">{error}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-[#684C93] disabled:bg-primary/50 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed select-none text-sm"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.formSubmit}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  )
}
