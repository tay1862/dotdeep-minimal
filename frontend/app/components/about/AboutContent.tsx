import {useTranslations} from 'next-intl'
import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import SanityImage from '@/app/components/SanityImage'
import ScrollReveal from '@/app/components/ScrollReveal'
import {sanitizeExternalUrl} from '@/app/lib/urls'
import {getLocalizedValue, type LocalizedPortableText} from '@/sanity/lib/localized'

interface TeamMember {
  _id: string
  firstName?: string | null
  lastName?: string | null
  picture?: {asset?: {_ref?: string}} | null
  role?: {en?: string; th?: string; lo?: string} | null
  bio?: {en?: string; th?: string; lo?: string} | null
  socialLinks?: {
    facebook?: string | null
    instagram?: string | null
    linkedin?: string | null
  } | null
}

interface AboutData {
  heading?: {en?: string; th?: string; lo?: string} | null
  vision?: LocalizedPortableText
  mission?: LocalizedPortableText
  story?: LocalizedPortableText
  storyImage?: {asset?: {_ref?: string}} | null
  techStack?: {name?: string; icon?: string; _key?: string}[] | null
}

export default function AboutContent({
  about,
  team,
  locale,
}: {
  about: AboutData | null
  team: TeamMember[]
  locale: string
}) {
  const t = useTranslations('about')
  const l = locale as 'en' | 'th' | 'lo'
  const vision = getLocalizedValue(about?.vision, l)
  const mission = getLocalizedValue(about?.mission, l)
  const story = getLocalizedValue(about?.story, l)

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">
              {t('title')}
            </p>
            <h1 className={`text-fluid-2xl lg:text-fluid-3xl font-display font-bold ${locale === 'lo' ? 'font-lao' : ''}`}>
              {about?.heading?.[l] || about?.heading?.en || t('title')}
            </h1>
          </div>
        </ScrollReveal>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <ScrollReveal>
            <div className="p-8 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] h-full">
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center mb-4">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <h2 className="text-xl font-display font-bold mb-3">{t('vision')}</h2>
              {vision ? (
                <PortableText
                  className="max-w-none prose-p:text-on-surface-muted prose-p:leading-relaxed"
                  value={vision as PortableTextBlock[]}
                />
              ) : null}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="p-8 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] h-full">
              <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900/50 text-accent-600 flex items-center justify-center mb-4">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <h2 className="text-xl font-display font-bold mb-3">{t('mission')}</h2>
              {mission ? (
                <PortableText
                  className="max-w-none prose-p:text-on-surface-muted prose-p:leading-relaxed"
                  value={mission as PortableTextBlock[]}
                />
              ) : null}
            </div>
          </ScrollReveal>
        </div>

        {/* Story section with image */}
        {(about?.storyImage?.asset?._ref || story) && (
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                {about?.storyImage?.asset?._ref ? (
                  <SanityImage
                    source={about.storyImage}
                    alt={t('ourStory')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : null}
              </div>
              <div>
                <h2 className="text-fluid-xl font-display font-bold mb-4">{t('ourStory')}</h2>
                {story ? (
                  <PortableText
                    className="max-w-none prose-p:text-on-surface-muted prose-p:leading-relaxed"
                    value={story as PortableTextBlock[]}
                  />
                ) : null}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Tech Stack */}
        {about?.techStack && about.techStack.length > 0 && (
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-xl font-display font-bold mb-6">{t('skills')}</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {about.techStack.map((tech) => (
                  <span
                    key={tech._key || tech.name}
                    className="px-4 py-2 rounded-full border border-[var(--border-default)] text-sm font-medium hover:border-brand-300 hover:text-brand-500 transition-colors"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Team Section */}
        {team.length > 0 && (
          <>
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">
                  {t('ourTeam')}
                </p>
                <h2 className="text-fluid-xl font-display font-bold">{t('ourTeam')}</h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <ScrollReveal key={member._id} delay={i * 80}>
                  <div className="group p-6 rounded-2xl border border-[var(--border-default)] hover:border-brand-300 hover:shadow-lg transition-all text-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-neutral-100 dark:bg-neutral-800">
                      {member.picture?.asset?._ref ? (
                        <SanityImage
                          source={member.picture}
                          alt={`${member.firstName || ''} ${member.lastName || ''}`}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-neutral-400">
                          {(member.firstName?.[0] || '') + (member.lastName?.[0] || '')}
                        </div>
                      )}
                    </div>
                    <h3 className="font-display font-semibold">
                      {member.firstName} {member.lastName}
                    </h3>
                    {member.role && (
                      <p className="text-sm text-brand-500 mt-0.5">
                        {member.role[l] || member.role.en || ''}
                      </p>
                    )}
                    {member.bio && (
                      <p className="text-sm text-[var(--on-surface-muted)] mt-2 leading-relaxed">
                        {member.bio[l] || member.bio.en || ''}
                      </p>
                    )}

                    {/* Social links */}
                    {member.socialLinks && (
                      <div className="flex justify-center gap-2 mt-3">
                        {member.socialLinks.facebook && sanitizeExternalUrl(member.socialLinks.facebook) && (
                          <a href={sanitizeExternalUrl(member.socialLinks.facebook) || undefined} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[var(--on-surface-muted)] hover:text-brand-500 transition-colors">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                          </a>
                        )}
                        {member.socialLinks.instagram && sanitizeExternalUrl(member.socialLinks.instagram) && (
                          <a href={sanitizeExternalUrl(member.socialLinks.instagram) || undefined} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[var(--on-surface-muted)] hover:text-brand-500 transition-colors">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="5"/></svg>
                          </a>
                        )}
                        {member.socialLinks.linkedin && sanitizeExternalUrl(member.socialLinks.linkedin) && (
                          <a href={sanitizeExternalUrl(member.socialLinks.linkedin) || undefined} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[var(--on-surface-muted)] hover:text-brand-500 transition-colors">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
