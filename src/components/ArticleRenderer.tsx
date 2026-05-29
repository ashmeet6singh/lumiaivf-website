import { Check, Info, AlertTriangle } from 'lucide-react'
import type { Block } from '../content/articles/types'

interface ArticleRendererProps {
  blocks: Block[]
}

export default function ArticleRenderer({ blocks }: ArticleRendererProps) {
  return (
    <div className="article-body flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="font-display font-bold text-on-surface mt-4"
                style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)', lineHeight: '1.25' }}
              >
                {block.text}
              </h2>
            )

          case 'h3':
            return (
              <h3
                key={i}
                id={block.id}
                className="font-display font-semibold text-on-surface mt-2"
                style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', lineHeight: '1.3' }}
              >
                {block.text}
              </h3>
            )

          case 'p':
            return (
              <p key={i} className="text-on-surface-variant text-base leading-relaxed">
                {block.text}
              </p>
            )

          case 'list':
            return block.ordered ? (
              <ol key={i} className="flex flex-col gap-3 mt-1 pl-1 list-none">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-on-surface-variant">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-container flex items-center justify-center text-primary text-xs font-bold">
                      {j + 1}
                    </span>
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="flex flex-col gap-3 mt-1 list-none">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-on-surface-variant">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-container flex items-center justify-center">
                      <Check size={11} className="text-primary" strokeWidth={3} />
                    </span>
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )

          case 'callout':
            return (
              <div
                key={i}
                className={`rounded-2xl border px-5 py-4 flex gap-3 items-start ${
                  block.variant === 'warning'
                    ? 'bg-[#BA1A1A]/5 border-[#BA1A1A]/20'
                    : 'bg-[#7B5EA7]/5 border-[#7B5EA7]/15'
                }`}
              >
                <span className="flex-shrink-0 mt-0.5">
                  {block.variant === 'warning' ? (
                    <AlertTriangle size={16} className="text-[#BA1A1A]" />
                  ) : (
                    <Info size={16} className="text-primary" />
                  )}
                </span>
                <p className="text-sm text-on-surface leading-relaxed">{block.text}</p>
              </div>
            )

          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary/30 pl-5 py-1"
              >
                <p className="text-on-surface-variant italic text-base leading-relaxed">{block.text}</p>
                {block.cite && (
                  <cite className="text-sm text-on-surface-variant/60 not-italic mt-1 block">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
