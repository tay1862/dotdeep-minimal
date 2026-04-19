/**
 * Locale utilities for language-specific styling and configuration
 */

export function getFontClass(locale: string, defaultFont: string = 'font-display'): string {
  if (locale === 'lo') {
    return 'font-lao'
  }
  if (locale === 'th') {
    return 'font-thai'
  }
  return defaultFont
}

export function getHeadingClasses(locale: string, baseClasses: string = ''): string {
  const fontClass = getFontClass(locale, 'font-display')
  return `${fontClass} ${baseClasses}`
}

export function getBodyClasses(locale: string, baseClasses: string = ''): string {
  const fontClass = locale === 'lo' ? 'font-lao' : locale === 'th' ? 'font-thai' : ''
  return `${fontClass} ${baseClasses}`.trim()
}
