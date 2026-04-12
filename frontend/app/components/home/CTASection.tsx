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
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-500 to-brand-700 px-8 py-16 lg:px-16 lg:py-20 text-center text-white">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

            <div className="relative">
              <h2 className="text-fluid-2xl lg:text-fluid-3xl font-display font-bold mb-4">
                {heading}
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                {text}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-brand-600 px-7 py-3.5 font-semibold hover:bg-white/90 transition-all active:scale-[0.98]"
                >
                  {t('getQuote')}
                </Link>
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-7 py-3.5 font-medium hover:bg-white/10 transition-all"
                >
                  {t('getQuote')}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
