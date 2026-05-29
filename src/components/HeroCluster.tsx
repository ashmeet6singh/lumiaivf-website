import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import PhoneMockup from './PhoneMockup'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Asymmetric, layered hero composition:
 *   - Primary phone: Timeline / Journey (screen-1)
 *   - Accent A (behind, top-right): cropped estradiol chart fragment (screen-6)
 *   - Accent B (front, bottom-left): quick-log tile fragment (screen-0)
 *
 * The home / quick-log screen (screen-0) is intentionally NOT the primary phone here —
 * it belongs to the "Quick log" feature section below, so the hero and that section
 * never show the same screenshot.
 */
export default function HeroCluster() {
  const { language } = useLanguage()
  const reducedMotion = useReducedMotion()
  const suffix = language === 'pl' ? '-pl' : ''

  // Each layer floats with a distinct amplitude/duration/delay for parallax depth.
  const float = (amplitude: number, duration: number, delay: number) =>
    reducedMotion
      ? {}
      : {
          animate: { y: [-amplitude, amplitude, -amplitude] },
          transition: { duration, ease: 'easeInOut' as const, repeat: Infinity, delay },
        }

  return (
    <div className="relative flex justify-center w-full">
      {/* Sized stage so absolute layers position relative to the phone.
          Horizontal margin reserves room for the offset accent cards. */}
      <div className="relative md:mx-16 lg:mx-20" style={{ width: 260, height: 530 }}>

        {/* Accent A — estradiol chart fragment, behind & up-right */}
        <motion.div
          className="hidden md:block absolute z-0"
          style={{ top: -28, right: -104, transformOrigin: 'center' }}
          initial={{ opacity: 0, y: 30, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
        >
          <motion.div {...float(7, 5.5, 0.4)}>
            <div
              className="overflow-hidden bg-white"
              style={{
                width: 188,
                height: 150,
                borderRadius: 20,
                boxShadow: '0 24px 48px rgba(123,94,167,0.16), 0 4px 12px rgba(123,94,167,0.10)',
              }}
            >
              <img
                src={`/screenshots/screen-6${suffix}.png`}
                alt="Estradiol progression chart"
                className="w-full"
                style={{ objectFit: 'cover', objectPosition: '50% 62%', height: 150, width: '100%' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Primary phone — Timeline / Journey, the focal layer */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          <motion.div {...float(10, 4.5, 0)}>
            <PhoneMockup featureIndex={1} />
          </motion.div>
        </motion.div>

        {/* Accent B — quick-log tile fragment, in front & down-left */}
        <motion.div
          className="hidden md:block absolute z-20"
          style={{ bottom: 36, left: -88, transformOrigin: 'center' }}
          initial={{ opacity: 0, y: 28, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -5 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
        >
          <motion.div {...float(9, 6, 0.8)}>
            <div
              className="overflow-hidden bg-white"
              style={{
                width: 168,
                height: 132,
                borderRadius: 20,
                boxShadow: '0 28px 56px rgba(123,94,167,0.22), 0 6px 16px rgba(123,94,167,0.14)',
              }}
            >
              <img
                src={`/screenshots/screen-0${suffix}.png`}
                alt="Quick-log tiles"
                className="w-full"
                style={{ objectFit: 'cover', objectPosition: '50% 30%', height: 132, width: '100%' }}
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}
