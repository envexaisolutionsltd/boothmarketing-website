'use client'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const items = [
  ['Most of our new business comes from referrals. Why invest in the website?','A referral creates trust before somebody reaches the site, but serious prospects often still check the brokerage before making contact. The website should reinforce that recommendation, communicate expertise and make the next conversation feel like a natural step.'],
  ['Our current website works. Do we really need to rebuild it?','Possibly not. An older website does not automatically justify replacing it. Booth should assess whether it still represents the brokerage properly, explains why clients choose it and supports how new business is actually won. If targeted improvements make more sense than a rebuild, we will say so.'],
  ["Commercial insurance isn't sold through a website, though.",'Agreed. Commercial insurance is relationship-led. The website’s role is to help the right prospect trust the brokerage enough to start that relationship. It should support brokers, referrals, introducers and outbound activity rather than attempt to replace them.'],
  ['How will you understand our brokerage and the markets we work in?','We begin with your ideal clients, sector specialisms, insurance areas, team, new-business process and the reasons clients choose you. The website structure follows that commercial understanding rather than starting with visual design.'],
  ["We're FCA regulated. How do you handle compliance?",'We design with the regulatory environment in mind and avoid building propositions around exaggerated or unsupported claims. Your brokerage remains responsible for approving regulated content and disclosures before publication, and we can work with the compliance process you already use.'],
  ["We don't want hundreds of low-quality quote enquiries.",'Neither do we. The objective is better-fit commercial conversations, not maximum form volume. We shape the journey around fit, context and an appropriate broker conversation rather than pushing every visitor into a generic quote form.'],
  ['Will we lose our existing SEO if the website is rebuilt?','Existing rankings, URLs, useful pages and content should be assessed before anything is replaced. We preserve what is worth preserving where appropriate and plan redirects carefully. Rankings cannot be guaranteed, but avoidable losses should not be treated casually.'],
  ['How much of our time will the project take?','We need brokerage knowledge at key points, especially around clients, sectors, team and differentiation. The process is structured so the managing director does not become the project manager. Decisions are grouped into clear review stages.'],
  ['Do you only work with commercial insurance brokers?','Commercial insurance brokers are the market we’ve chosen to specialise our website offer around. That focus lets us build around the way brokerages win trust, demonstrate expertise and create commercial conversations rather than approaching every project as a generic website build.'],
  ['Why shouldn’t we just use our existing marketing agency or web developer?','You may decide to. Our approach simply starts in a different place: the brokerage’s buyer, referral journey, sector positioning and broker conversation. Visual design follows those decisions rather than leading them.'],
  ["What's the first step?",'Start with the Commercial Insurance Brokerage Website Audit. We review what you already have, what should be protected and whether the right answer is to keep it, improve it or rebuild it.'],
]

export default function BrokerFAQ(){
  const [open,setOpen]=useState<number|null>(0)
  return <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">{items.map(([q,a],i)=>{
    const active=open===i
    return <div key={q} className="py-1"><button onClick={()=>setOpen(active?null:i)} aria-expanded={active} className="flex min-h-[62px] w-full items-center justify-between gap-4 py-3 text-left"><span className="text-[14px] font-semibold text-[#e8e8e7] sm:text-[15px]">{q}</span><ChevronDown className={`h-4 w-4 shrink-0 text-[#8d8e94] transition-transform duration-200 ${active?'rotate-180':''}`}/></button><div className={`grid transition-all duration-200 ${active?'grid-rows-[1fr] pb-4':'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="max-w-[720px] text-[12px] leading-6 text-[#85868c] sm:text-[13px]">{a}</p></div></div></div>
  })}</div>
}
