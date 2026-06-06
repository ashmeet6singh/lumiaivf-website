/**
 * prerender.mjs
 *
 * Build-time static HTML pre-renderer for the Lumia marketing site.
 * Runs AFTER `vite build` (client build) as the last step in `npm run build`.
 *
 * Strategy:
 *   1. Build an SSR bundle from src/entry-server.tsx (framer-motion + lucide are
 *      stubbed via vite.config.ts aliases so nothing browser-only breaks in Node).
 *   2. Import the SSR bundle and call render(url) for each route.
 *   3. Clone dist/index.html, inject per-route <title>, <meta description>,
 *      <link rel="canonical">, and JSON-LD into <head>, insert body HTML into
 *      <div id="root">, write dist/<route>/index.html.
 *   4. Emit dist/sitemap.xml and dist/robots.txt.
 *
 * Build fails loudly (process.exit(1)) if any route throws.
 *
 * IMPORTANT: Update SITE_URL below when the real domain is confirmed.
 */

import { build } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const SSR_OUT = path.join(ROOT, '.ssr-out')

const SITE_URL = 'https://lumiaivf.com'

// ── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function jsonLdScript(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`
}

function buildArticleJsonLd(article, url, lang = 'en') {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    inLanguage: lang,
    author: { '@type': 'Organization', name: 'Lumia' },
    publisher: {
      '@type': 'Organization',
      name: 'Lumia',
      url: SITE_URL,
    },
    url,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: article.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return [jsonLdScript(articleSchema), jsonLdScript(faqSchema)].join('\n    ')
}

// ── Route table ───────────────────────────────────────────────────────────────

// The EN and PL articles indexes are a true translation pair, so they
// cross-reference each other via hreflang (with x-default → the English index).
const INDEX_ALTERNATES = [
  { hreflang: 'en', href: `${SITE_URL}/articles` },
  { hreflang: 'pl', href: `${SITE_URL}/pl/artykuly` },
  { hreflang: 'x-default', href: `${SITE_URL}/articles` },
]

function buildRouteTable(articles, plArticles = []) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lumia',
    url: SITE_URL,
  }

  const routes = [
    {
      url: '/',
      title: 'Lumia — Your IVF app, finally built for you',
      description:
        'Lumia is a warm IVF pregnancy tracker app that logs every injection, scan, and emotion in one place. Join the waitlist for early access.',
      canonical: `${SITE_URL}/`,
      jsonLd: jsonLdScript(websiteSchema),
      lang: 'en',
    },
    {
      url: '/contact',
      title: 'Contact — Lumia IVF App',
      description: 'Get in touch with the Lumia team. We read every message.',
      canonical: `${SITE_URL}/contact`,
      jsonLd: '',
      lang: 'en',
    },
    {
      url: '/articles',
      title: 'IVF Articles & Guides — Lumia',
      description:
        'Honest, plainspoken guides to IVF — covering treatment options, success rates, costs, and what to expect at every phase.',
      canonical: `${SITE_URL}/articles`,
      jsonLd: '',
      lang: 'en',
      alternates: INDEX_ALTERNATES,
    },
    ...articles.map((article) => ({
      url: `/articles/${article.slug}`,
      title: `${article.title} — Lumia`,
      description: article.metaDescription,
      canonical: `${SITE_URL}/articles/${article.slug}`,
      jsonLd: buildArticleJsonLd(article, `${SITE_URL}/articles/${article.slug}`, 'en'),
      lang: 'en',
    })),
    // ── Polish (PL) routes ──────────────────────────────────────────────────
    {
      url: '/pl/artykuly',
      title: 'Artykuły o in vitro — Lumia',
      description:
        'Przewodniki o in vitro pisane prostym językiem — koszty, refundacja, przebieg procedury i to, czego się spodziewać na każdym etapie.',
      canonical: `${SITE_URL}/pl/artykuly`,
      jsonLd: '',
      lang: 'pl',
      alternates: INDEX_ALTERNATES,
    },
    ...plArticles.map((article) => ({
      url: `/pl/artykuly/${article.slug}`,
      title: `${article.title} — Lumia`,
      description: article.metaDescription,
      canonical: `${SITE_URL}/pl/artykuly/${article.slug}`,
      jsonLd: buildArticleJsonLd(article, `${SITE_URL}/pl/artykuly/${article.slug}`, 'pl'),
      lang: 'pl',
    })),
  ]

  return routes
}

// ── HTML injection ────────────────────────────────────────────────────────────

function buildHreflangLinks(alternates) {
  if (!alternates || alternates.length === 0) return ''
  return alternates
    .map(
      (alt) =>
        `<link rel="alternate" hreflang="${escapeHtml(alt.hreflang)}" href="${escapeHtml(alt.href)}" />`
    )
    .join('\n    ')
}

function injectIntoHtml(template, { title, description, canonical, jsonLd, bodyHtml, lang = 'en', alternates }) {
  let html = template

  // Set <html lang> for the route's language (template ships lang="en")
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)

  // Replace meta description
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  )

  // Per-route og:url (template hardcodes the homepage)
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`
  )

  // og:locale + alternate locale, so social previews advertise the right language
  const ogLocale = lang === 'pl' ? 'pl_PL' : 'en_GB'
  const ogAltLocale = lang === 'pl' ? 'en_GB' : 'pl_PL'
  const ogLocaleTags =
    `<meta property="og:locale" content="${ogLocale}" />\n    ` +
    `<meta property="og:locale:alternate" content="${ogAltLocale}" />`

  // Inject canonical + hreflang + og:locale + JSON-LD just before </head>
  const headInsert = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    buildHreflangLinks(alternates),
    ogLocaleTags,
    jsonLd,
  ]
    .filter(Boolean)
    .join('\n    ')

  html = html.replace('</head>', `    ${headInsert}\n  </head>`)

  // Inject body HTML into <div id="root">
  html = html.replace(
    /(<div id="root">)[^<]*/,
    `$1${bodyHtml}`
  )

  return html
}

// ── Sitemap ───────────────────────────────────────────────────────────────────

function buildSitemap(routes) {
  const today = new Date().toISOString().split('T')[0]
  const urls = routes
    .map((r) => {
      // Emit xhtml:link hreflang alternates inside the <url> for translation pairs
      const altLinks = (r.alternates ?? [])
        .map(
          (alt) =>
            `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
        )
        .join('')
      return `  <url>
    <loc>${r.canonical}</loc>${altLinks}
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.url === '/' ? '1.0' : '0.7'}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`
}

// ── robots.txt ────────────────────────────────────────────────────────────────

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n=== Lumia prerender ===\n')

  // 1. Verify dist/index.html exists (from the client build)
  const templatePath = path.join(DIST, 'index.html')
  if (!fs.existsSync(templatePath)) {
    console.error('ERROR: dist/index.html not found. Run vite build first.')
    process.exit(1)
  }
  const template = fs.readFileSync(templatePath, 'utf-8')

  // 2. Build the SSR bundle (framer-motion + lucide are stubbed via vite.config.ts aliases)
  console.log('Building SSR bundle…')
  fs.mkdirSync(SSR_OUT, { recursive: true })

  await build({
    root: ROOT,
    logLevel: 'error',
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: SSR_OUT,
      rollupOptions: {
        output: {
          format: 'esm',
        },
      },
      emptyOutDir: true,
    },
  })
  console.log('SSR bundle built.\n')

  // 3. Import the SSR bundle
  const ssrBundlePath = path.join(SSR_OUT, 'entry-server.js')
  if (!fs.existsSync(ssrBundlePath)) {
    console.error('ERROR: SSR bundle not found at', ssrBundlePath)
    process.exit(1)
  }
  const ssrBundleUrl = pathToFileURL(ssrBundlePath).href
  const { render, articles, plArticles } = await import(ssrBundleUrl)

  // 4. Build route table
  const routes = buildRouteTable(articles, plArticles)
  console.log(`Routes to prerender: ${routes.length}\n`)

  // 5. Render each route
  let hadError = false
  for (const route of routes) {
    process.stdout.write(`  Rendering ${route.url} … `)
    try {
      const bodyHtml = render(route.url)

      const html = injectIntoHtml(template, {
        title: route.title,
        description: route.description,
        canonical: route.canonical,
        jsonLd: route.jsonLd,
        bodyHtml,
        lang: route.lang ?? 'en',
        alternates: route.alternates,
      })

      // Write output file
      const outDir =
        route.url === '/'
          ? DIST
          : path.join(DIST, ...route.url.replace(/^\//, '').split('/'))
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8')

      console.log('✓')
    } catch (err) {
      console.log('✗')
      console.error(`\nERROR rendering ${route.url}:`, err)
      hadError = true
    }
  }

  // 6. Emit sitemap and robots
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), buildSitemap(routes), 'utf-8')
  console.log('\n  sitemap.xml ✓')

  fs.writeFileSync(path.join(DIST, 'robots.txt'), buildRobots(), 'utf-8')
  console.log('  robots.txt  ✓')

  // 7. Clean up SSR build artifacts
  fs.rmSync(SSR_OUT, { recursive: true, force: true })

  if (hadError) {
    console.error('\n=== PRERENDER FAILED — see errors above ===\n')
    process.exit(1)
  }

  console.log('\n=== Prerender complete ===\n')
}

main().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
