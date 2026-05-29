/**
 * entry-server.tsx
 * SSR entry point used ONLY by scripts/prerender.mjs (vite build --ssr).
 * Client uses src/main.tsx (createRoot) — this file is never loaded in the browser.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { articles } from './content/articles/index'

export { articles }

export function render(url: string): string {
  return renderToStaticMarkup(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
