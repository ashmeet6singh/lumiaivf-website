import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import PhoneMockup from './PhoneMockup'

const AURA_COLORS = [
  '#EDE1FF',
  '#F5EBE0',
  '#FFE4D6',
  '#D4B8F0',
  '#C6ECC8',
  '#B8D4F5',
  '#E0D4F0',
]

interface Feature {
  id: string
  tag: string
  headline: string
  body: string
  bullets: string[]
}

interface FeatureSectionProps {
  feature: Feature
  reverse: boolean
  featureIndex: number
}

export default function FeatureSection({ feature, reverse, featureIndex }: FeatureSectionProps) {
  const { ref: textRef, isInView: textInView } = useScrollReveal()
  const { ref: phoneRef, isInView: phoneInView } = useScrollReveal()

  const auraColor = AURA_COLORS[featureIndex] ?? AURA_COLORS[0]
  const sectionBg = featureIndex % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low'

  return (
    <section className={`${sectionBg} py-20 md:py-28 overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`flex flex-col-reverse md:grid md:grid-cols-2 md:gap-16 items-center ${reverse ? 'md:[&>*:first-child]:order-last' : ''}`}>

          {/* Text content */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, y: 32 }}
            animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 }}
            className="flex flex-col gap-5 mt-10 md:mt-0"
          >
            {/* Tag chip */}
            <span className="inline-flex self-start items-center bg-primary-container text-on-primary-container text-xs font-semibold tracking-wider uppercase rounded-full px-4 py-1.5">
              {feature.tag}
            </span>

            <h2
              className="font-display font-bold text-on-surface leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', lineHeight: '1.2' }}
            >
              {feature.headline}
            </h2>

            <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
              {feature.body}
            </p>

            {feature.bullets && feature.bullets.length > 0 && (
              <ul className="flex flex-col gap-3 mt-2 max-w-md">
                {feature.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-on-surface-variant">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-container flex items-center justify-center">
                      <Check size={12} className="text-primary" strokeWidth={3} />
                    </span>
                    <span className="text-base leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Phone mockup with aura */}
          <motion.div
            ref={phoneRef}
            initial={{ opacity: 0, y: 32 }}
            animate={phoneInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            {/* Radial aura blob */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '420px',
                height: '420px',
                background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${auraColor}, transparent)`,
                opacity: 0.7,
              }}
            />
            <PhoneMockup featureIndex={featureIndex} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
