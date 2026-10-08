import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: '404 | Booth Marketing',
  description: 'The page you were looking for could not be found.',
}

export default function NotFound(){
  return <div className="booth-public min-h-screen bg-[#101010] text-[#f3f3f3]">
    <SiteHeader/>
    <main className="relative isolate flex min-h-[calc(100svh-64px)] items-center overflow-hidden border-b border-[#242424]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[52vw] max-h-[760px] min-h-[430px] w-[52vw] max-w-[760px] min-w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d92f3c]/[0.045] blur-[110px]"/>
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"/>
      </div>

      <div className="booth-container relative z-10 py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-4">
          <section className="relative z-20 max-w-xl">
            <p className="booth-kicker">Error / 404</p>
            <h1 className="booth-display mt-5 text-[clamp(3.2rem,8vw,7.25rem)] leading-[.86]">
              Wrong turn.<br/><span className="text-[#777]">Useful outcome.</span>
            </h1>
            <p className="booth-copy mt-7 max-w-md text-[15px] leading-7 sm:text-[16px]">
              This page does not exist. The good news is finding wasted time in a business is considerably easier.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="booth-primary inline-flex items-center justify-center">Back to home<ArrowLeft className="ml-2 h-4 w-4"/></Link>
              <Link href="/automation-audit" className="booth-secondary inline-flex items-center justify-center">Find an opportunity<ArrowUpRight className="ml-2 h-4 w-4"/></Link>
            </div>
          </section>

          <div className="relative mx-auto h-[390px] w-full max-w-[650px] sm:h-[520px] lg:h-[620px]" aria-hidden="true">
            <div className="absolute inset-0 [perspective:1100px]">
              <div className="booth-404-orbit absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] sm:h-[410px] sm:w-[410px] lg:h-[480px] lg:w-[480px]"/>
              <div className="booth-404-orbit booth-404-orbit-reverse absolute left-1/2 top-1/2 h-[220px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#d92f3c]/20 sm:h-[290px] sm:w-[520px]"/>
              <div className="booth-404-object absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
                <span className="booth-404-digit booth-404-four">4</span>
                <span className="booth-404-zero"><i/></span>
                <span className="booth-404-digit booth-404-four booth-404-four-last">4</span>
              </div>
              <span className="booth-404-particle booth-404-particle-a"/>
              <span className="booth-404-particle booth-404-particle-b"/>
              <span className="booth-404-particle booth-404-particle-c"/>
            </div>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[.22em] text-[#555]">Requested route not found / Booth system</p>
          </div>
        </div>
      </div>
    </main>
    <SiteFooter/>
  </div>
}
