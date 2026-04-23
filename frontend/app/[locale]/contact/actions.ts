'use server'

import {headers} from 'next/headers'

import {enforceContactRateLimit} from './rate-limit'

interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
  company: string
  submittedAt: string
}

const VALID_SERVICES = new Set(['', 'graphic', 'web', 'uiux', 'video'])
const MIN_SUBMIT_MS = 1200
const MAX_MESSAGE_LENGTH = 4000
const MAX_NAME_LENGTH = 120
const MAX_PHONE_LENGTH = 40

export async function sendContactForm(data: ContactFormData) {
  const {name, email, phone, service, message, company, submittedAt} = data
  const normalizedName = typeof name === 'string' ? name.trim() : ''
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
  const normalizedPhone = typeof phone === 'string' ? phone.trim() : ''
  const normalizedService = typeof service === 'string' ? service.trim() : ''
  const normalizedMessage = typeof message === 'string' ? message.trim() : ''
  const normalizedCompany = typeof company === 'string' ? company.trim() : ''

  if (normalizedCompany) {
    return {success: false, code: 'spam_detected' as const}
  }

  const submittedAtMs = Number.parseInt(typeof submittedAt === 'string' ? submittedAt : '', 10)
  if (!Number.isFinite(submittedAtMs) || Date.now() - submittedAtMs < MIN_SUBMIT_MS) {
    return {success: false, code: 'submitted_too_fast' as const}
  }

  // Basic server-side validation
  if (!normalizedName || !normalizedEmail || !normalizedMessage) {
    return {success: false, code: 'missing_required' as const}
  }

  if (
    normalizedName.length > MAX_NAME_LENGTH ||
    normalizedPhone.length > MAX_PHONE_LENGTH ||
    normalizedMessage.length > MAX_MESSAGE_LENGTH
  ) {
    return {success: false, code: 'invalid_payload' as const}
  }

  // Email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return {success: false, code: 'invalid_email' as const}
  }

  if (!VALID_SERVICES.has(normalizedService)) {
    return {success: false, code: 'invalid_service' as const}
  }

  try {
    const headerStore = await headers()
    const forwardedFor = headerStore.get('x-forwarded-for')
    const ipAddress = forwardedFor?.split(',')[0]?.trim() || headerStore.get('x-real-ip') || 'anonymous'
    const rateLimit = enforceContactRateLimit(ipAddress)

    if (!rateLimit.allowed) {
      return {success: false, code: 'rate_limited' as const}
    }

    const resendKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'DotDeep Contact <onboarding@resend.dev>'

    if (!resendKey || !contactEmail) {
      return {success: false, code: 'service_unavailable' as const}
    }

    const {Resend} = await import('resend')
    const resend = new Resend(resendKey)
    const submittedMessage = escapeHtml(normalizedMessage).replace(/\n/g, '<br />')
    const serviceLabel = normalizedService || 'General'

    await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: normalizedEmail,
      subject: `New inquiry from ${normalizedName} — ${serviceLabel}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(normalizedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(normalizedEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(normalizedPhone || 'N/A')}</p>
        <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${submittedMessage}</p>
      `,
      text: [
        'New Contact Form Submission',
        `Name: ${normalizedName}`,
        `Email: ${normalizedEmail}`,
        `Phone: ${normalizedPhone || 'N/A'}`,
        `Service: ${serviceLabel}`,
        '',
        normalizedMessage,
      ].join('\n'),
    })

    return {success: true}
  } catch (error) {
    console.error('Contact form error:', error)
    return {success: false, code: 'delivery_failed' as const}
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
