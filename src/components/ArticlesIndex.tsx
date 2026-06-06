import { Link } from 'react-router-dom'
import { articles } from '../content/articles/index'
import { plArticles } from '../content/articles/pl/index'
import { useLanguage } from '../contexts/LanguageContext'

const ARTICLE_ICONS: Record<string, string> = {
  'iui-vs-ivf': '🔬',
  'ivf-success-rates': '📊',
  'how-much-does-ivf-cost': '🇬🇧',
  'how-much-does-ivf-cost-us': '🇺🇸',
  'best-ivf-tracking-app': '📱',
  'ivf-timeline-what-to-expect': '🗓️',
  // Polish articles
  'ile-kosztuje-in-vitro': '💰',
  'in-vitro-refundacja': '🏛️',
  'in-vitro-co-to': '🌱',
  'jak-dziala-in-vitro': '🗓️',
  'in-vitro-cena': '🧾',
  'aplikacja-do-sledzenia-in-vitro': '📱',
}

const ARTICLE_DESCRIPTIONS: Record<string, string> = {
  'iui-vs-ivf': 'A plain-language guide to how IUI and IVF differ, and how to have the right conversation with your doctor.',
  'ivf-success-rates': 'How to read IVF success statistics honestly — and what actually matters for your situation.',
  'how-much-does-ivf-cost': 'What an IVF cycle costs in the UK and Europe, what NHS funding covers, and what to ask your clinic.',
  'how-much-does-ivf-cost-us': 'IVF pricing in the US — clinic fees, medications, add-ons, and which states mandate insurance coverage.',
  'best-ivf-tracking-app': 'What a genuinely useful IVF pregnancy tracker app should do — and why most period trackers fall short.',
  'ivf-timeline-what-to-expect': 'A phase-by-phase walkthrough of the IVF journey, from first scans to the two-week wait.',
  // Polish articles
  'ile-kosztuje-in-vitro': 'Ile kosztuje in vitro prywatnie, co wchodzi w cenę, a co dochodzi osobno — i kiedy procedura jest bezpłatna.',
  'in-vitro-refundacja': 'Kto kwalifikuje się do rządowego programu, co obejmuje refundacja i co zmieniło się w 2026 roku.',
  'in-vitro-co-to': 'Prosty przewodnik: czym jest zapłodnienie pozaustrojowe (IVF) i na czym polega cała procedura.',
}

export default function ArticlesIndex() {
  const { language, t } = useLanguage()
  const isPl = language === 'pl'
  const list = isPl ? plArticles : articles
  const articleBase = isPl ? '/pl/artykuly' : '/articles'

  return (
    <div className="bg-surface min-h-screen">
      {/* Page header */}
      <div
        className="py-20 md:py-28 px-6"
        style={{ background: 'linear-gradient(160deg, #7B5EA7 0%, #994529 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-white/70 text-sm font-medium">{t.articles.indexEyebrow}</span>
          <h1
            className="font-display font-bold text-white mt-3 leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', lineHeight: '1.15', textWrap: 'balance' } as React.CSSProperties}
          >
            {t.articles.indexTitle}
          </h1>
          <p className="text-white/85 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            {t.articles.indexSubtitle}
          </p>
        </div>
      </div>

      {/* Wave */}
      <div className="relative" style={{ marginTop: '-1px' }}>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0 40 C360 10 1080 0 1440 40 L1440 40 L0 40 Z" fill="#FAF6F1" />
        </svg>
      </div>

      {/* Articles grid */}
      <div className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-4">
            {list.map((article) => (
              <Link
                key={article.slug}
                to={`${articleBase}/${article.slug}`}
                className="group bg-white rounded-2xl px-6 py-5 flex items-start gap-4 hover:shadow-card transition-all duration-200 border border-[#7B5EA7]/8"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
                  {ARTICLE_ICONS[article.slug] ?? '📄'}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display font-semibold text-on-surface text-base leading-snug group-hover:text-primary transition-colors duration-150">
                    {article.title}
                  </h2>
                  <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
                    {ARTICLE_DESCRIPTIONS[article.slug] ?? article.metaDescription}
                  </p>
                  <span className="inline-block mt-2 text-primary text-sm font-medium">
                    {t.articles.read}
                  </span>
                </div>
                <span className="text-sm text-on-surface-variant/50 flex-shrink-0 mt-0.5 hidden sm:block">
                  {article.readingTime} {t.articles.minRead}
                </span>
              </Link>
            ))}
          </div>

          {/* Soft CTA */}
          <div className="mt-14 bg-[#7B5EA7]/5 rounded-2xl border border-[#7B5EA7]/15 px-6 py-8 text-center">
            <p className="font-display font-semibold text-on-surface text-lg">
              {t.articles.indexCtaTitle}
            </p>
            <p className="text-on-surface-variant text-sm mt-2 leading-relaxed max-w-md mx-auto">
              {t.articles.indexCtaBody}
            </p>
            <Link
              to="/#waitlist"
              className="inline-flex items-center mt-4 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors duration-150"
            >
              {t.articles.indexCtaButton}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
