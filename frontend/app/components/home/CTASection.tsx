'use client'

import {useTranslations} from 'next-intl'
import Link from 'next/link'
import ScrollReveal from '@/app/components/ScrollReveal'

interface CTAData {
  ctaHeading?: {en?: string; th?: string; lo?: string} | null
  ctaText?: {en?: string; th?: string; lo?: string} | null
}

export default function CTASection({data, locale}: {data: CTAData | null; locale: string}) {
  const t = useTranslations('sections')
  const l = locale as 'en' | 'th' | 'lo'

  const heading = data?.ctaHeading?.[l] || data?.ctaHeading?.en || t('cta')
  const text = data?.ctaText?.[l] || data?.ctaText?.en || t('ctaDescription')

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 px-8 py-16 lg:px-16 lg:py-24 text-center text-white">
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3 blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent-400/10 blur-3xl" />

            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px'}}
            />

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-300 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  {t('readyBadge')}
                </span>
              </div>

              <h2 className={`text-fluid-2xl lg:text-fluid-3xl font-bold mb-4 leading-tight ${locale === 'lo' ? 'font-lao' : 'font-display'}`}>
                {heading}
              </h2>
              <p className="text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed">
                {text}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-brand-600 px-7 py-3.5 font-bold hover:bg-white/90 transition-all active:scale-[0.97] shadow-xl shadow-black/20"
                >
                  {t('getQuote')}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                    <path d="m5 12 7-7M5 5h7v7"/>
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-7 py-3.5 font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  {t('viewPricing')}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
