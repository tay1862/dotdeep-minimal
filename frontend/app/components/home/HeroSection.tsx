'use client'

import {useTranslations} from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/app/components/ScrollReveal'

interface HeroData {
  heroHeading?: {en?: string; th?: string; lo?: string} | null
  heroSubheading?: {en?: string; th?: string; lo?: string} | null
  heroCtaText?: {en?: string; th?: string; lo?: string} | null
  heroCtaLink?: string | null
  heroImage?: {asset?: {_ref?: string}} | null
}

export default function HeroSection({data, locale}: {data: HeroData | null; locale: string}) {
  const t = useTranslations('hero')
  const l = locale as 'en' | 'th' | 'lo'

  const heading = data?.heroHeading?.[l] || t('tagline')
  const subheading = data?.heroSubheading?.[l] || t('subtitle')
  const ctaText = data?.heroCtaText?.[l] || t('cta')
  const ctaLink = data?.heroCtaLink || `/${locale}/gallery`

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-accent-100 dark:from-brand-950/40 dark:via-transparent dark:to-accent-900/20" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px'}}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/50 px-4 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-xs font-medium text-brand-700 dark:text-brand-300 uppercase tracking-wider">
                  DotDeep Design
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-fluid-3xl lg:text-fluid-4xl font-display font-bold leading-[1.08] tracking-tight mb-6">
                {heading.split(' ').map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <span key={i} className="text-brand-500">{word}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  ),
                )}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-lg lg:text-xl text-[var(--on-surface-muted)] max-w-lg mb-8 leading-relaxed">
                {subheading}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-7 py-3.5 font-medium transition-all hover:shadow-lg hover:shadow-brand-500/25 active:scale-[0.98]"
                >
                  {ctaText}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 7-7M5 5h7v7" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] hover:border-brand-300 px-7 py-3.5 font-medium transition-all hover:bg-brand-50 dark:hover:bg-brand-950/30"
                >
                  {t('contact')}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual */}
          <ScrollReveal delay={200} className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800">
              {data?.heroImage?.asset?._ref ? (
                <Image
                  src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${data.heroImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                  alt={heading}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/dotdeep-logo.png"
                    alt="DotDeep Design"
                    width={160}
                    height={160}
                    className="opacity-30"
                  />
                </div>
              )}

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent-400/20 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-brand-500/20 blur-xl" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
