'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'
import Link from 'next/link'
import ScrollReveal from '@/app/components/ScrollReveal'
import SanityImage from '@/app/components/SanityImage'

interface Project {
  _id: string
  title?: {en?: string; th?: string; lo?: string} | null
  slug?: string | null
  category?: string | null
  coverImage?: {asset?: {_ref?: string}} | null
  client?: string | null
  techStack?: string[] | null
  featured?: boolean | null
  completedAt?: string | null
}

const categories = ['all', 'graphic', 'web', 'uiux', 'video'] as const

export default function GalleryGrid({projects, locale}: {projects: Project[]; locale: string}) {
  const t = useTranslations('gallery')
  const l = locale as 'en' | 'th' | 'lo'
  const [active, setActive] = useState<string>('all')

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active)

  const catLabels: Record<string, string> = {
    all: t('all'),
    graphic: t('graphic'),
    web: t('web'),
    uiux: t('uiux'),
    video: t('video'),
  }

  return (
    <>
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">Portfolio</p>
          <h1 className="text-fluid-2xl font-display font-bold">{t('title')}</h1>
        </div>
      </ScrollReveal>

      {/* Category Filter */}
      <ScrollReveal>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-[var(--on-surface-muted)] hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {catLabels[cat]}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Masonry-ish Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filtered.map((project, i) => (
          <ScrollReveal key={project._id} delay={i * 60}>
            <Link
              href={`/${locale}/gallery/${project.slug || ''}`}
              className="group block break-inside-avoid rounded-2xl overflow-hidden border border-[var(--border-default)] hover:border-brand-300 hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                {project.coverImage?.asset?._ref ? (
                  <SanityImage
                    source={project.coverImage}
                    alt={project.title?.[l] || project.title?.en || ''}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="40" height="40" rx="4"/><circle cx="16" cy="16" r="4"/><path d="m4 32 12-12 20 20"/></svg>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-sm font-medium flex items-center gap-1">
                    {t('viewProject')}
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 10 4-4-4-4"/></svg>
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  {project.category && (
                    <span className="text-xs font-medium text-brand-500">{catLabels[project.category] || project.category}</span>
                  )}
                  {project.client && (
                    <span className="text-xs text-[var(--on-surface-muted)]">• {project.client}</span>
                  )}
                </div>
                <h3 className="font-display font-semibold group-hover:text-brand-500 transition-colors">
                  {project.title?.[l] || project.title?.en || 'Untitled'}
                </h3>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.techStack.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[var(--on-surface-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--on-surface-muted)]">
          <p className="text-lg">No projects found in this category.</p>
        </div>
      )}
    </>
  )
}
