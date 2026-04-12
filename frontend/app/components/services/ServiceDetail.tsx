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
}

interface ServiceData {
  _id: string
  title?: {en?: string; th?: string; lo?: string} | null
  slug?: string | null
  shortDescription?: {en?: string; th?: string; lo?: string} | null
  description?: {en?: any; th?: any; lo?: any} | null
  icon?: string | null
  features?: Array<{en?: string; th?: string; lo?: string}> | null
  pricingItems?: PricingItem[] | null
}

export default function ServiceDetail({service, locale}: {service: ServiceData; locale: string}) {
  const t = useTranslations('services')
  const tPricing = useTranslations('pricing')
  const l = locale as 'en' | 'th' | 'lo'

  const title = service.title?.[l] || service.title?.en || 'Service'

  const currencyFormat = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {LAK: '₭', USD: '$', THB: '฿'}
    return `${symbols[currency] || ''}${amount.toLocaleString()}`
  }

  return (
    <article className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Back link */}
        <ScrollReveal>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-1 text-sm text-[var(--on-surface-muted)] hover:text-brand-500 transition-colors mb-8"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="m11 5-4 4 4 4"/></svg>
            {t('title')}
          </Link>
        </ScrollReveal>

        <ScrollReveal>
          <h1 className="text-fluid-2xl lg:text-fluid-3xl font-display font-bold mb-4">{title}</h1>
          <p className="text-lg text-[var(--on-surface-muted)] leading-relaxed mb-10">
            {service.shortDescription?.[l] || service.shortDescription?.en || ''}
          </p>
        </ScrollReveal>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <ScrollReveal>
            <div className="mb-14">
              <h2 className="text-xl font-display font-bold mb-6">What&apos;s included</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-default)]">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-500 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className="text-sm">{f[l] || f.en || ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Pricing */}
        {service.pricingItems && service.pricingItems.length > 0 && (
          <>
            <ScrollReveal>
              <h2 className="text-xl font-display font-bold mb-6">{tPricing('title')}</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-6 mb-14">
              {service.pricingItems.map((item, i) => (
                <ScrollReveal key={item._id} delay={i * 80}>
                  <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] h-full">
                    <h3 className="font-display font-semibold mb-1">
                      {item.name?.[l] || item.name?.en || 'Package'}
                    </h3>
                    {item.price != null && item.currency && (
                      <p className="text-2xl font-bold text-brand-500 mb-3">
                        {currencyFormat(item.price, item.currency)}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-sm text-[var(--on-surface-muted)] mb-4">
                        {item.description[l] || item.description.en || ''}
                      </p>
                    )}
                    {item.features && item.features.length > 0 && (
                      <ul className="space-y-2">
                        {item.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2 text-sm">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-500 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                            {f[l] || f.en || ''}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center p-10 rounded-2xl bg-brand-50 dark:bg-brand-950/30">
            <p className="text-lg font-medium mb-4">Interested in this service?</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-7 py-3 font-medium transition-all"
            >
              {tPricing('contactUs')}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </article>
  )
}
