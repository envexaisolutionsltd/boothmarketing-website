'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import BoothLogo from './BoothLogo'

const links = [
  ['What We Automate', '/what-we-automate'],
  ['Prototypes', '/prototypes'],
  ['How It Works', '/how-it-works'],
  ['About', '/about'],
] as const

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [isAlpha, setIsAlpha] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setIsAlpha(window.location.hostname.toLowerCase() === 'alpha.boothmarketing.co.uk')
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const mobileMenu = open && typeof document !== 'undefined'
    ? createPortal(
      <div className="fixed inset-0 z-[1000] lg:hidden" data-mobile-navigation>
        <button
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/80"
        />
        <aside
          id="booth-mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="booth-glass-menu absolute right-0 top-0 z-10 flex h-[100dvh] w-[75vw] min-w-[270px] max-w-[360px] flex-col border-l border-[#242424] p-5"
          style={{
            borderColor: 'rgba(255,255,255,.18)',
            background: 'linear-gradient(150deg,rgba(255,255,255,.09),rgba(255,255,255,.018) 52%),rgba(15,15,15,.96)',
            boxShadow: '-18px 0 56px rgba(0,0,0,.4),inset 1px 0 0 rgba(255,255,255,.1)',
            WebkitBackdropFilter: 'blur(22px) saturate(135%)',
            backdropFilter: 'blur(22px) saturate(135%)',
          }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#242424] pb-5">
            <BoothLogo className="w-[118px]" priorityLabel="Booth Marketing home" />
            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[#303030]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-3">
            {links.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="grid min-h-[58px] grid-cols-[30px_1fr_auto] items-center border-b border-[#242424]"
              >
                <span className="font-mono text-[10px] text-[#686868]">0{index + 1}</span>
                <span className="text-[17px] tracking-[-.025em]">{label}</span>
                <ArrowUpRight className="h-4 w-4 text-[#777]" />
              </Link>
            ))}
            <Link
              href="/automation-audit"
              onClick={() => setOpen(false)}
              className="booth-primary mt-6 flex min-h-[48px] items-center justify-center rounded-full px-4 text-center text-[11px] font-medium uppercase tracking-[.05em]"
            >
              Request an Automation Audit
              <ArrowUpRight className="ml-2 h-4 w-4 shrink-0" />
            </Link>
          </nav>
          <p className="mt-auto border-t border-[#242424] pt-5 text-[11px] leading-5 text-[#777]">
            Practical AI automation for businesses that know AI matters but do not know where to start.
          </p>
        </aside>
      </div>,
      document.body,
    )
    : null

  return (
    <>
      {isAlpha && (
        <aside className="booth-staging-banner" role="note">
          This is a staging environment — do not submit real information
        </aside>
      )}
      <header className="sticky top-0 z-50 w-full border-b border-[#242424] booth-glass-header text-[#f3f3f3]">
        <div className="booth-header-container booth-glass-bar flex min-h-[56px] items-center justify-between gap-3">
          <BoothLogo />
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="text-[11px] uppercase tracking-[.08em] text-[#9c9c9c] transition hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/automation-audit" className="booth-primary booth-header-cta hidden min-h-10 items-center rounded-full px-4 text-[10px] font-medium uppercase tracking-[.05em] sm:inline-flex">
              Request an Automation Audit
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="booth-mobile-navigation"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#303030] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  )
}
