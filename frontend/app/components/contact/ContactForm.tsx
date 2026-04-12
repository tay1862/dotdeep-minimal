'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {sendContactForm} from '@/app/[locale]/contact/actions'
import ScrollReveal from '@/app/components/ScrollReveal'

export default function ContactForm({locale}: {locale: string}) {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const fd = new FormData(form)

    const result = await sendContactForm({
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      service: fd.get('service') as string,
      message: fd.get('message') as string,
    })

    if (result.success) {
      setStatus('success')
      form.reset()
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-16">
      {/* Info */}
      <div>
        <ScrollReveal>
          <p className="text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">
            {t('title')}
          </p>
          <h1 className="text-fluid-2xl font-display font-bold mb-4">{t('subtitle')}</h1>
          <p className="text-[var(--on-surface-muted)] leading-relaxed mb-10">
            We&apos;d love to hear about your project. Reach out through the form or any of our channels below.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center shrink-0">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <p className="font-medium text-sm">Email</p>
                <a href="mailto:hello@dotdeep.com" className="text-sm text-[var(--on-surface-muted)] hover:text-brand-500 transition-colors">
                  hello@dotdeep.com
                </a>
              </div>
            </div>

            {/* Phone / WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center shrink-0">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p className="font-medium text-sm">WhatsApp / Phone</p>
                <a href="https://wa.me/8562012345678" className="text-sm text-[var(--on-surface-muted)] hover:text-brand-500 transition-colors">
                  +856 20 1234 5678
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center shrink-0">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p className="font-medium text-sm">Location</p>
                <p className="text-sm text-[var(--on-surface-muted)]">
                  Vientiane, Laos
                </p>
              </div>
            </div>

            {/* Social quick links */}
            <div className="flex gap-3 pt-4">
              <a href="https://wa.me/8562012345678" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-2 text-sm font-medium hover:brightness-110 transition-all">
                {t('whatsapp')}
              </a>
              <a href="https://m.me/dotdeep" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#006AFF] text-white px-4 py-2 text-sm font-medium hover:brightness-110 transition-all">
                {t('messenger')}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Form */}
      <ScrollReveal delay={200}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">{t('name')}</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface)] px-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">{t('email')}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface)] px-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1.5">{t('phone')}</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface)] px-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium mb-1.5">{t('service')}</label>
            <select
              id="service"
              name="service"
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface)] px-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"
            >
              <option value="">—</option>
              <option value="graphic">Graphic Design</option>
              <option value="web">Web Development</option>
              <option value="uiux">UI/UX Design</option>
              <option value="video">Video Production</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">{t('message')}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface)] px-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-white py-3.5 font-semibold transition-all disabled:opacity-60 active:scale-[0.99]"
          >
            {status === 'sending' ? t('sending') : t('send')}
          </button>

          {status === 'success' && (
            <p className="text-sm text-green-600 dark:text-green-400 text-center">{t('success')}</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center">{t('error')}</p>
          )}
        </form>
      </ScrollReveal>
    </div>
  )
}
