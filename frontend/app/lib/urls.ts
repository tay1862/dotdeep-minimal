import {defaultLocale, locales} from '@/i18n/config'

const localePrefixPattern = new RegExp(`^/(${locales.join('|')})(?:/|$)`)

function normalizePath(pathname = '/') {
  const trimmed = pathname.trim()

  if (!trimmed || trimmed === '/') {
    return '/'
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeadingSlash.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/'
}

export function getSiteOrigin() {
  const rawOrigin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'http://localhost:3000'

  return rawOrigin.startsWith('http') ? rawOrigin.replace(/\/$/, '') : `https://${rawOrigin.replace(/\/$/, '')}`
}

export function getAbsoluteUrl(pathname = '/') {
  return new URL(normalizePath(pathname), `${getSiteOrigin()}/`).toString()
}

export function buildLocalePath(locale: string, pathname = '/') {
  const normalizedPath = normalizePath(pathname)

  if (localePrefixPattern.test(normalizedPath)) {
    return normalizedPath
  }

  if (normalizedPath === '/') {
    return `/${locale}`
  }

  return `/${locale}${normalizedPath}`
}

export function getLocaleAlternates(pathname = '/') {
  const normalizedPath = normalizePath(pathname)

  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, getAbsoluteUrl(buildLocalePath(locale, normalizedPath))]),
    ),
    default: getAbsoluteUrl(buildLocalePath(defaultLocale, normalizedPath)),
  }
}

export function sanitizeInternalPath(value?: string | null) {
  if (!value) return null

  const normalizedValue = normalizePath(value)
  if (!normalizedValue.startsWith('/') || normalizedValue.startsWith('//')) {
    return null
  }

  return normalizedValue
}

export function resolveLocalizedInternalPath(value: string | null | undefined, locale: string) {
  const normalizedValue = sanitizeInternalPath(value)
  if (!normalizedValue) {
    return null
  }

  return buildLocalePath(locale, normalizedValue)
}

export function sanitizeExternalUrl(
  value?: string | null,
  allowedProtocols: string[] = ['http:', 'https:'],
) {
  if (!value) return null

  try {
    const url = new URL(value)

    if (!allowedProtocols.includes(url.protocol)) {
      return null
    }

    return url.toString()
  } catch {
    return null
  }
}

export function buildMailtoHref(email?: string | null) {
  if (!email) return null

  const normalizedEmail = email.trim()
  if (!normalizedEmail) return null

  return `mailto:${normalizedEmail}`
}

export function buildPhoneHref(phone?: string | null) {
  if (!phone) return null

  const normalizedPhone = phone.replace(/[^\d+]/g, '')
  if (!normalizedPhone) return null

  return `tel:${normalizedPhone}`
}

export function buildWhatsAppUrl(value?: string | null) {
  if (!value) return null

  const digits = value.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : null
}

export function buildMessengerUrl(value?: string | null) {
  if (!value) return null

  const externalUrl = sanitizeExternalUrl(value)

  if (externalUrl) {
    try {
      const url = new URL(externalUrl)
      const normalizedPath = url.pathname.replace(/^\/+|\/+$/g, '')
      return normalizedPath ? `https://m.me/${normalizedPath}` : null
    } catch {
      return null
    }
  }

  const sanitizedHandle = value.replace(/^@/, '').replace(/[^\w.-]/g, '')
  return sanitizedHandle ? `https://m.me/${sanitizedHandle}` : null
}

export function buildLineUrl(value?: string | null) {
  if (!value) return null

  const externalUrl = sanitizeExternalUrl(value)
  if (externalUrl) {
    return externalUrl
  }

  const normalizedValue = value.trim().replace(/^@/, '')
  return normalizedValue ? `https://line.me/ti/p/${normalizedValue}` : null
}
