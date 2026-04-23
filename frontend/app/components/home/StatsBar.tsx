'use client'

import {useEffect, useRef, useState} from 'react'

import useReducedMotion from '@/app/components/useReducedMotion'

interface Stat {
  value?: string | null
  suffix?: string | null
  label?: {en?: string; th?: string; lo?: string} | null
}

function AnimatedStat({value, suffix, label}: {value: string; suffix?: string | null; label: string}) {
  const numberValue = parseFloat(value.replace(/[^0-9.]/g, ''))
  const prefersReducedMotion = useReducedMotion()
  const initialValue = Number.isNaN(numberValue) ? value : prefersReducedMotion ? value : '0'
  const [displayed, setDisplayed] = useState(initialValue)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      {threshold: 0.5},
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    if (Number.isNaN(numberValue) || prefersReducedMotion) {
      return
    }

    const duration = 1600
    const start = performance.now()
    let frameId = 0
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current =
        numberValue % 1 === 0
          ? Math.floor(eased * numberValue)
          : (eased * numberValue).toFixed(1)
      setDisplayed(String(current))
      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      }
    }
    frameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(frameId)
  }, [numberValue, prefersReducedMotion, started])

  return (
    <div ref={ref} className="text-center group">
      <p className="text-fluid-2xl font-display font-bold text-brand-500 tabular-nums leading-none">
        {displayed}
        {suffix && <span className="text-fluid-lg">{suffix}</span>}
      </p>
      <p className="text-sm text-on-surface-muted mt-2">{label}</p>
    </div>
  )
}

export default function StatsBar({stats, locale}: {stats: Stat[]; locale: string}) {
  const l = locale as 'en' | 'th' | 'lo'

  return (
    <section className="border-y border-border-default bg-surface-raised">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <AnimatedStat
              key={i}
              value={stat.value || '0'}
              suffix={stat.suffix}
              label={stat.label?.[l] || stat.label?.en || ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
