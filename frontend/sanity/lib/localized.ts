import type {Locale} from '@/i18n/config'
import type {BlockContent} from '@/sanity.types'

export type LocalizedValue<T> = Partial<Record<Locale, T>> | null | undefined
export type LocalizedString = LocalizedValue<string | null>
export type LocalizedPortableText = LocalizedValue<BlockContent | null>

export function getLocalizedValue<T>(
  value: LocalizedValue<T>,
  locale: string,
  fallbackValue: T | null = null,
) {
  if (!value) {
    return fallbackValue
  }

  const localizedValue = value[locale as Locale]
  if (localizedValue != null) {
    return localizedValue
  }

  const defaultValue = value.en
  return defaultValue != null ? defaultValue : fallbackValue
}
