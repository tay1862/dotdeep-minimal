import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'
import {locales} from '@/i18n/config'

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  })
  const sitemap: MetadataRoute.Sitemap = []
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

  for (const locale of locales) {
    sitemap.push({
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      priority: locale === 'en' ? 1 : 0.9,
      changeFrequency: 'weekly',
    })
  }

  if (allPostsAndPages != null && allPostsAndPages.data.length != 0) {
    for (const p of allPostsAndPages.data) {
      for (const locale of locales) {
        if (p._type === 'page') {
          sitemap.push({
            lastModified: p._updatedAt || new Date(),
            priority: 0.7,
            changeFrequency: 'monthly',
            url: `${siteUrl}/${locale}/${p.slug}`,
          })
        }

        if (p._type === 'post') {
          sitemap.push({
            lastModified: p._updatedAt || new Date(),
            priority: 0.6,
            changeFrequency: 'weekly',
            url: `${siteUrl}/${locale}/posts/${p.slug}`,
          })
        }
      }
    }
  }

  return sitemap
}
