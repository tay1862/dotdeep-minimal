import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {sanityFetch} from '@/sanity/lib/live'
import {aboutPageQuery, allTeamQuery} from '@/sanity/lib/queries'
import AboutContent from '@/app/components/about/AboutContent'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'about'})
  return buildPageMetadata({
    locale,
    pathname: '/about',
    title: `${t('title')} — DotDeep Design`,
    description: t('description'),
  })
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const [{data: about}, {data: team}] = await Promise.all([
    sanityFetch({query: aboutPageQuery}),
    sanityFetch({query: allTeamQuery}),
  ])

  return <AboutContent about={about} team={team || []} locale={locale} />
}
