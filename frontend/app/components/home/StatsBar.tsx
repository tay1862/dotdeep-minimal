'use client'

import {useEffect, useRef, useState} from 'react'
import ScrollReveal from '@/app/components/ScrollReveal'

interface Stat {
  value?: string | null
  suffix?: string | null
  label?: {en?: string; th?: string; lo?: string} | null
}

function AnimatedStat({value, suffix, label}: {value: string; suffix?: string | null; label: string}) {
  const [displayed, setDisplayed] = useState('0')
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
    const num = parseFloat(value.replace(/[^0-9.]/g, ''))
    if (isNaN(num)) { setDisplayed(value); return }

    const duration = 1600
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = num % 1 === 0 ? Math.floor(eased * num) : (eased * num).toFixed(1)
      setDisplayed(String(current))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, value])

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
