import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {sanityFetch} from '@/sanity/lib/live'
import {allPricingQuery} from '@/sanity/lib/queries'
import PricingGrid from '@/app/components/pricing/PricingGrid'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'pricing'})
  return buildPageMetadata({
    locale,
    pathname: '/pricing',
    title: `${t('title')} — DotDeep Design`,
    description: t('subtitle'),
  })
}

export default async function PricingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const {data: items} = await sanityFetch({query: allPricingQuery})

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <PricingGrid items={items || []} locale={locale} />
      </div>
    </section>
  )
}
