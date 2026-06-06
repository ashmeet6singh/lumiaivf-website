import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { articles } from '../content/articles/index'
import { plArticles } from '../content/articles/pl/index'

const DEFAULT_TITLE = 'Lumia — Your IVF app, finally built for you'
const DEFAULT_DESCRIPTION =
  'Track every injection, understand every scan result, and honor every emotion. Lumia is a warm IVF pregnancy tracker app. Join the waitlist.'

interface RouteMeta {
  title: string
  description: string
}

function getMetaForPath(pathname: string, slug?: string): RouteMeta {
  if (pathname === '/') {
    return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION }
  }
  if (pathname === '/contact') {
    return {
      title: 'Contact — Lumia IVF App',
      description: 'Get in touch with the Lumia team. We read every message.',
    }
  }
  if (pathname === '/articles') {
    return {
      title: 'IVF Articles & Guides — Lumia',
      description:
        'Honest, plainspoken guides to IVF — covering treatment options, success rates, costs, and what to expect at every phase.',
    }
  }
  if (pathname === '/pl') {
    return {
      title: 'Lumia — Ciepła aplikacja do in vitro, stworzona dla Ciebie',
      description:
        'Lumia to ciepła aplikacja do IVF, która zapisuje każdy zastrzyk, wynik badania i emocje w jednym miejscu. Dołącz do listy oczekujących.',
    }
  }
  if (pathname === '/pl/artykuly') {
    return {
      title: 'Artykuły o in vitro — Lumia',
      description:
        'Przewodniki o in vitro pisane prostym językiem — koszty, refundacja, przebieg procedury i to, czego się spodziewać na każdym etapie.',
    }
  }
  // Polish article pages
  if (pathname.startsWith('/pl/artykuly/') && slug) {
    const plArticle = plArticles.find((a) => a.slug === slug)
    if (plArticle) {
      return { title: `${plArticle.title} — Lumia`, description: plArticle.metaDescription }
    }
  }
  if (slug) {
    const article = articles.find((a) => a.slug === slug)
    if (article) {
      return { title: `${article.title} — Lumia`, description: article.metaDescription }
    }
  }
  return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION }
}

function setMetaDescription(content: string) {
  let el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!el) {
    el = document.createElement('meta')
    el.name = 'description'
    document.head.appendChild(el)
  }
  el.content = content
}

export default function RouteHead() {
  const { pathname } = useLocation()
  const { slug } = useParams<{ slug?: string }>()

  useEffect(() => {
    const { title, description } = getMetaForPath(pathname, slug)
    document.title = title
    setMetaDescription(description)
  }, [pathname, slug])

  return null
}
