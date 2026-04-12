import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'
import {sanityFetch} from '@/sanity/lib/live'
import {client} from '@/sanity/lib/client'
import {projectBySlugQuery, projectSlugs} from '@/sanity/lib/queries'
import ProjectDetail from '@/app/components/gallery/ProjectDetail'

export async function generateStaticParams() {
  const data = await client.fetch(projectSlugs)
  return (data || []).map((p: {slug: string}) => ({slug: p.slug}))
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const {data: project} = await sanityFetch({query: projectBySlugQuery, params: {slug}})
  if (!project) return {}
  const l = locale as 'en' | 'th' | 'lo'
  return {
    title: `${project.title?.[l] || project.title?.en || 'Project'} — DotDeep Design`,
  }
}

export default async function ProjectPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const {data: project} = await sanityFetch({query: projectBySlugQuery, params: {slug}})
  if (!project) notFound()

  return <ProjectDetail project={project} locale={locale} />
}
