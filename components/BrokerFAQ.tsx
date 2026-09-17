'use client'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const items = [
  ['Most of our new business comes from referrals. Why invest in the website?','A referral creates trust before somebody reaches the site, but serious prospects often still check the brokerage before making contact. The website should reinforce that recommendation, communicate expertise and make the next conversation feel like a natural step.'],
  ['Our current website works. Do we really need to rebuild it?','Possibly not. An older website does not automatically justify replacing it. We assess whether it still represents the brokerage properly, explains why clients choose it and supports how new business is actually won. If targeted improvements make more sense than a rebuild, we will say so.'],
  ["Commercial insurance isn't sold through a website, though.",'Agreed. Commercial insurance is relationship-led. The website’s role is to help the right prospect trust the brokerage enough to start that relationship. It should support brokers, referrals, introducers and outbound activity rather than attempt to replace them.'],
  ["We're FCA regulated. How do you handle compliance?",'We design with the regulatory environment in mind and avoid building propositions around exaggerated or unsupported claims. Your brokerage remains responsible for approving regulated content and disclosures before publication, and we can work with the compliance process you already use.'],
  ['How long does a brokerage website project take?','The exact timeline depends on scope, content and review speed. We agree the stages before work begins and group decisions into clear review points so the brokerage team can contribute without becoming the project manager.'],
]

export default function BrokerFAQ(){
  const [open,setOpen]=useState<number|null>(0)
  return <div className="divide-y divide-[#242424] border-y border-[#242424]">{items.map(([q,a],i)=>{const active=open===i;const id=`broker-faq-${i}`;return <div key={q}><button onClick={()=>setOpen(active?null:i)} aria-expanded={active} aria-controls={id} className="flex min-h-[66px] w-full items-center justify-between gap-4 py-3 text-left"><span className="text-[14px] font-medium text-[#e8e8e7] sm:text-[15px]">{q}</span><ChevronDown className={`h-4 w-4 shrink-0 text-[#8d8e94] transition-transform duration-200 ${active?'rotate-180':''}`}/></button><div id={id} className={`grid transition-all duration-200 ${active?'grid-rows-[1fr] pb-5':'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="max-w-[720px] text-[13px] leading-6 text-[#85868c]">{a}</p></div></div></div>})}</div>
}
