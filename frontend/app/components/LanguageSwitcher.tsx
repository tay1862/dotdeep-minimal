'use client'

import {startTransition} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {locales, localeNames, type Locale} from '@/i18n/config'

export default function LanguageSwitcher({locale}: {locale: string}) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    startTransition(() => {
      router.push(segments.join('/'))
    })
  }

  return (
    <div className="flex items-center gap-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full p-0.5">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
            locale === loc
              ? 'bg-brand-500 text-white'
              : 'text-on-surface-muted hover:text-on-surface'
          }`}
          aria-label={`Switch language to ${localeNames[loc]}`}
          aria-pressed={locale === loc}
          title={localeNames[loc]}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
