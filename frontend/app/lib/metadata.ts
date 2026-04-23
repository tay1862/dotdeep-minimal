import type {Metadata} from 'next'

import {defaultLocale} from '@/i18n/config'
import {getAbsoluteUrl, getLocaleAlternates, buildLocalePath} from '@/app/lib/urls'

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  image,
  type = 'website',
}: {
  locale: string
  pathname: string
  title: string
  description?: string | null
  image?: NonNullable<Metadata['openGraph']>['images']
  type?: 'website' | 'article'
}): Metadata {
  const normalizedDescription = description?.trim() || undefined
  const alternates = getLocaleAlternates(pathname)
  const canonicalPath = buildLocalePath(locale, pathname)
  const images = Array.isArray(image) ? image : image ? [image] : undefined

  return {
    title,
    description: normalizedDescription,
    alternates: {
      canonical: getAbsoluteUrl(canonicalPath),
      languages: {
        ...alternates.languages,
        'x-default': alternates.default,
      },
    },
    openGraph: {
      type,
      title,
      description: normalizedDescription,
      url: getAbsoluteUrl(canonicalPath),
      locale,
      images,
    },
    twitter: {
      card: images?.length ? 'summary_large_image' : 'summary',
      title,
      description: normalizedDescription,
      images,
    },
  }
}

export function buildRootRedirectAlternates(pathname = '/') {
  const alternates = getLocaleAlternates(pathname)

  return {
    canonical: getAbsoluteUrl(buildLocalePath(defaultLocale, pathname)),
    languages: {
      ...alternates.languages,
      'x-default': alternates.default,
    },
  } satisfies Metadata['alternates']
}
