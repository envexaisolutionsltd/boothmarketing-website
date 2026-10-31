import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'

export const metadata={title:'AI Automation FAQs | Booth Marketing',description:'Answers to common questions about Booth Marketing’s AI automation audits, workflow selection, implementation and results.'}

const questions=[
  ['Do I need to know what should be automated before I speak to you?','No. Start by describing how the work happens today and where time or handoffs are getting lost. We help identify whether there is an opportunity worth exploring.'],
  ['What happens during the Automation Audit?','We review the process, the people and tools involved, and the friction around it. The aim is to identify practical opportunities and constraints before you decide whether to invest in a build.'],
  ['Does requesting an audit commit me to a project?','No. The audit request is an initial conversation. Any paid work would have its own agreed scope and pricing.'],
  ['Will you automate every manual task?','No. Some processes are better simplified, improved or left alone. We prioritise opportunities where the likely value justifies the complexity and risk.'],
  ['Will people still review important decisions?','Where judgement, sensitive cases or meaningful consequences are involved, a workflow can keep people in control through approvals, escalation and exception handling.'],
  ['Can you guarantee time savings or financial returns?','No. Any calculator figures or examples on this site are illustrative, not a forecast or guaranteed saving. Outcomes depend on the process, implementation and adoption.'],
  ['What kinds of businesses do you work with?','Booth focuses on established businesses with real operations and repetitive work, disconnected systems or workflow bottlenecks worth investigating.'],
]

export default function FAQPage(){return <main className="booth-public min-h-screen"><SiteHeader/><section className="border-b booth-rule bg-[#080808]"><div className="booth-container py-12 sm:py-16 lg:py-20"><p className="booth-kicker">Frequently Asked Questions</p><h1 className="booth-display booth-mobile-heading mt-5 max-w-[900px]">A few useful answers before you start.</h1><p className="booth-copy booth-mobile-copy mt-5 max-w-[720px]">If your question is about a specific process, you can bring it to the first conversation.</p></div></section><section className="booth-section"><div className="booth-container max-w-[900px]"><div className="space-y-3">{questions.map(([question,answer])=><details key={question} className="booth-panel group p-5 sm:p-6"><summary className="cursor-pointer list-none pr-6 text-[15px] font-medium leading-6 text-[#f3f3f3] marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">{question}</summary><p className="booth-copy mt-4 max-w-[72ch] text-[13px] leading-6">{answer}</p></details>)}</div><Link href="/automation-audit" className="booth-primary mt-8 inline-flex items-center justify-center">Request an Automation Audit<ArrowRight className="ml-2 h-4 w-4"/></Link></div></section><SiteFooter/></main>}
