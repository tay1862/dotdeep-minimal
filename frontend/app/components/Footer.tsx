'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'

const socialLinks = [
  {name: 'Facebook', href: 'https://facebook.com/dotdeep', icon: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )},
  {name: 'Instagram', href: 'https://instagram.com/dotdeep', icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
  )},
  {name: 'TikTok', href: 'https://tiktok.com/@dotdeep', icon: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.23V9.12a8.16 8.16 0 0 0 3.85.96V6.69z"/></svg>
  )},
]

export default function Footer({locale}: {locale: string}) {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  const navItems = [
    {label: tNav('about'), href: `/${locale}/about`},
    {label: tNav('services'), href: `/${locale}/services`},
    {label: tNav('gallery'), href: `/${locale}/gallery`},
    {label: tNav('pricing'), href: `/${locale}/pricing`},
    {label: tNav('contact'), href: `/${locale}/contact`},
  ]

  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <Image
                src="/images/dotdeep-main-logo.png"
                alt="DotDeep Design"
                width={140}
                height={40}
                className="h-8 w-auto dark:invert"
              />
            </Link>
            <p className="text-sm text-[var(--on-surface-muted)] leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--on-surface-muted)] hover:text-brand-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              {t('getInTouch')}
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--on-surface-muted)]">
              <li>
                <a href="mailto:hello@dotdeep.com" className="hover:text-brand-500 transition-colors">
                  hello@dotdeep.com
                </a>
              </li>
              <li>
                <a href="tel:+8562012345678" className="hover:text-brand-500 transition-colors">
                  +856 20 1234 5678
                </a>
              </li>
              <li>Vientiane, Laos</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              {t('followUs')}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[var(--on-surface-muted)] hover:bg-brand-500 hover:text-white transition-colors"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[var(--border-default)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--on-surface-muted)]">
            &copy; {new Date().getFullYear()} DotDeep Design. {t('rights')}
          </p>
          <p className="text-xs text-[var(--on-surface-muted)]">
            Crafted with ♠ in Vientiane
          </p>
        </div>
      </div>
    </footer>
  )
}
