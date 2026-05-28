import { Zap, Calendar, Pill, Activity, Heart, Users, FileText } from 'lucide-react'

const SCREEN_CONFIGS = [
  {
    label: 'Quick log',
    icon: Zap,
    bg: 'linear-gradient(145deg, #B8D4F5 0%, #EDE1FF 100%)',
    iconColor: '#7B5EA7',
  },
  {
    label: 'Timeline',
    icon: Calendar,
    bg: 'linear-gradient(145deg, #EDE1FF 0%, #F5EBE0 100%)',
    iconColor: '#7B5EA7',
  },
  {
    label: 'Medications',
    icon: Pill,
    bg: 'linear-gradient(145deg, #F5EBE0 0%, #EDE1FF 100%)',
    iconColor: '#994529',
  },
  {
    label: 'Scan tracking',
    icon: Activity,
    bg: 'linear-gradient(145deg, #D4B8F0 0%, #EDE1FF 100%)',
    iconColor: '#5B3E8A',
  },
  {
    label: 'Mood logging',
    icon: Heart,
    bg: 'linear-gradient(145deg, #F5EBE0 0%, #C6ECC8 100%)',
    iconColor: '#7A9E7E',
  },
  {
    label: 'Partner',
    icon: Users,
    bg: 'linear-gradient(145deg, #C6ECC8 0%, #B8D4F5 100%)',
    iconColor: '#5B8A7E',
  },
  {
    label: 'PDF reports',
    icon: FileText,
    bg: 'linear-gradient(145deg, #B8D4F5 0%, #D4B8F0 100%)',
    iconColor: '#5B3E8A',
  },
]

interface PhoneMockupProps {
  featureIndex: number
}

function ScreenPlaceholder({ featureIndex }: { featureIndex: number }) {
  const config = SCREEN_CONFIGS[featureIndex] ?? SCREEN_CONFIGS[0]
  const Icon = config.icon

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4"
      style={{ background: config.bg }}
    >
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 pt-2">
        <span className="text-xs font-semibold" style={{ color: config.iconColor, opacity: 0.7 }}>9:41</span>
        <div className="flex gap-1 items-center" style={{ color: config.iconColor, opacity: 0.7 }}>
          <div className="flex gap-0.5">
            <div className="w-1 h-2 rounded-sm bg-current opacity-40" />
            <div className="w-1 h-3 rounded-sm bg-current opacity-60" />
            <div className="w-1 h-4 rounded-sm bg-current" />
          </div>
        </div>
      </div>

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-card"
        style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
      >
        <Icon size={40} style={{ color: config.iconColor }} strokeWidth={1.5} />
      </div>

      {/* Label */}
      <span
        className="text-sm font-semibold tracking-wide uppercase"
        style={{ color: config.iconColor, opacity: 0.8, letterSpacing: '0.08em' }}
      >
        {config.label}
      </span>

      {/* Decorative mock UI rows */}
      <div className="w-2/3 flex flex-col gap-2 mt-2">
        {[0.6, 0.85, 0.7].map((w, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full"
            style={{
              width: `${w * 100}%`,
              backgroundColor: config.iconColor,
              opacity: 0.15,
            }}
          />
        ))}
      </div>

      {/* Coming soon badge */}
      <div
        className="mt-4 px-4 py-1.5 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: 'rgba(255,255,255,0.6)',
          color: config.iconColor,
        }}
      >
        Coming soon
      </div>
    </div>
  )
}

export default function PhoneMockup({ featureIndex }: PhoneMockupProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Phone outer shell */}
      <div
        className="relative overflow-hidden shadow-phone"
        style={{
          width: '260px',
          height: '530px',
          borderRadius: '48px',
          backgroundColor: '#1A1A1F',
          border: '10px solid #2A2830',
        }}
      >
        {/* Left buttons */}
        <div className="absolute" style={{ left: '-3px', top: '80px', width: '3px', height: '36px', backgroundColor: '#2A2830', borderRadius: '2px 0 0 2px' }} />
        <div className="absolute" style={{ left: '-3px', top: '128px', width: '3px', height: '52px', backgroundColor: '#2A2830', borderRadius: '2px 0 0 2px' }} />
        {/* Right button */}
        <div className="absolute" style={{ right: '-3px', top: '100px', width: '3px', height: '64px', backgroundColor: '#2A2830', borderRadius: '0 2px 2px 0' }} />

        {/* Dynamic Island */}
        <div
          className="absolute z-10"
          style={{
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90px',
            height: '28px',
            backgroundColor: '#1A1A1F',
            borderRadius: '9999px',
          }}
        />

        {/* Screen area */}
        <div className="w-full h-full relative" style={{ borderRadius: '38px', overflow: 'hidden' }}>
          <ScreenPlaceholder featureIndex={featureIndex} />
        </div>
      </div>
    </div>
  )
}
