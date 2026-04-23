'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'

import {
  buildLineUrl,
  buildMailtoHref,
  buildPhoneHref,
  buildWhatsAppUrl,
  sanitizeExternalUrl,
} from '@/app/lib/urls'

interface SiteSettings {
  contactEmail?: string | null
  contactPhone?: string | null
  address?: {en?: string; th?: string; lo?: string} | null
  socialLinks?: {
    facebook?: string | null
    instagram?: string | null
    tiktok?: string | null
    whatsapp?: string | null
    line?: string | null
    linkedin?: string | null
  } | null
}

const SocialIcon = {
  facebook: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
    </svg>
  ),
  tiktok: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.23V9.12a8.16 8.16 0 0 0 3.85.96V6.69z"/>
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
}

export default function Footer({locale, settings}: {locale: string; settings?: SiteSettings | null}) {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tContact = useTranslations('contact')
  const l = locale as 'en' | 'th' | 'lo'

  const navItems = [
    {label: tNav('about'), href: `/${locale}/about`},
    {label: tNav('services'), href: `/${locale}/services`},
    {label: tNav('gallery'), href: `/${locale}/gallery`},
    {label: tNav('pricing'), href: `/${locale}/pricing`},
    {label: tNav('contact'), href: `/${locale}/contact`},
  ]

  const email = settings?.contactEmail
  const phone = settings?.contactPhone
  const address = settings?.address?.[l] || settings?.address?.en
  const social = settings?.socialLinks
  const emailHref = buildMailtoHref(email)
  const phoneHref = buildPhoneHref(phone)
  const whatsappHref = buildWhatsAppUrl(social?.whatsapp)
  const lineHref = buildLineUrl(social?.line)

  const activeSocials = [
    social?.facebook ? {key: 'facebook', href: sanitizeExternalUrl(social.facebook)} : null,
    social?.instagram ? {key: 'instagram', href: sanitizeExternalUrl(social.instagram)} : null,
    social?.tiktok ? {key: 'tiktok', href: sanitizeExternalUrl(social.tiktok)} : null,
    social?.linkedin ? {key: 'linkedin', href: sanitizeExternalUrl(social.linkedin)} : null,
  ].filter((item): item is {key: keyof typeof SocialIcon; href: string} => !!item?.href)

  return (
    <footer className="border-t border-border-default bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-5">
              <Image
                src="/images/dotdeep-main-logo.png"
                alt="DotDeep Design"
                width={140}
                height={40}
                className="h-8 w-auto dark:invert"
              />
            </Link>
            <p className="text-sm text-on-surface-muted leading-relaxed max-w-xs mb-5">
              {t('tagline')}
            </p>
            {/* Social icons */}
            {activeSocials.length > 0 && (
              <div className="flex gap-2">
                {activeSocials.map(({key, href}) =>
                  SocialIcon[key] ? (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-on-surface-muted hover:bg-brand-500 hover:text-white transition-all"
                      aria-label={key}
                    >
                      {SocialIcon[key]}
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-5 text-on-surface-muted">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-on-surface-muted hover:text-brand-500 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-500 transition-all duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-5 text-on-surface-muted">
              {t('getInTouch')}
            </h4>
            <ul className="space-y-3 text-sm text-on-surface-muted">
              {email && emailHref && (
                <li>
                  <a href={emailHref} className="hover:text-brand-500 transition-colors flex items-center gap-2">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="shrink-0">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    {email}
                  </a>
                </li>
              )}
              {phone && phoneHref && (
                <li>
                  <a href={phoneHref} className="hover:text-brand-500 transition-colors flex items-center gap-2">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {phone}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-2">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="shrink-0 mt-0.5">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {address}
                </li>
              )}
              {!email && !phone && !address && (
                <li className="text-xs italic opacity-60">Contact info managed via Sanity CMS</li>
              )}
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-5 text-on-surface-muted">
              {t('followUs')}
            </h4>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white px-4 py-3 text-sm font-medium transition-all group"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.257-.154-2.868.852.852-2.868-.154-.257A8 8 0 1 1 12 20z"/>
                </svg>
                {tContact('whatsapp')}
              </a>
            )}
            {lineHref && (
              <a
                href={lineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2.5 rounded-xl bg-[#06C755]/10 hover:bg-[#06C755] text-[#06C755] hover:text-white px-4 py-3 text-sm font-medium transition-all"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                {tContact('line')}
              </a>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on-surface-muted">
            &copy; {new Date().getFullYear()} DotDeep Design. {t('rights')}
          </p>
          <p className="text-xs text-on-surface-muted">{t('madeIn')}</p>
        </div>
      </div>
    </footer>
  )
}
