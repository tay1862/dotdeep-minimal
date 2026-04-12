import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {Noto_Sans_Lao, Noto_Sans_Thai} from 'next/font/google'
import {toPlainText} from 'next-sanity'

import * as demo from '@/sanity/lib/demo'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

/**
 * Generate metadata for the page.
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : siteUrl
        ? new URL(siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    applicationName: title,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [{url: '/icon.png', type: 'image/png'}],
      shortcut: ['/favicon.ico'],
      apple: [{url: '/icon.png'}],
    },
    openGraph: {
      type: 'website',
      siteName: title,
      title,
      description: toPlainText(description),
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: toPlainText(description),
      images: ogImage ? [ogImage] : [],
    },
  }
}

/* ===== Fonts ===== */

// Display font: General Sans (self-hosted)
const generalSans = localFont({
  src: [
    {path: '../public/fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal'},
    {path: '../public/fonts/GeneralSans-Semibold.woff2', weight: '600', style: 'normal'},
    {path: '../public/fonts/GeneralSans-Bold.woff2', weight: '700', style: 'normal'},
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

// Body font: Satoshi (self-hosted)
const satoshi = localFont({
  src: [
    {path: '../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal'},
    {path: '../public/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal'},
    {path: '../public/fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal'},
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

// Lao font: Hinsiew
const hinsiew = localFont({
  src: [
    {path: '../public/fonts/Hinsiew-Regular.otf', weight: '400', style: 'normal'},
    {path: '../public/fonts/Hinsiew-Bold.otf', weight: '700', style: 'normal'},
    {path: '../public/fonts/Hinsiew-SemiBoldItalic.otf', weight: '600', style: 'italic'},
  ],
  variable: '--font-hinsiew',
  display: 'swap',
})

// Thai font: Noto Sans Thai
const notoSansThai = Noto_Sans_Thai({
  variable: '--font-noto-thai',
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const notoSansLao = Noto_Sans_Lao({
  variable: '--font-noto-lao',
  subsets: ['lao'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      suppressHydrationWarning
      className={`${generalSans.variable} ${satoshi.variable} ${hinsiew.variable} ${notoSansThai.variable} ${notoSansLao.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
