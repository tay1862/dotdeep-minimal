import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {sanityFetch} from '@/sanity/lib/live'
import {allTeamQuery} from '@/sanity/lib/queries'
import TeamGrid from '@/app/components/team/TeamGrid'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'team'})
  return buildPageMetadata({
    locale,
    pathname: '/team',
    title: `${t('title')} — DotDeep Design`,
    description: t('subtitle'),
  })
}

export default async function TeamPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const {data: team} = await sanityFetch({query: allTeamQuery})

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <TeamGrid team={team || []} locale={locale} />
      </div>
    </section>
  )
}
