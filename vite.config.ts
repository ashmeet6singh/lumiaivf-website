import { defineConfig, type AliasOptions } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ isSsrBuild }) => {
  const alias: AliasOptions = isSsrBuild
    ? {
        // Stub out browser-only packages during SSR build
        'framer-motion': path.resolve(__dirname, 'src/ssr-stubs/framer-motion.ts'),
        'lucide-react': path.resolve(__dirname, 'src/ssr-stubs/lucide-react.ts'),
      }
    : {}

  return {
    plugins: [react()],
    resolve: { alias },
  }
})
