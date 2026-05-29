import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useScrollReveal(options?: { once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    amount: 0.1,
    margin: '0px 0px -40px 0px',
  })
  return { ref, isInView }
}
