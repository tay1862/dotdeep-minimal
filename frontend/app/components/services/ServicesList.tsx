'use client'

import {useTranslations} from 'next-intl'
import Link from 'next/link'
import ScrollReveal from '@/app/components/ScrollReveal'

interface Service {
  _id: string
  title?: {en?: string; th?: string; lo?: string} | null
  slug?: string | null
  shortDescription?: {en?: string; th?: string; lo?: string} | null
  icon?: string | null
  features?: Array<{en?: string; th?: string; lo?: string}> | null
}

const iconMap: Record<string, React.ReactNode> = {
  palette: <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  code: <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  layout: <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  video: <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>,
}

export default function ServicesList({services, locale}: {services: Service[]; locale: string}) {
  const t = useTranslations('services')
  const l = locale as 'en' | 'th' | 'lo'

  return (
    <>
      <ScrollReveal>
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">{t('title')}</p>
          <h1 className="text-fluid-2xl font-display font-bold mb-3">{t('subtitle')}</h1>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, i) => (
          <ScrollReveal key={service._id} delay={i * 100}>
            <Link
              href={`/${locale}/services/${service.slug || ''}`}
              className="group block p-8 rounded-2xl border border-[var(--border-default)] bg-[var(--surface)] hover:border-brand-300 hover:shadow-xl transition-all h-full"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                {iconMap[service.icon || 'code'] || iconMap.code}
              </div>

              <h2 className="text-xl font-display font-bold mb-2 group-hover:text-brand-500 transition-colors">
                {service.title?.[l] || service.title?.en || 'Service'}
              </h2>

              <p className="text-[var(--on-surface-muted)] leading-relaxed mb-5">
                {service.shortDescription?.[l] || service.shortDescription?.en || ''}
              </p>

              {service.features && service.features.length > 0 && (
                <ul className="space-y-2">
                  {service.features.slice(0, 4).map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-[var(--on-surface-muted)]">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-500 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                      {f[l] || f.en || ''}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 text-sm font-medium text-brand-500 flex items-center gap-1">
                {t('learnMore')}
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 5 4 4-4 4M5 9h8"/></svg>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </>
  )
}
