'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

import {linkResolver} from '@/sanity/lib/utils'
import {DereferencedLink} from '@/sanity/lib/types'
import {defaultLocale, locales} from '@/i18n/config'

interface ResolvedLinkProps {
  link: DereferencedLink
  children: React.ReactNode
  className?: string
}

export default function ResolvedLink({link, children, className}: ResolvedLinkProps) {
  const pathname = usePathname()
  const localeFromPath = pathname.split('/')[1]
  const locale = locales.includes(localeFromPath as (typeof locales)[number])
    ? localeFromPath
    : defaultLocale

  // resolveLink() is used to determine the type of link and return the appropriate URL.
  const resolvedLink = linkResolver(link, locale)

  if (typeof resolvedLink === 'string') {
    const isExternal = /^https?:\/\//.test(resolvedLink)

    if (isExternal) {
      return (
        <a
          href={resolvedLink}
          target={link?.openInNewTab ? '_blank' : undefined}
          rel={link?.openInNewTab ? 'noopener noreferrer' : undefined}
          className={className}
        >
          {children}
        </a>
      )
    }

    return (
      <Link
        href={resolvedLink}
        className={className}
      >
        {children}
      </Link>
    )
  }
  return <>{children}</>
}
