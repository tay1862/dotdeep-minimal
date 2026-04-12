'use client'

import {useTranslations} from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/app/components/ScrollReveal'

interface Project {
  _id: string
  title?: {en?: string; th?: string; lo?: string} | null
  slug?: string | null
  category?: string | null
  coverImage?: {asset?: {_ref?: string}} | null
  client?: string | null
  completedAt?: string | null
}

export default function FeaturedProjects({projects, locale}: {projects: Project[]; locale: string}) {
  const t = useTranslations('sections')
  const tGallery = useTranslations('gallery')
  const l = locale as 'en' | 'th' | 'lo'

  const categoryLabel = (cat: string) => {
    const map: Record<string, string> = {
      graphic: tGallery('graphic'),
      web: tGallery('web'),
      uiux: tGallery('uiux'),
      video: tGallery('video'),
    }
    return map[cat] || cat
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">Portfolio</p>
              <h2 className="text-fluid-2xl font-display font-bold">{t('featuredWork')}</h2>
            </div>
            <Link
              href={`/${locale}/gallery`}
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
            >
              {tGallery('viewProject')}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 5 4 4-4 4M5 9h8"/></svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project, i) => (
            <ScrollReveal key={project._id} delay={i * 80}>
              <Link
                href={`/${locale}/gallery/${project.slug || ''}`}
                className="group block rounded-2xl overflow-hidden border border-[var(--border-default)] hover:border-brand-300 transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  {project.coverImage?.asset?._ref ? (
                    <Image
                      src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${project.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                      alt={project.title?.[l] || project.title?.en || ''}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                      <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="40" height="40" rx="4"/><circle cx="16" cy="16" r="4"/><path d="m4 32 12-12 20 20"/></svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    {project.category && (
                      <span className="text-xs font-medium text-brand-500 bg-brand-50 dark:bg-brand-950/50 rounded-full px-2.5 py-0.5">
                        {categoryLabel(project.category)}
                      </span>
                    )}
                    {project.client && (
                      <span className="text-xs text-[var(--on-surface-muted)]">{project.client}</span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold group-hover:text-brand-500 transition-colors">
                    {project.title?.[l] || project.title?.en || 'Untitled'}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href={`/${locale}/gallery`}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-500"
          >
            {tGallery('viewProject')}
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 5 4 4-4 4M5 9h8"/></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
