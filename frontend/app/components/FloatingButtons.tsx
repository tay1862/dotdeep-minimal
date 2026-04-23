'use client'

import {useState} from 'react'

import {buildLineUrl, buildMessengerUrl, buildWhatsAppUrl} from '@/app/lib/urls'

interface SiteSettings {
  socialLinks?: {
    whatsapp?: string | null
    facebook?: string | null
    line?: string | null
  } | null
}

export default function FloatingButtons({settings}: {settings?: SiteSettings | null}) {
  const [open, setOpen] = useState(false)

  const whatsapp = buildWhatsAppUrl(settings?.socialLinks?.whatsapp)
  const messenger = buildMessengerUrl(settings?.socialLinks?.facebook)
  const line = buildLineUrl(settings?.socialLinks?.line)

  const hasAny = whatsapp || messenger || line
  if (!hasAny) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
      {/* Expanded buttons */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-2.5 text-white text-sm font-semibold shadow-lg hover:brightness-110 transition-all"
            aria-label="WhatsApp"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.257-.154-2.868.852.852-2.868-.154-.257A8 8 0 1 1 12 20z"/>
            </svg>
            WhatsApp
          </a>
        )}

        {messenger && (
          <a
            href={messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full bg-[#006AFF] px-4 py-2.5 text-white text-sm font-semibold shadow-lg hover:brightness-110 transition-all"
            aria-label="Messenger"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.2.16.15.26.36.27.58l.05 1.81c.02.63.67 1.03 1.24.77l2.02-.89c.17-.08.36-.1.55-.06.9.25 1.86.39 2.72.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm5.96 7.53-2.9 4.6c-.46.74-1.47.93-2.17.41l-2.31-1.73a.58.58 0 0 0-.7 0l-3.12 2.37c-.42.32-.96-.18-.68-.62l2.9-4.6c.46-.74 1.47-.93 2.17-.41l2.31 1.73a.58.58 0 0 0 .7 0l3.12-2.37c.42-.32.96.18.68.62z"/>
            </svg>
            Messenger
          </a>
        )}

        {line && (
          <a
            href={line}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full bg-[#06C755] px-4 py-2.5 text-white text-sm font-semibold shadow-lg hover:brightness-110 transition-all"
            aria-label="LINE"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            LINE
          </a>
        )}
      </div>

      {/* Toggle FAB */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-center w-14 h-14 rounded-full bg-brand-500 text-white shadow-xl hover:bg-brand-600 transition-all active:scale-95 ${open ? 'rotate-45' : ''}`}
        aria-label="Contact options"
        aria-expanded={open}
        style={{transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background-color 0.2s'}}
      >
        {open ? (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}
