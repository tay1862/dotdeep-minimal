'use client'

import {useTranslations} from 'next-intl'
import Link from 'next/link'
import ScrollReveal from '@/app/components/ScrollReveal'

interface PricingItem {
  _id: string
  name?: {en?: string; th?: string; lo?: string} | null
  price?: number | null
  currency?: string | null
  description?: {en?: string; th?: string; lo?: string} | null
  features?: Array<{en?: string; th?: string; lo?: string}> | null
  service?: {title?: {en?: string; th?: string; lo?: string}; slug?: string} | null
}

export default function PricingGrid({items, locale}: {items: PricingItem[]; locale: string}) {
  const t = useTranslations('pricing')
  const l = locale as 'en' | 'th' | 'lo'

  const currencyFormat = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {LAK: '₭', USD: '$', THB: '฿'}
    return `${symbols[currency] || ''}${amount.toLocaleString()}`
  }

  return (
    <>
      <ScrollReveal>
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">{t('title')}</p>
          <h1 className={`text-fluid-2xl font-display font-bold mb-3 ${locale === 'lo' ? 'font-lao' : ''}`}>{t('subtitle')}</h1>
        </div>
      </ScrollReveal>

      {items.length === 0 ? (
        <ScrollReveal>
          <div className="text-center py-16">
            <p className="text-lg text-[var(--on-surface-muted)] mb-6">{t('comingSoon')}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-7 py-3 font-medium transition-all"
            >
              {t('contactUs')}
            </Link>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={item._id} delay={i * 80}>
              <div className="relative p-7 rounded-2xl border border-[var(--border-default)] bg-[var(--surface)] hover:border-brand-300 hover:shadow-xl transition-all h-full flex flex-col">
                {/* Service badge */}
                {item.service && (
                  <span className="text-xs font-medium text-brand-500 mb-3">
                    {item.service.title?.[l] || item.service.title?.en || ''}
                  </span>
                )}

                <h3 className="text-lg font-display font-bold mb-1">
                  {item.name?.[l] || item.name?.en || 'Package'}
                </h3>

                {item.price != null && item.currency ? (
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-brand-500">
                      {currencyFormat(item.price, item.currency)}
                    </span>
                    <span className="text-sm text-[var(--on-surface-muted)] ml-1">
                      / {t('perProject')}
                    </span>
                  </div>
                ) : (
                  <p className="text-xl font-bold text-brand-500 mb-4">{t('contactUs')}</p>
                )}

                {item.description && (
                  <p className="text-sm text-[var(--on-surface-muted)] mb-5">
                    {item.description[l] || item.description.en || ''}
                  </p>
                )}

                {item.features && item.features.length > 0 && (
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {item.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-500 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                        {f[l] || f.en || ''}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/${locale}/contact`}
                  className="mt-auto w-full text-center rounded-xl bg-brand-500 hover:bg-brand-600 text-white py-3 font-medium transition-all block"
                >
                  {t('contactUs')}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  )
}
