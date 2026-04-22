'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {useState, useEffect} from 'react'
import {usePathname} from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

const navItems = [
  {key: 'about', href: '/about'},
  {key: 'services', href: '/services'},
  {key: 'gallery', href: '/gallery'},
  {key: 'pricing', href: '/pricing'},
  {key: 'contact', href: '/contact'},
] as const

export default function Header({locale}: {locale: string}) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isActive = (href: string) => pathname.startsWith(`/${locale}${href}`)

  return (
    <header
      className={`fixed z-50 inset-x-0 top-0 transition-all duration-500 ${
        scrolled ? 'bg-surface/80 backdrop-blur-2xl shadow-[0_1px_0_var(--color-border-default)]' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-border-default group-hover:ring-brand-300 transition-all">
              <Image src="/images/dotdeep-logo.png" alt="DotDeep Design" fill className="object-cover" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
              Dot<span className="text-brand-500">Deep</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      active ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/50' : 'text-on-surface-muted hover:text-on-surface hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    {t(item.key)}
                    {active && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500" />}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
            <Link href={`/${locale}/contact`} className="hidden md:inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-brand-500/25 active:scale-[0.97]">
              {t('contact')}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Toggle menu">
              <span className="flex flex-col gap-[5px] w-5">
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-surface/95 backdrop-blur-2xl border-t border-border-default">
          <div className="container py-5">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.key}>
                    <Link href={`/${locale}${item.href}`} className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${active ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/50' : 'text-on-surface hover:bg-neutral-100 dark:hover:bg-neutral-800/60'}`}>
                      {t(item.key)}
                      {active && <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-500"><path d="m5 8 3 3 5-5" /></svg>}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 pt-4 border-t border-border-default">
              <Link href={`/${locale}/contact`} className="flex items-center justify-center w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition-colors">
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
