/**
 * SSR stub for framer-motion.
 * Used only during `vite build --ssr` (prerender step).
 * motion.* components render as plain HTML elements; hooks are no-ops.
 */
import { forwardRef, createElement, type ReactNode } from 'react'

type AnyProps = Record<string, unknown> & { children?: ReactNode; ref?: unknown }

const makeMotion = (tag: string) =>
  forwardRef<HTMLElement, AnyProps>((props, ref) => {
    // Strip framer-motion-only props before passing to DOM
    const {
      initial: _i,
      animate: _a,
      exit: _e,
      transition: _t,
      whileHover: _wh,
      whileTap: _wt,
      whileInView: _wiv,
      variants: _v,
      viewport: _vp,
      layout: _l,
      layoutId: _lid,
      ...rest
    } = props
    return createElement(tag, { ...rest, ref })
  })

const handler: ProxyHandler<object> = {
  get(_target, tag: string) {
    return makeMotion(tag)
  },
}

export const motion = new Proxy({} as Record<string, ReturnType<typeof makeMotion>>, handler)
export const AnimatePresence = ({ children }: { children: ReactNode }) => children
export function useInView() { return true }
export function useReducedMotion() { return false }
export function useAnimation() { return {} }
export function useMotionValue(v: number) {
  return { get: () => v, set: () => {}, on: () => () => {} }
}
export function useSpring(v: number) {
  return { get: () => v, set: () => {} }
}
export function useTransform() {
  return { get: () => 0 }
}
export function animate() {
  return { stop: () => {} }
}
