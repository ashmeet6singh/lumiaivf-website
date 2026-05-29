import { useLanguage } from '../contexts/LanguageContext'

interface PhoneMockupProps {
  featureIndex: number
  /** Width in px of the phone shell. Height scales proportionally (2.038:1). */
  width?: number
}

const BASE_WIDTH = 260
const ASPECT = 530 / 260 // shell height / width

export default function PhoneMockup({ featureIndex, width = BASE_WIDTH }: PhoneMockupProps) {
  const { language } = useLanguage()
  const suffix = language === 'pl' ? '-pl' : ''
  const scale = width / BASE_WIDTH

  return (
    <div className="relative flex items-center justify-center">
      {/* Phone outer shell */}
      <div
        className="relative overflow-hidden shadow-phone"
        style={{
          width: `${width}px`,
          height: `${width * ASPECT}px`,
          borderRadius: `${48 * scale}px`,
          backgroundColor: '#1A1A1F',
          border: `${10 * scale}px solid #2A2830`,
        }}
      >
        {/* Left buttons */}
        <div className="absolute" style={{ left: `${-3 * scale}px`, top: `${80 * scale}px`, width: `${3 * scale}px`, height: `${36 * scale}px`, backgroundColor: '#2A2830', borderRadius: `${2 * scale}px 0 0 ${2 * scale}px` }} />
        <div className="absolute" style={{ left: `${-3 * scale}px`, top: `${128 * scale}px`, width: `${3 * scale}px`, height: `${52 * scale}px`, backgroundColor: '#2A2830', borderRadius: `${2 * scale}px 0 0 ${2 * scale}px` }} />
        {/* Right button */}
        <div className="absolute" style={{ right: `${-3 * scale}px`, top: `${100 * scale}px`, width: `${3 * scale}px`, height: `${64 * scale}px`, backgroundColor: '#2A2830', borderRadius: `0 ${2 * scale}px ${2 * scale}px 0` }} />

        {/* Screen area — aspect ratio matches mockup inner (240×510 = 2.125:1) */}
        <div className="w-full h-full relative" style={{ borderRadius: `${38 * scale}px`, overflow: 'hidden' }}>
          <img
            src={`/screenshots/screen-${featureIndex}${suffix}.png`}
            alt={`App screen ${featureIndex}`}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  )
}
