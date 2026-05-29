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

const SITE_URL = 'https://lumia-app.com'

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

function buildArticleJsonLd(article, url) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
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

function buildRouteTable(articles) {
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
    },
    {
      url: '/contact',
      title: 'Contact — Lumia IVF App',
      description: 'Get in touch with the Lumia team. We read every message.',
      canonical: `${SITE_URL}/contact`,
      jsonLd: '',
    },
    {
      url: '/articles',
      title: 'IVF Articles & Guides — Lumia',
      description:
        'Honest, plainspoken guides to IVF — covering treatment options, success rates, costs, and what to expect at every phase.',
      canonical: `${SITE_URL}/articles`,
      jsonLd: '',
    },
    ...articles.map((article) => ({
      url: `/articles/${article.slug}`,
      title: `${article.title} — Lumia`,
      description: article.metaDescription,
      canonical: `${SITE_URL}/articles/${article.slug}`,
      jsonLd: buildArticleJsonLd(article, `${SITE_URL}/articles/${article.slug}`),
    })),
  ]

  return routes
}

// ── HTML injection ────────────────────────────────────────────────────────────

function injectIntoHtml(template, { title, description, canonical, jsonLd, bodyHtml }) {
  let html = template

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)

  // Replace meta description
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  )

  // Inject canonical + JSON-LD just before </head>
  const headInsert = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
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
    .map(
      (r) => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.url === '/' ? '1.0' : '0.7'}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
  const { render, articles } = await import(ssrBundleUrl)

  // 4. Build route table
  const routes = buildRouteTable(articles)
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
