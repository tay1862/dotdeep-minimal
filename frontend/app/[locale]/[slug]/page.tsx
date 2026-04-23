import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import PageBuilderPage from '@/app/components/PageBuilder'
import {buildPageMetadata} from '@/app/lib/metadata'
import {sanityFetch} from '@/sanity/lib/live'
import {client} from '@/sanity/lib/client'
import {getPageQuery, pagesSlugs} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'

type Props = {
  params: Promise<{locale: string; slug: string}>
}

export async function generateStaticParams() {
  return client.fetch(pagesSlugs)
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: params.slug},
    stega: false,
  })

  if (!page?._id) {
    return {}
  }

  return buildPageMetadata({
    locale: params.locale,
    pathname: `/${params.slug}`,
    title: page.name || page.heading || 'Page',
    description: page.subheading || page.heading || null,
  })
}

export default async function CmsPage(props: Props) {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: params.slug},
  })

  if (!page?._id) {
    notFound()
  }

  return (
    <div className="my-12 lg:my-24">
      <div className="container">
        <div className="pb-6 border-b border-border-default">
          <div className="max-w-3xl">
            <h1 className="text-fluid-3xl font-display font-bold">{page.heading || page.name || 'Untitled page'}</h1>
            {page.subheading && (
              <p className="mt-4 text-fluid-base leading-relaxed text-on-surface-muted">
                {page.subheading}
              </p>
            )}
          </div>
        </div>
      </div>
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  )
}
