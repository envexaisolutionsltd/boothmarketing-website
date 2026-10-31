import type { Metadata } from 'next'
import { boothMarketingPublic as company } from '@/lib/public-company'

export const metadata: Metadata = {
  title: 'Booth Marketing | Company & Service Information',
  description: 'Authoritative public information about Booth Marketing services, ideal customers and how to start an enquiry.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/agent-info' },
}

export default function AgentInfoPage() {
  return <main className="mx-auto max-w-4xl px-6 py-16 text-[#f4f4f3]">
    <header>
      <p className="text-sm text-[#8b8b91]">Authoritative public company information</p>
      <h1 className="mt-3 text-4xl font-semibold">{company.companyName}</h1>
      <p className="mt-5 text-lg text-[#d7d6d6]">{company.positioning}</p>
      <p className="mt-4 text-[#8b8b91]">{company.whatWeDo}</p>
    </header>
    <section className="mt-12"><h2 className="text-2xl font-semibold">Services</h2><div className="mt-5 space-y-5">{company.primaryServices.map(service=><article key={service.name}><h3 className="font-semibold">{service.name}</h3><p className="mt-1 text-[#8b8b91]">{service.description}</p></article>)}</div></section>
    <section className="mt-12"><h2 className="text-2xl font-semibold">Who Booth Marketing is for</h2><p className="mt-4 text-[#8b8b91]">{company.idealCustomer}</p></section>
    <section className="mt-12"><h2 className="text-2xl font-semibold">Problems Booth Marketing helps solve</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-[#8b8b91]">{company.problemsSolved.map(problem=><li key={problem}>{problem}</li>)}</ul></section>
    <section className="mt-12"><h2 className="text-2xl font-semibold">How the process works</h2><ol className="mt-4 space-y-4">{company.process.map(item=><li key={item.step}><strong>{item.step}. {item.name}</strong><p className="mt-1 text-[#8b8b91]">{item.description}</p></li>)}</ol></section>
    <section className="mt-12"><h2 className="text-2xl font-semibold">How to start</h2><p className="mt-4 text-[#8b8b91]">Request an Automation Audit at <a className="underline" href="/automation-audit">/automation-audit</a>. {company.engagementNote}</p></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({ '@context':'https://schema.org','@type':'ProfessionalService',name:company.companyName,url:company.domain,description:company.whatWeDo,knowsAbout:company.primaryServices.map(s=>s.name) }).replace(/</g,'\\u003c')}} />
  </main>
}
