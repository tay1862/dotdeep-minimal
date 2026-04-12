'use client'

import {useTranslations} from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/app/components/ScrollReveal'

interface ProjectData {
  _id: string
  title?: {en?: string; th?: string; lo?: string} | null
  slug?: string | null
  category?: string | null
  coverImage?: {asset?: {_ref?: string}} | null
  images?: Array<{asset?: {_ref?: string}}> | null
  client?: string | null
  description?: {en?: any; th?: any; lo?: any} | null
  techStack?: string[] | null
  projectUrl?: string | null
  videoUrl?: string | null
  completedAt?: string | null
}

function sanityImageUrl(ref?: string) {
  if (!ref) return ''
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
}

export default function ProjectDetail({project, locale}: {project: ProjectData; locale: string}) {
  const t = useTranslations('gallery')
  const l = locale as 'en' | 'th' | 'lo'

  const title = project.title?.[l] || project.title?.en || 'Untitled'

  const catLabels: Record<string, string> = {
    graphic: t('graphic'),
    web: t('web'),
    uiux: t('uiux'),
    video: t('video'),
  }

  return (
    <article className="py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Back link */}
        <ScrollReveal>
          <Link
            href={`/${locale}/gallery`}
            className="inline-flex items-center gap-1 text-sm text-[var(--on-surface-muted)] hover:text-brand-500 transition-colors mb-8"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="m11 5-4 4 4 4"/></svg>
            {t('title')}
          </Link>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {project.category && (
                <span className="text-xs font-medium text-brand-500 bg-brand-50 dark:bg-brand-950/50 rounded-full px-3 py-1">
                  {catLabels[project.category] || project.category}
                </span>
              )}
              {project.client && (
                <span className="text-sm text-[var(--on-surface-muted)]">{project.client}</span>
              )}
              {project.completedAt && (
                <span className="text-sm text-[var(--on-surface-muted)]">
                  {new Date(project.completedAt).getFullYear()}
                </span>
              )}
            </div>
            <h1 className="text-fluid-2xl lg:text-fluid-3xl font-display font-bold">{title}</h1>
          </div>
        </ScrollReveal>

        {/* Cover Image */}
        {project.coverImage?.asset?._ref && (
          <ScrollReveal>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={sanityImageUrl(project.coverImage.asset._ref)}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>
        )}

        {/* Info grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div className="md:col-span-2">
            {/* Description would be PortableText - simplified for now */}
            <ScrollReveal>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-[var(--on-surface-muted)] leading-relaxed text-lg">
                  {/* Placeholder: description would be rendered with PortableText */}
                  Project description content managed via Sanity CMS.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <ScrollReveal>
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--on-surface-muted)] mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Links */}
            {project.projectUrl && (
              <ScrollReveal>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
                >
                  Visit Site
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 10 4-4M9 10V6H5"/></svg>
                </a>
              </ScrollReveal>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-6">
            {project.images.map((img, i) => (
              img.asset?._ref && (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={sanityImageUrl(img.asset._ref)}
                      alt={`${title} - ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </ScrollReveal>
              )
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
