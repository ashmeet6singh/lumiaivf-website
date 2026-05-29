import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import EmailForm from './EmailForm'
import HeroCluster from './HeroCluster'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="waitlist"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20"
      style={{ background: 'linear-gradient(160deg, #7B5EA7 0%, #994529 100%)' }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 items-center">

          {/* Text content */}
          <div className="flex flex-col gap-6 order-2 md:order-1 mt-10 md:mt-0">
            <motion.div {...fadeUp(0.1)} className="inline-flex">
              <span className="text-sm font-medium text-white/70">
                Coming soon
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: '1.12', textWrap: 'balance' } as React.CSSProperties}
            >
              {t.hero.headline}
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-white/90 text-lg leading-relaxed max-w-md"
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex flex-col gap-3">
              <EmailForm
                variant="hero"
                placeholder={t.hero.emailPlaceholder}
                buttonLabel={t.hero.ctaButton}
                thankyouMessage={t.hero.thankyou}
              />
              <p className="text-white/65 text-sm">{t.hero.socialProof}</p>
            </motion.div>
          </div>

          {/* Layered product cluster */}
          <div className="order-1 md:order-2 flex justify-center">
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
