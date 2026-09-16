import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#090a0b]">
      <div className="mx-auto grid w-[min(1160px,calc(100%-28px))] gap-7 py-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
        <div>
          <img src="/booth-marketing-logo.png" alt="Booth Marketing" className="w-[138px] object-contain" />
          <p className="mt-2 max-w-md text-[11px] leading-5 text-[#707177]">Conversion-focused websites and landing pages for established businesses.</p>
        </div>
        <div className="sm:text-right">
          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            <Link href="/websites" className="text-[11px] text-[#7b7c82] hover:text-white">Websites</Link>
            <Link href="/how-it-works" className="text-[11px] text-[#7b7c82] hover:text-white">How It Works</Link>
            <Link href="/about" className="text-[11px] text-[#7b7c82] hover:text-white">About</Link>
            <Link href="/privacy" className="text-[11px] text-[#7b7c82] hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-[11px] text-[#7b7c82] hover:text-white">Terms</Link>
            <Link href="/website-audit" className="text-[11px] text-[#7b7c82] hover:text-white">Website Audit</Link>
          </div>
          <p className="mt-3 text-[10.5px] text-[#5f6066]">© {new Date().getFullYear()} Booth Marketing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
