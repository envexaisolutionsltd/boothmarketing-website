'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'booth-functionality-notice-dismissed'

export default function FunctionalityNotice() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) !== '1') setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  function dismiss() {
    try { window.sessionStorage.setItem(STORAGE_KEY, '1') } catch {}
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-black/75 p-4 backdrop-blur-sm" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="functionality-notice-title" aria-describedby="functionality-notice-copy" className="w-full max-w-[520px] border border-[#303030] bg-[#101010] p-6 text-[#f3f3f3] shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="booth-kicker">Website notice</p>
            <h2 id="functionality-notice-title" className="booth-display mt-3 text-[30px] leading-[1.04] sm:text-[36px]">Some functionality is still being configured.</h2>
          </div>
          <button type="button" onClick={dismiss} aria-label="Close notice" className="grid h-11 w-11 shrink-0 place-items-center border border-[#303030] text-[#bdbdbd] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p id="functionality-notice-copy" className="booth-copy mt-5 max-w-[440px] text-[14px] leading-7">This website is currently being finalised. Some forms, booking features and automated confirmations may not be fully configured yet. You can still explore the site normally.</p>
        <button type="button" onClick={dismiss} className="booth-primary mt-6 inline-flex items-center justify-center">Continue to website</button>
      </section>
    </div>
  )
}
