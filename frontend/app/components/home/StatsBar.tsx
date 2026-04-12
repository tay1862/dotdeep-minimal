'use client'

import {useTranslations} from 'next-intl'
import ScrollReveal from '@/app/components/ScrollReveal'

interface Stat {
  value?: string | null
  suffix?: string | null
  label?: {en?: string; th?: string; lo?: string} | null
}

export default function StatsBar({stats, locale}: {stats: Stat[]; locale: string}) {
  const t = useTranslations('sections')
  const l = locale as 'en' | 'th' | 'lo'

  return (
    <section className="border-y border-[var(--border-default)] bg-[var(--surface-raised)]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-fluid-2xl font-display font-bold text-brand-500">
                  {stat.value}
                  {stat.suffix && <span className="text-fluid-lg">{stat.suffix}</span>}
                </p>
                <p className="text-sm text-[var(--on-surface-muted)]">
                  {stat.label?.[l] || stat.label?.en || ''}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
