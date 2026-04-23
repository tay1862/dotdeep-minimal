import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {sanityFetch} from '@/sanity/lib/live'
import {allProjectsQuery} from '@/sanity/lib/queries'
import GalleryGrid from '@/app/components/gallery/GalleryGrid'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'gallery'})
  return buildPageMetadata({
    locale,
    pathname: '/gallery',
    title: `${t('title')} — DotDeep Design`,
    description: t('description'),
  })
}

export default async function GalleryPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const {data: projects} = await sanityFetch({query: allProjectsQuery})

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <GalleryGrid projects={projects || []} locale={locale} />
      </div>
    </section>
  )
}
