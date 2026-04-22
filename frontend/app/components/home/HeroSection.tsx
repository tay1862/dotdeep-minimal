'use client'

import {useTranslations} from 'next-intl'
import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import SanityImage from '@/app/components/SanityImage'
import ScrollReveal from '@/app/components/ScrollReveal'

interface HeroData {
  heroHeading?: {en?: string; th?: string; lo?: string} | null
  heroSubheading?: {en?: string; th?: string; lo?: string} | null
  heroCtaText?: {en?: string; th?: string; lo?: string} | null
  heroCtaLink?: string | null
  heroImage?: {asset?: {_ref?: string}} | null
}

// Animated counter hook
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

// Floating badge component
function FloatingBadge({
  value,
  label,
  suffix = '',
  delay = 0,
  className = '',
}: {
  value: number
  label: string
  suffix?: string
  delay?: number
  className?: string
}) {
  const [visible, setVisible] = useState(false)
  const count = useCounter(value, 1600, visible)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay + 800)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className={`absolute bg-surface/90 dark:bg-neutral-900/90 backdrop-blur-md border border-border-default rounded-2xl px-4 py-3 shadow-xl transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      <p className="text-2xl font-display font-bold text-brand-500 leading-none">
        {count}{suffix}
      </p>
      <p className="text-xs text-on-surface-muted mt-0.5 whitespace-nowrap">{label}</p>
    </div>
  )
}

// Marquee ticker
const TICKER_ITEMS = ['Graphic Design', 'Web Development', 'UI/UX Design', 'Video Production', 'Brand Identity', 'Motion Graphics']

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-border-default py-3 bg-surface-raised">
      <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap w-max">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-muted flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-brand-500 inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HeroSection({data, locale}: {data: HeroData | null; locale: string}) {
  const t = useTranslations('hero')
  const l = locale as 'en' | 'th' | 'lo'
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const heading = data?.heroHeading?.[l] || t('tagline')
  const subheading = data?.heroSubheading?.[l] || t('subtitle')
  const ctaText = data?.heroCtaText?.[l] || t('cta')
  const ctaLink = data?.heroCtaLink || `/${locale}/gallery`

  // Particle canvas effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: {x: number; y: number; vx: number; vy: number; r: number; o: number}[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(82, 130, 255, ${p.o})`
        ctx.fill()
      })
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(82, 130, 255, ${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Split heading for word-by-word animation
  const words = heading.split(' ')

  return (
    <>
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-400/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent-400/10 blur-[80px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text side */}
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50/80 dark:bg-brand-950/50 backdrop-blur-sm px-4 py-1.5 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
                  </span>
                  <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-widest">
                    DotDeep Design Studio
                  </span>
                </div>
              </ScrollReveal>

              <h1 className={`text-fluid-3xl lg:text-fluid-4xl font-bold leading-[1.06] tracking-tight mb-6 ${locale === 'lo' ? 'font-lao' : 'font-display'}`}>
                {words.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden"
                    style={{marginRight: '0.25em'}}
                  >
                    <span
                      className="inline-block"
                      style={{
                        animation: `slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both`,
                        animationDelay: `${i * 80 + 200}ms`,
                      }}
                    >
                      {i === words.length - 1 ? (
                        <span className="text-brand-500">{word}</span>
                      ) : word}
                    </span>
                  </span>
                ))}
              </h1>

              <ScrollReveal delay={400}>
                <p className={`text-lg lg:text-xl text-on-surface-muted max-w-lg mb-10 leading-relaxed ${locale === 'lo' ? 'font-lao' : ''}`}>
                  {subheading}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={ctaLink}
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-7 py-3.5 font-semibold transition-all hover:shadow-xl hover:shadow-brand-500/30 active:scale-[0.97]"
                  >
                    {ctaText}
                    <svg
                      width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path d="m5 12 7-7M5 5h7v7" />
                    </svg>
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 rounded-full border border-border-default hover:border-brand-300 px-7 py-3.5 font-medium transition-all hover:bg-brand-50 dark:hover:bg-brand-950/30"
                  >
                    {t('contact')}
                  </Link>
                </div>
              </ScrollReveal>

              {/* Trust indicators */}
              <ScrollReveal delay={600}>
                <div className="flex items-center gap-6 mt-10 pt-8 border-t border-border-default">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-surface bg-gradient-to-br from-brand-300 to-brand-600"
                        style={{zIndex: 4 - i}}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-on-surface-muted">
                    <span className="font-semibold text-on-surface">50+</span> happy clients
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent-500">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                    <span className="text-xs text-on-surface-muted ml-1">5.0</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Visual side */}
            <ScrollReveal delay={200} className="relative">
              <div className="relative">
                {/* Main image card */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 shadow-2xl">
                  {data?.heroImage?.asset?._ref ? (
                    <SanityImage
                      source={data.heroImage}
                      alt={heading}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Placeholder grid of colored squares */}
                      <div className="grid grid-cols-3 gap-3 p-8 opacity-30">
                        {[...Array(9)].map((_, i) => (
                          <div
                            key={i}
                            className="aspect-square rounded-xl"
                            style={{
                              background: `oklch(${0.5 + i * 0.04} 0.2 ${264 + i * 10})`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating stat badges */}
                <FloatingBadge value={50} suffix="+" label="Projects Done" delay={0} className="-top-4 -left-4 lg:-left-8" />
                <FloatingBadge value={3} suffix="+" label="Years Experience" delay={200} className="-bottom-4 -right-4 lg:-right-8" />

                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-[2rem] border border-brand-200/40 dark:border-brand-700/30 pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <Ticker />

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}
