import {MetadataRoute} from 'next'

import {getSiteOrigin} from '@/app/lib/urls'
import {locales} from '@/i18n/config'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  })
  const staticRoutes = ['/', '/about', '/services', '/gallery', '/pricing', '/team', '/contact'] as const
  const reservedSlugs = new Set(staticRoutes.map((route) => route.replace(/^\//, '')).filter(Boolean))
  const sitemap: MetadataRoute.Sitemap = []
  const siteUrl = getSiteOrigin()

  for (const locale of locales) {
    for (const route of staticRoutes) {
      const localizedPath = route === '/' ? `/${locale}` : `/${locale}${route}`

      sitemap.push({
        url: `${siteUrl}${localizedPath}`,
        lastModified: new Date(),
        priority: route === '/' ? (locale === 'en' ? 1 : 0.9) : 0.8,
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
      })
    }
  }

  if (allPostsAndPages != null && allPostsAndPages.data.length != 0) {
    for (const p of allPostsAndPages.data) {
      for (const locale of locales) {
        if (p._type === 'page' && p.slug && !reservedSlugs.has(p.slug)) {
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

        if (p._type === 'project') {
          sitemap.push({
            lastModified: p._updatedAt || new Date(),
            priority: 0.7,
            changeFrequency: 'monthly',
            url: `${siteUrl}/${locale}/gallery/${p.slug}`,
          })
        }

        if (p._type === 'service') {
          sitemap.push({
            lastModified: p._updatedAt || new Date(),
            priority: 0.7,
            changeFrequency: 'monthly',
            url: `${siteUrl}/${locale}/services/${p.slug}`,
          })
        }
      }
    }
  }

  return sitemap
}
