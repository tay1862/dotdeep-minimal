'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'

import {sendContactForm} from '@/app/[locale]/contact/actions'
import ScrollReveal from '@/app/components/ScrollReveal'
import {
  buildLineUrl,
  buildMailtoHref,
  buildMessengerUrl,
  buildPhoneHref,
  buildWhatsAppUrl,
} from '@/app/lib/urls'

interface SiteSettings {
  contactEmail?: string | null
  contactPhone?: string | null
  address?: {en?: string; th?: string; lo?: string} | null
  socialLinks?: {
    whatsapp?: string | null
    facebook?: string | null
    line?: string | null
  } | null
}

interface ServiceOption {
  value: string
  label: {en: string; th: string; lo: string}
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {value: 'graphic', label: {en: 'Graphic Design', th: 'ออกแบบกราฟิก', lo: 'ອອກແບບກຣາບຟິກ'}},
  {value: 'web', label: {en: 'Web Development', th: 'พัฒนาเว็บ', lo: 'ພັດທະນາເວັບ'}},
  {value: 'uiux', label: {en: 'UI/UX Design', th: 'ออกแบบ UI/UX', lo: 'ອອກແບບ UI/UX'}},
  {value: 'video', label: {en: 'Video Production', th: 'ผลิตวิดีโอ', lo: 'ຜະລິດວິດີໂອ'}},
]

export default function ContactForm({locale, settings}: {locale: string; settings?: SiteSettings | null}) {
  const t = useTranslations('contact')
  const l = locale as 'en' | 'th' | 'lo'
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const [submittedAt, setSubmittedAt] = useState(() => String(Date.now()))

  const email = settings?.contactEmail
  const phone = settings?.contactPhone
  const address = settings?.address?.[l] || settings?.address?.en
  const emailHref = buildMailtoHref(email)
  const phoneHref = buildPhoneHref(phone)
  const whatsapp = buildWhatsAppUrl(settings?.socialLinks?.whatsapp)
  const messenger = buildMessengerUrl(settings?.socialLinks?.facebook)
  const line = buildLineUrl(settings?.socialLinks?.line)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setFeedback('')
    const form = e.currentTarget
    const fd = new FormData(form)

    const result = await sendContactForm({
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      service: fd.get('service') as string,
      message: fd.get('message') as string,
      company: fd.get('company') as string,
      submittedAt: fd.get('submittedAt') as string,
    })

    if (result.success) {
      setStatus('success')
      setFeedback(t('success'))
      form.reset()
      setSubmittedAt(String(Date.now()))
    } else {
      setStatus('error')
      const messageByCode: Record<string, string> = {
        missing_required: t('errorValidation'),
        invalid_email: t('errorValidation'),
        invalid_payload: t('errorValidation'),
        invalid_service: t('errorValidation'),
        rate_limited: t('errorRateLimit'),
        spam_detected: t('errorSpam'),
        submitted_too_fast: t('errorTooFast'),
        service_unavailable: t('errorServiceUnavailable'),
        delivery_failed: t('error'),
      }
      const errorCode = 'code' in result ? result.code : undefined

      setFeedback((errorCode && messageByCode[errorCode]) || t('error'))
    }
  }

  const inputClass = 'w-full rounded-xl border border-border-default bg-surface px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all placeholder:text-on-surface-muted/50'

  return (
    <div className="grid lg:grid-cols-2 gap-16">
      {/* Info side */}
      <div>
        <ScrollReveal>
          <p className="text-sm font-medium text-brand-500 uppercase tracking-wider mb-2">{t('title')}</p>
          <h1 className="text-fluid-2xl font-display font-bold mb-4">{t('subtitle')}</h1>
          <p className="text-on-surface-muted leading-relaxed mb-10">
            {t('intro')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="space-y-5">
            {email && emailHref && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">Email</p>
                  <a href={emailHref} className="text-sm text-on-surface-muted hover:text-brand-500 transition-colors">{email}</a>
                </div>
              </div>
            )}

            {phone && phoneHref && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">WhatsApp / Phone</p>
                  <a href={phoneHref} className="text-sm text-on-surface-muted hover:text-brand-500 transition-colors">{phone}</a>
                </div>
              </div>
            )}

            {address && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-500 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">Location</p>
                  <p className="text-sm text-on-surface-muted">{address}</p>
                </div>
              </div>
            )}

            {/* Quick contact buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-2 text-sm font-semibold hover:brightness-110 transition-all"
                >
                  {t('whatsapp')}
                </a>
              )}
              {messenger && (
                <a
                  href={messenger}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#006AFF] text-white px-4 py-2 text-sm font-semibold hover:brightness-110 transition-all"
                >
                  {t('messenger')}
                </a>
              )}
              {line && (
                <a
                  href={line}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#06C755] text-white px-4 py-2 text-sm font-semibold hover:brightness-110 transition-all"
                >
                  {t('line')}
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Form side */}
      <ScrollReveal delay={200}>
        <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-border-default bg-surface-raised">
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" autoComplete="off" tabIndex={-1} />
          </div>
          <input type="hidden" name="submittedAt" value={submittedAt} />

          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1.5">{t('name')}</label>
            <input id="name" name="name" type="text" required placeholder="John Doe" className={inputClass} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1.5">{t('email')}</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-1.5">{t('phone')}</label>
              <input id="phone" name="phone" type="tel" placeholder="+856 20 ..." className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-semibold mb-1.5">{t('service')}</label>
            <select id="service" name="service" className={inputClass}>
              <option value="">—</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label[l]}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-1.5">{t('message')}</label>
            <textarea
              id="message" name="message" rows={5} required
              placeholder={t('placeholderMessage')}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-white py-3.5 font-semibold transition-all disabled:opacity-60 active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {status === 'sending' ? (
              <>
                <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {t('sending')}
              </>
            ) : t('send')}
          </button>

          {status !== 'idle' && status !== 'sending' && feedback && (
            <div
              role="status"
              aria-live="polite"
              className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${
                status === 'success'
                  ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30'
                  : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30'
              }`}
            >
              {status === 'success' ? (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
              ) : (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              )}
              {feedback}
            </div>
          )}
        </form>
      </ScrollReveal>
    </div>
  )
}
