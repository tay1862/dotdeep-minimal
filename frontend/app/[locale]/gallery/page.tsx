import {getTranslations} from 'next-intl/server'
import {sanityFetch} from '@/sanity/lib/live'
import {allProjectsQuery} from '@/sanity/lib/queries'
import GalleryGrid from '@/app/components/gallery/GalleryGrid'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'gallery'})
  return {
    title: `${t('title')} — DotDeep Design`,
    description: `DotDeep Design portfolio — graphic design, web development, UI/UX design`,
  }
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
