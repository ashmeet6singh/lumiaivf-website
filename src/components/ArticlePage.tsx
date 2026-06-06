import { Navigate, Link, useParams } from 'react-router-dom'
import { articles } from '../content/articles/index'
import { plArticles } from '../content/articles/pl/index'
import { useLanguage } from '../contexts/LanguageContext'
import ArticleRenderer from './ArticleRenderer'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { language, t } = useLanguage()
  const isPl = language === 'pl'
  const list = isPl ? plArticles : articles
  const articleBase = isPl ? '/pl/artykuly' : '/articles'
  const dateLocale = isPl ? 'pl-PL' : 'en-GB'
  const article = list.find((a) => a.slug === slug)

  if (!article) {
    return <Navigate to={articleBase} replace />
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div
        className="py-20 md:py-24 px-6"
        style={{ background: 'linear-gradient(160deg, #7B5EA7 0%, #994529 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white/80 transition-colors">{t.articles.breadcrumbHome}</Link>
            <span>/</span>
            <Link to={articleBase} className="hover:text-white/80 transition-colors">{t.articles.breadcrumbArticles}</Link>
            <span>/</span>
            <span className="text-white/80 truncate max-w-[200px]">{article.title}</span>
          </nav>

          {article.hero.eyebrow && (
            <span className="text-white/70 text-sm font-medium">{article.hero.eyebrow}</span>
          )}
          <h1
            className="font-display font-bold text-white mt-3 leading-tight"
            style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', lineHeight: '1.15', textWrap: 'balance' } as React.CSSProperties}
          >
            {article.title}
          </h1>
          {article.hero.subtitle && (
            <p className="text-white/85 text-lg mt-4 leading-relaxed max-w-xl">
              {article.hero.subtitle}
            </p>
          )}
          <p className="text-white/55 text-sm mt-5">
            {article.readingTime} {t.articles.minRead}
            {' · '}
            {new Date(article.datePublished).toLocaleDateString(dateLocale, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Wave */}
      <div className="relative" style={{ marginTop: '-1px' }}>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0 40 C360 10 1080 0 1440 40 L1440 40 L0 40 Z" fill="#FAF6F1" />
        </svg>
      </div>

      {/* Article body */}
      <div className="py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ArticleRenderer blocks={article.sections} />

          {/* FAQ */}
          {article.faq.length > 0 && (
            <div className="mt-14">
              <h2
                className="font-display font-bold text-on-surface mb-6"
                style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)', lineHeight: '1.25' }}
              >
                {t.articles.faqHeading}
              </h2>
              <div className="flex flex-col gap-5">
                {article.faq.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#7B5EA7]/10 px-6 py-5">
                    <h3 className="font-display font-semibold text-on-surface text-base leading-snug">
                      {item.question}
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-2 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-10 bg-[#7B5EA7]/5 rounded-2xl border border-[#7B5EA7]/15 px-5 py-4">
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong className="font-semibold text-on-surface">{t.articles.disclaimerLabel}</strong>
              {article.disclaimer}
            </p>
          </div>

          {/* Waitlist CTA */}
          <div className="mt-10 bg-white rounded-2xl border border-[#7B5EA7]/10 px-6 py-8 text-center">
            <p className="font-display font-bold text-on-surface text-xl">
              {t.articles.articleCtaTitle}
            </p>
            <p className="text-on-surface-variant text-sm mt-2 leading-relaxed max-w-md mx-auto">
              {t.articles.articleCtaBody}
            </p>
            <Link
              to={isPl ? '/pl#waitlist' : '/#waitlist'}
              className="inline-flex items-center mt-4 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors duration-150"
            >
              {t.articles.articleCtaButton}
            </Link>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              to={articleBase}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {t.articles.backToAll}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
