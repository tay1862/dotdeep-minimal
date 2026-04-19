'use client'

import {useTranslations} from 'next-intl'
import Image from 'next/image'
import ScrollReveal from '@/app/components/ScrollReveal'

interface TeamMember {
  _id: string
  firstName?: string | null
  lastName?: string | null
  picture?: {asset?: {_ref?: string}} | null
  role?: {en?: string; th?: string; lo?: string} | null
  bio?: {en?: string; th?: string; lo?: string} | null
  socialLinks?: {
    whatsapp?: string | null
    facebook?: string | null
    instagram?: string | null
    tiktok?: string | null
    linkedin?: string | null
    line?: string | null
  } | null
}

function sanityImg(ref?: string) {
  if (!ref) return ''
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
}

export default function TeamGrid({team, locale}: {team: TeamMember[]; locale: string}) {
  const t = useTranslations('team')
  const l = locale as 'en' | 'th' | 'lo'

  return (
    <>
      <ScrollReveal>
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">{t('title')}</p>
          <h1 className={`text-fluid-2xl font-display font-bold mb-3 ${locale === 'lo' ? 'font-lao' : ''}`}>{t('subtitle')}</h1>
        </div>
      </ScrollReveal>

      {team.length === 0 ? (
        <div className="text-center py-16 text-[var(--on-surface-muted)]">
          <p className="text-lg">Team members coming soon.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member._id} delay={i * 80}>
              <div className="group p-6 rounded-2xl border border-[var(--border-default)] hover:border-brand-300 hover:shadow-xl transition-all text-center h-full">
                {/* Avatar */}
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 bg-neutral-100 dark:bg-neutral-800 ring-2 ring-brand-100 dark:ring-brand-900 group-hover:ring-brand-300 transition-all">
                  {member.picture?.asset?._ref ? (
                    <Image
                      src={sanityImg(member.picture.asset._ref)}
                      alt={`${member.firstName || ''} ${member.lastName || ''}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-neutral-300 dark:text-neutral-600">
                      {(member.firstName?.[0] || '') + (member.lastName?.[0] || '')}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-display font-bold">
                  {member.firstName} {member.lastName}
                </h3>
                {member.role && (
                  <p className="text-sm text-brand-500 font-medium mt-1">
                    {member.role[l] || member.role.en || ''}
                  </p>
                )}
                {member.bio && (
                  <p className="text-sm text-[var(--on-surface-muted)] mt-3 leading-relaxed">
                    {member.bio[l] || member.bio.en || ''}
                  </p>
                )}

                {/* Social */}
                {member.socialLinks && (
                  <div className="flex justify-center gap-2 mt-4">
                    {member.socialLinks.facebook && (
                      <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[var(--on-surface-muted)] hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors" aria-label="Facebook">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      </a>
                    )}
                    {member.socialLinks.instagram && (
                      <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[var(--on-surface-muted)] hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors" aria-label="Instagram">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="5"/></svg>
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[var(--on-surface-muted)] hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors" aria-label="LinkedIn">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                      </a>
                    )}
                    {member.socialLinks.tiktok && (
                      <a href={member.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[var(--on-surface-muted)] hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors" aria-label="TikTok">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.23V9.12a8.16 8.16 0 0 0 3.85.96V6.69z"/></svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  )
}
