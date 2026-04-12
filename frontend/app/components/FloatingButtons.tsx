'use client'

import {useState} from 'react'

export default function FloatingButtons() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded buttons */}
      {open && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* WhatsApp */}
          <a
            href="https://wa.me/8562012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-white text-sm font-medium shadow-lg hover:brightness-110 transition-all"
            aria-label="WhatsApp"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.257-.154-2.868.852.852-2.868-.154-.257A8 8 0 1 1 12 20z"/>
            </svg>
            WhatsApp
          </a>

          {/* Messenger */}
          <a
            href="https://m.me/dotdeep"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#006AFF] px-4 py-2.5 text-white text-sm font-medium shadow-lg hover:brightness-110 transition-all"
            aria-label="Messenger"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.2.16.15.26.36.27.58l.05 1.81c.02.63.67 1.03 1.24.77l2.02-.89c.17-.08.36-.1.55-.06.9.25 1.86.39 2.72.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm5.96 7.53-2.9 4.6c-.46.74-1.47.93-2.17.41l-2.31-1.73a.58.58 0 0 0-.7 0l-3.12 2.37c-.42.32-.96-.18-.68-.62l2.9-4.6c.46-.74 1.47-.93 2.17-.41l2.31 1.73a.58.58 0 0 0 .7 0l3.12-2.37c.42-.32.96.18.68.62z"/>
            </svg>
            Messenger
          </a>
        </div>
      )}

      {/* Toggle FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-500 text-white shadow-xl hover:bg-brand-600 transition-all active:scale-95"
        aria-label="Contact options"
      >
        {open ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}
