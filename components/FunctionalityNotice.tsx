'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'booth-functionality-notice-dismissed'

export default function FunctionalityNotice() {
  const [open, setOpen] = useState(false)
  useEffect(() => { try { if (window.sessionStorage.getItem(STORAGE_KEY) !== '1') setOpen(true) } catch { setOpen(true) } }, [])
  function dismiss() { try { window.sessionStorage.setItem(STORAGE_KEY, '1') } catch {}; setOpen(false) }
  if (!open) return null
  return <aside aria-label="Preview notice" className="fixed bottom-4 left-1/2 z-[200] w-[calc(100%-32px)] max-w-[620px] -translate-x-1/2 border border-[#303030] bg-[#101010]/98 p-4 text-[#f3f3f3] shadow-2xl backdrop-blur sm:bottom-6 sm:flex sm:items-center sm:gap-5 sm:p-5">
    <div className="min-w-0 flex-1"><p className="booth-kicker">Preview environment</p><p className="mt-2 text-[13px] leading-6 text-[#aaa]">Some enquiry, booking and automated confirmation features are still being configured. The website itself is available to explore normally.</p></div>
    <button type="button" onClick={dismiss} className="mt-3 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#474747] px-4 text-[11px] font-medium uppercase tracking-[.05em] text-white sm:mt-0">Got it<X className="h-3.5 w-3.5"/></button>
  </aside>
}
