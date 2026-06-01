import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import EmailForm from './EmailForm'
import HeroCluster from './HeroCluster'
import { WAITLIST_COUNT } from '../config/waitlist'

const fadeUp = (delay: number, reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
      }

function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`))
}

function waitlistNoun(count: number, lang: string): string {
  if (lang === 'pl') return count === 1 ? 'kobiety' : 'kobiet'
  return count === 1 ? 'woman' : 'women'
}

// TODO: re-enable counter at 50+ signups — replace earlyAccessLine with:
// {interpolate(t.hero.socialProof, { count: WAITLIST_COUNT, noun: waitlistNoun(WAITLIST_COUNT, language) })}
// Update WAITLIST_COUNT in src/config/waitlist.ts
void interpolate
void waitlistNoun
void WAITLIST_COUNT

export default function Hero() {
  const { t } = useLanguage()
  const reduced = useReducedMotion() ?? false

  return (
    <section
      id="waitlist"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20"
      style={{ background: 'linear-gradient(135deg, #7B5EA7 0%, #8B5CA0 45%, #994529 100%)' }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 items-center">

          {/* Text + form — order-1 on mobile so it renders above the cluster */}
          <div className="flex flex-col gap-4 md:gap-5 order-1 md:order-1">

            {/* Release pill */}
            <motion.div {...fadeUp(0.1, reduced)} className="inline-flex">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.04em',
                }}
              >
                {t.hero.releasePill}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.2, reduced)}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: '1.18', textWrap: 'balance' } as React.CSSProperties}
            >
              {t.hero.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.3, reduced)}
              className="text-white/90 text-lg leading-relaxed max-w-md"
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              {t.hero.subheadline}
            </motion.p>

            {/* Email form */}
            <motion.div {...fadeUp(0.4, reduced)}>
              <EmailForm
                variant="hero"
                placeholder={t.hero.emailPlaceholder}
                buttonLabel={t.hero.ctaButton}
                thankyouMessage={t.hero.thankyou}
                betaCheckboxLabel={t.hero.betaCheckboxLabel}
                urgencyLine={t.hero.urgencyLine}
              />
            </motion.div>

            {/* Beta offer block — below form so the CTA is unobstructed */}
            <motion.div
              {...fadeUp(0.55, reduced)}
              className="rounded-2xl p-4 max-w-md"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderLeft: '3px solid rgba(208,188,255,0.7)',
              }}
            >
              <p
                className="font-display font-semibold leading-snug mb-1.5"
                style={{ fontSize: '15px', color: '#EDE1FF' }}
              >
                {t.hero.betaBlockHeading}
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-body, DM Sans, sans-serif)' }}
              >
                {t.hero.betaBlockBody}
              </p>
            </motion.div>

          </div>

          {/* Layered product cluster — order-2 on mobile, scrolls into view below form */}
          <div className="order-2 md:order-2 flex justify-center mt-10 md:mt-0">
            <HeroCluster />
          </div>

        </div>
      </div>

      {/* Wave transition to light sections */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path d="M0 60 C240 20 480 0 720 0 C960 0 1200 20 1440 60 L1440 60 L0 60 Z" fill="#FAF6F1"/>
        </svg>
      </div>
    </section>
  )
}
