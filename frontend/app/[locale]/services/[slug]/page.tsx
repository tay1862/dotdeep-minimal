import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {client} from '@/sanity/lib/client'
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
  return {
    title: `${service.title?.[l] || service.title?.en || 'Service'} — DotDeep Design`,
  }
}

export default async function ServicePage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const {data: service} = await sanityFetch({query: serviceBySlugQuery, params: {slug}})
  if (!service) notFound()

  return <ServiceDetail service={service} locale={locale} />
}
