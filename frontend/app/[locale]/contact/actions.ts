'use server'

interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export async function sendContactForm(data: ContactFormData) {
  const {name, email, phone, service, message} = data

  // Basic server-side validation
  if (!name || !email || !message) {
    return {success: false, error: 'Missing required fields'}
  }

  // Email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {success: false, error: 'Invalid email format'}
  }

  try {
    const resendKey = process.env.RESEND_API_KEY

    if (!resendKey) {
      // If no Resend key, log and still return success (dev mode)
      console.log('Contact form submission (no RESEND_API_KEY):', data)
      return {success: true}
    }

    const {Resend} = await import('resend')
    const resend = new Resend(resendKey)

    await resend.emails.send({
      from: 'DotDeep Contact <noreply@dotdeep.com>',
      to: [process.env.CONTACT_EMAIL || 'hello@dotdeep.com'],
      replyTo: email,
      subject: `New inquiry from ${name} — ${service || 'General'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'N/A')}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || 'N/A')}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
    })

    return {success: true}
  } catch (error) {
    console.error('Contact form error:', error)
    return {success: false, error: 'Failed to send message'}
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
