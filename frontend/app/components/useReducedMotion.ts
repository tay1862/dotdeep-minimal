'use client'

import {useSyncExternalStore} from 'react'

const mediaQuery = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  const media = window.matchMedia(mediaQuery)
  const handler = () => callback()

  media.addEventListener('change', handler)
  return () => media.removeEventListener('change', handler)
}

function getSnapshot() {
  return typeof window !== 'undefined' && window.matchMedia(mediaQuery).matches
}

export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
