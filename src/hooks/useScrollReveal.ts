import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useScrollReveal(options?: { once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: options?.once ?? true,
  })
  return { ref, isInView }
}
