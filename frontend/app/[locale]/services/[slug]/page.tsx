import {notFound} from 'next/navigation'
import {toPlainText} from 'next-sanity'

import {buildPageMetadata} from '@/app/lib/metadata'
import {sanityFetch} from '@/sanity/lib/live'
import {client} from '@/sanity/lib/client'
import {getLocalizedValue} from '@/sanity/lib/localized'
import {serviceBySlugQuery, serviceSlugs} from '@/sanity/lib/queries'
import ServiceDetail from '@/app/components/services/ServiceDetail'

export async function generateStaticParams() {
  const data = await client.fetch(serviceSlugs)
  return (data || []).map((s: {slug: string}) => ({slug: s.slug}))
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const {data: service} = await sanityFetch({query: serviceBySlugQuery, params: {slug}})
  if (!service) return {}
  const l = locale as 'en' | 'th' | 'lo'
  const description = getLocalizedValue(service.description, l)
  const shortDescription = service.shortDescription?.[l] || service.shortDescription?.en || null

  return buildPageMetadata({
    locale,
    pathname: `/services/${slug}`,
    title: `${service.title?.[l] || service.title?.en || 'Service'} — DotDeep Design`,
    description: shortDescription || (description ? toPlainText(description) : null),
  })
}

export default async function ServicePage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const {data: service} = await sanityFetch({query: serviceBySlugQuery, params: {slug}})
  if (!service) notFound()

  return <ServiceDetail service={service} locale={locale} />
}
