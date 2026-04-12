import {getTranslations} from 'next-intl/server'
import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery, allServicesQuery, allTestimonialsQuery} from '@/sanity/lib/queries'
import HeroSection from '@/app/components/home/HeroSection'
import FeaturedProjects from '@/app/components/home/FeaturedProjects'
import ServicesSummary from '@/app/components/home/ServicesSummary'
import StatsBar from '@/app/components/home/StatsBar'
import CTASection from '@/app/components/home/CTASection'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'hero'})
  return {
    title: `DotDeep Design — ${t('tagline')}`,
    description: t('subtitle'),
  }
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params

  const [{data: homePage}, {data: services}] = await Promise.all([
    sanityFetch({query: homePageQuery}),
    sanityFetch({query: allServicesQuery}),
  ])

  return (
    <>
      <HeroSection data={homePage} locale={locale} />
      {homePage?.stats && homePage.stats.length > 0 && (
        <StatsBar stats={homePage.stats} locale={locale} />
      )}
      {homePage?.featuredProjects && homePage.featuredProjects.length > 0 && (
        <FeaturedProjects projects={homePage.featuredProjects} locale={locale} />
      )}
      {services && services.length > 0 && (
        <ServicesSummary services={services} locale={locale} heading={homePage?.servicesHeading} />
      )}
      <CTASection data={homePage} locale={locale} />
    </>
  )
}
