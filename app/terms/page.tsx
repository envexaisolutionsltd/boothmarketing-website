import SiteFooter from '../../components/SiteFooter'
import SiteHeader from '../../components/SiteHeader'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#090a0b] text-[#f4f4f3]">
      <SiteHeader />
      <section className="py-12 sm:py-16">
        <div className="mx-auto w-[min(900px,calc(100%-28px))]">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#d8cbb7]">Terms</p>
          <h1 className="mt-4 text-[clamp(38px,8vw,58px)] font-semibold tracking-[-0.05em]">Website Terms of Use</h1>
          <div className="mt-7 space-y-6 text-[14px] leading-7 text-[#929399]">
            <p>This website provides general information about Booth Marketing's AI automation services. Content is provided for informational purposes and is not a guarantee of commercial results.</p>
            <p>Any examples, calculators, estimates or illustrative scenarios are intended to help explain potential business considerations. They should not be treated as guaranteed savings, revenue, conversion improvements or financial advice.</p>
            <p>Submitting an enquiry or requesting an audit does not create a client relationship or commit either party to a project. Any paid engagement will be governed by separate agreed terms, scope and pricing.</p>
            <p>Booth Marketing may update website content, services and these terms from time to time.</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
