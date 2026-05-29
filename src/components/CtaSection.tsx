import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../contexts/LanguageContext'
import EmailForm from './EmailForm'

export default function CtaSection() {
  const { t } = useLanguage()
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="bg-inverse-surface py-24 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl mx-auto text-center flex flex-col items-center gap-6"
      >
        <h2
          className="font-display font-bold text-inverse-on-surface leading-tight"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: '1.15', textWrap: 'balance' } as React.CSSProperties}
        >
          {t.cta.headline}
        </h2>

        <p className="text-inverse-on-surface/85 text-lg">
          {t.cta.subheadline}
        </p>

        <EmailForm
          variant="cta"
          placeholder={t.cta.emailPlaceholder}
          buttonLabel={t.cta.ctaButton}
          thankyouMessage={t.cta.thankyou}
        />
      </motion.div>
    </section>
  )
}
