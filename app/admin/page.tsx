import Link from 'next/link'
import { ArrowUpRight, CalendarCheck, CircleDot, Users } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import { getLeads } from '@/lib/leads'

export const dynamic='force-dynamic'
export const revalidate=0

const label=(value:string)=>value.replaceAll('_',' ')
const statuses=['NEW','CONTACTED','QUALIFIED','BOOKED','CLOSED_WON','CLOSED_LOST'] as const

export default async function AdminPage(){
  let leads:Awaited<ReturnType<typeof getLeads>>=[]
  let healthy=true
  try{leads=await getLeads()}catch{healthy=false}
  const stats=[
    {label:'New leads',value:leads.filter(l=>l.status==='NEW').length,note:'Awaiting first review'},
    {label:'Contacted',value:leads.filter(l=>l.status==='CONTACTED').length,note:'Conversation started'},
    {label:'Qualified',value:leads.filter(l=>l.status==='QUALIFIED').length,note:'Commercial opportunities'},
    {label:'Calls booked',value:leads.filter(l=>l.status==='BOOKED').length,note:'Next conversations'},
  ]
  const recent=leads.slice(0,5)
  const attention=leads.filter(l=>['NEW','QUALIFIED','BOOKED'].includes(l.status)).slice(0,5)
  return <AdminShell section="Overview"><div className="mx-auto max-w-[1280px]">
    <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#d8cbb7]">Booth Marketing command centre</p><h1 className="mt-3 text-[clamp(32px,5vw,46px)] font-semibold tracking-[-0.05em]">Operations overview</h1><p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#7f8086]">Enquiries, audit workload and pipeline movement in one private workspace.</p></div><div className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] ${healthy?'border-emerald-500/15 bg-emerald-500/[0.05] text-emerald-300':'border-[#d92f3c]/20 bg-[#190f11] text-[#d1a3a8]'}`}><CircleDot className="h-3 w-3"/>{healthy?'Systems operational':'Database unavailable'}</div></div>
    <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{stats.map(item=><div key={item.label} className="rounded-[18px] border border-white/[0.075] bg-[#0d0f10] p-5"><p className="text-[11px] font-medium text-[#8b8c92]">{item.label}</p><p className="mt-4 text-[34px] font-semibold tracking-[-0.04em]">{item.value}</p><p className="mt-2 text-[10px] text-[#57585e]">{item.note}</p></div>)}</div>
    <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
      <section className="overflow-hidden rounded-[18px] border border-white/[0.075] bg-[#0d0f10]"><div className="flex items-center justify-between border-b border-white/[0.07] p-5"><div><h2 className="text-[15px] font-semibold">Pipeline snapshot</h2><p className="mt-1 text-[10px] text-[#626369]">Current lead distribution</p></div><Link href="/admin/pipeline" className="text-[10px] font-semibold text-[#d8cbb7]">View pipeline</Link></div><div className="grid grid-cols-2 gap-px bg-white/[0.05] sm:grid-cols-5">{statuses.map(status=><div key={status} className="bg-[#0d0f10] p-4"><p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#5f6066]">{label(status)}</p><p className="mt-2 text-[22px] font-semibold">{leads.filter(l=>l.status===status).length}</p></div>)}</div></section>
      <section className="rounded-[18px] border border-white/[0.075] bg-[#0d0f10] p-5"><div className="flex items-center gap-2"><Users className="h-4 w-4 text-[#d8cbb7]"/><h2 className="text-[15px] font-semibold">At a glance</h2></div><div className="mt-5 space-y-3"><div className="flex justify-between border-b border-white/[0.06] pb-3 text-[11px]"><span className="text-[#717278]">Total enquiries</span><b>{leads.length}</b></div><div className="flex justify-between border-b border-white/[0.06] pb-3 text-[11px]"><span className="text-[#717278]">Open pipeline</span><b>{leads.filter(l=>l.status!=='CLOSED_WON','CLOSED_LOST').length}</b></div><div className="flex justify-between text-[11px]"><span className="text-[#717278]">Needs attention</span><b>{attention.length}</b></div></div></section>
    </div>
    <div className="mt-4 grid gap-4 xl:grid-cols-2">
      <section className="overflow-hidden rounded-[18px] border border-white/[0.075] bg-[#0d0f10]"><div className="flex items-center justify-between border-b border-white/[0.07] p-5"><div><h2 className="text-[15px] font-semibold">Recent enquiries</h2><p className="mt-1 text-[10px] text-[#626369]">Latest records received</p></div><Link href="/admin/leads" className="text-[10px] font-semibold text-[#d8cbb7]">View all</Link></div>{recent.length? <div className="divide-y divide-white/[0.06]">{recent.map(lead=><Link href={`/admin/leads/${lead.id}`} key={lead.id} className="flex items-center justify-between gap-4 p-4 transition hover:bg-white/[0.025]"><div className="min-w-0"><p className="truncate text-[12px] font-semibold">{lead.company}</p><p className="mt-1 truncate text-[10px] text-[#66676d]">{lead.name} · {lead.email}</p></div><div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-white/[0.07] px-2.5 py-1 text-[8px] uppercase text-[#77787e] sm:block">{label(lead.status)}</span><ArrowUpRight className="h-3.5 w-3.5 text-[#66676d]"/></div></Link>)}</div>:<Empty copy="New website and automation audit enquiries will appear here."/>}</section>
      <section className="overflow-hidden rounded-[18px] border border-white/[0.075] bg-[#0d0f10]"><div className="border-b border-white/[0.07] p-5"><div className="flex items-center gap-2"><CalendarCheck className="h-4 w-4 text-[#d8cbb7]"/><h2 className="text-[15px] font-semibold">Attention required</h2></div><p className="mt-1 text-[10px] text-[#626369]">Open items worth checking next</p></div>{attention.length?<div className="divide-y divide-white/[0.06]">{attention.map(lead=><Link href={`/admin/leads/${lead.id}`} key={lead.id} className="block p-4 hover:bg-white/[0.025]"><div className="flex justify-between gap-3"><p className="text-[12px] font-semibold">{lead.company}</p><span className="text-[8px] uppercase tracking-[0.1em] text-[#d8cbb7]">{label(lead.status)}</span></div><p className="mt-1 line-clamp-1 text-[10px] text-[#66676d]">{lead.challenge||'Review this enquiry and decide the next action.'}</p></Link>)}</div>:<Empty copy="Nothing currently needs attention."/>}</section>
    </div>
  </div></AdminShell>
}
function Empty({copy}:{copy:string}){return <div className="p-8 text-center"><p className="text-[12px] font-medium text-[#8b8c92]">No records yet</p><p className="mx-auto mt-2 max-w-sm text-[10px] leading-5 text-[#55565b]">{copy}</p></div>}
