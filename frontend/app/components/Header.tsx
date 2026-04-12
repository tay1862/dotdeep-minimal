'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {useState, useEffect} from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed z-50 inset-x-0 top-0 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-xl shadow-[0_1px_0_var(--color-border-default)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/images/dotdeep-logo.png"
              alt="DotDeep Design"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
              DotDeep
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-sm font-medium text-on-surface-muted hover:text-on-surface transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 after:transition-all hover:after:w-full"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              className="hidden md:inline-flex items-center gap-2 bg-brand-500 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-brand-600 transition-colors"
            >
              {t('contact')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-on-surface transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 bg-on-surface transition-opacity ${mobileOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 bg-on-surface transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-xl border-t border-border-default">
          <div className="container py-6">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileOpen(false)}
                    className="block text-lg font-medium py-2 text-on-surface hover:text-brand-500 transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
