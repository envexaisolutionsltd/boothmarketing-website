import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alpha Preview | Booth Marketing',
  description: 'A separate preview space for the next Booth Marketing website update.',
  metadataBase: new URL('https://alpha.boothmarketing.co.uk'),
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
}

const statusRows = [
  ['Environment', 'Alpha preview'],
  ['Branch', 'testing'],
  ['Release status', 'Waiting for release'],
]

export default function AlphaPreviewPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] text-[#f3f3f3]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 74% 18%, rgba(115, 12, 24, .19), transparent 34%), radial-gradient(ellipse at 12% 78%, rgba(255,255,255,.035), transparent 30%)',
        }}
      />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 sm:px-10 lg:px-16">
        <header className="flex min-h-[96px] items-center justify-between border-b border-[#242424] sm:min-h-[112px]">
          <img
            src="/booth-marketing-logo.png"
            alt="Booth Marketing"
            className="h-auto w-[126px] object-contain sm:w-[158px]"
          />
          <div className="flex items-center gap-3 border border-[#292929] px-3 py-2 sm:px-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d92f3c]" />
            <span className="font-mono text-[9px] uppercase tracking-[.14em] text-[#aaa] sm:text-[10px]">
              Alpha environment
            </span>
          </div>
        </header>

        <div className="grid flex-1 content-center gap-12 py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)] lg:items-center lg:gap-20 lg:py-20">
          <section className="max-w-[780px]">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#8b8b8b]">
              Booth Marketing <span className="mx-2 text-[#d92f3c]">/</span> Website preview
            </p>
            <h1 className="mt-7 max-w-[760px] text-[clamp(3rem,8vw,6.8rem)] font-normal leading-[.94] tracking-[-.065em]">
              A separate space for what comes next.
            </h1>
            <p className="mt-7 max-w-[590px] text-[15px] leading-7 text-[#a1a1a1] sm:text-[17px] sm:leading-8">
              Nothing has been pushed to the alpha deployment yet. Check back later.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-10 bg-[#d92f3c]" />
              <span className="font-mono text-[9px] uppercase tracking-[.15em] text-[#777]">
                Preview branch
              </span>
            </div>
          </section>

          <aside className="relative border border-[#292929] bg-[#0d0d0d]/90 p-5 sm:p-7 lg:p-8">
            <div className="flex items-start justify-between border-b border-[#242424] pb-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[.16em] text-[#777]">
                  Deployment status
                </p>
                <p className="mt-2 text-[19px] tracking-[-.03em]">Waiting for release</p>
              </div>
              <span className="border border-[#382326] bg-[#1b0e10] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.12em] text-[#e56b75]">
                Alpha
              </span>
            </div>

            <dl className="divide-y divide-[#242424]">
              {statusRows.map(([label, value], index) => (
                <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-4 py-5">
                  <dt className="flex items-center gap-3 text-[12px] text-[#777]">
                    <span className="font-mono text-[9px] text-[#555]">0{index + 1}</span>
                    {label}
                  </dt>
                  <dd className="text-right text-[12px] text-[#c8c8c8]">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-2 border-l border-[#d92f3c] pl-4 text-[11px] leading-6 text-[#777]">
              This preview is isolated from the live website.
            </p>
          </aside>
        </div>

        <footer className="flex min-h-[66px] flex-col justify-center gap-2 border-t border-[#242424] py-4 text-[9px] uppercase tracking-[.12em] text-[#626262] sm:flex-row sm:items-center sm:justify-between">
          <span>Booth Marketing</span>
          <span>Alpha preview · Testing branch</span>
        </footer>
      </div>
    </main>
  )
}
