'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'booth-alpha-deployment-notice-dismissed'

export default function AlphaDeploymentNotice() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (window.location.hostname !== 'alpha.boothmarketing.co.uk') return

    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) !== '1') setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function dismiss() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // The notice can still be dismissed when storage is unavailable.
    }
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[300] grid place-items-center bg-black/75 px-4 py-8 backdrop-blur-sm" onMouseDown={(event) => {
      if (event.target === event.currentTarget) dismiss()
    }}>
      <section
        aria-labelledby="alpha-notice-title"
        aria-describedby="alpha-notice-description"
        aria-modal="true"
        className="relative w-full max-w-[480px] border border-[#303030] bg-[#101010] p-6 text-[#f3f3f3] shadow-[0_28px_100px_rgba(0,0,0,.72)] sm:p-8"
        role="dialog"
      >
        <div className="mb-7 flex items-center justify-between border-b border-[#242424] pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#d92f3c]">Alpha deployment</p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close alpha deployment notice"
            className="grid h-10 w-10 place-items-center border border-[#303030] text-[#aaa] transition hover:border-[#666] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mb-5 h-px w-10 bg-[#d92f3c]" />
        <h2 id="alpha-notice-title" className="text-[25px] font-normal leading-tight tracking-[-.04em] sm:text-[30px]">
          Nothing has been pushed to the alpha deployment yet.
        </h2>
        <p id="alpha-notice-description" className="mt-4 text-[14px] leading-7 text-[#9c9c9c]">
          Check back later.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="mt-8 inline-flex min-h-11 items-center justify-center border border-[#474747] px-5 text-[11px] font-medium uppercase tracking-[.08em] text-white transition hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Got it
        </button>
      </section>
    </div>
  )
}
