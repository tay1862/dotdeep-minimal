import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {notFound} from 'next/navigation'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FloatingButtons from '@/app/components/FloatingButtons'
import DraftModeToast from '@/app/components/DraftModeToast'
import {SanityLive} from '@/sanity/lib/live'
import {handleError} from '@/app/client-utils'
import {locales} from '@/i18n/config'
import {sanityFetch} from '@/sanity/lib/live'
import {siteSettingsQuery} from '@/sanity/lib/queries'

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  if (!hasLocale(locales, locale)) notFound()

  const {isEnabled: isDraftMode} = await draftMode()
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default
  const {data: settings} = await sanityFetch({query: siteSettingsQuery})

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div data-locale={locale} className="min-h-screen flex flex-col">
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <SanityLive onError={handleError} />
        <Header locale={locale} />
        <main className="flex-1 pt-20">{children}</main>
        <Footer locale={locale} settings={settings} />
        <FloatingButtons settings={settings} />
      </div>
    </NextIntlClientProvider>
  )
}
