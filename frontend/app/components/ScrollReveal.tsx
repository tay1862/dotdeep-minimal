'use client'

import {useEffect, useRef, type ReactNode} from 'react'

import useReducedMotion from '@/app/components/useReducedMotion'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ScrollReveal({children, className = '', delay = 0}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion) {
      el.classList.add('revealed')
      return
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => el.classList.add('revealed'), delay)
          observer.unobserve(el)
        }
      },
      {threshold: 0.15, rootMargin: '0px 0px -40px 0px'},
    )

    observer.observe(el)
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      observer.disconnect()
    }
  }, [delay, prefersReducedMotion])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
