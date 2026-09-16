import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { clientIp,hasAllowedJsonSize,rateLimit,safeText,sameOrigin } from '@/lib/security'

const TIMES=['10:00','11:30','14:00','15:30']

async function ensureTable(){
  await db()`CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(booking_date, booking_time)
  )`
}

function validDate(value:string){return /^\d{4}-\d{2}-\d{2}$/.test(value)}
function isWeekday(value:string){const d=new Date(`${value}T12:00:00Z`);const day=d.getUTCDay();return day>=1&&day<=5}
function dateRange(){const out:string[]=[];const d=new Date();d.setUTCHours(12,0,0,0);for(let i=0;i<28&&out.length<14;i++){d.setUTCDate(d.getUTCDate()+1);const day=d.getUTCDay();if(day>=1&&day<=5)out.push(d.toISOString().slice(0,10))}return out}

export async function GET(){
  try{
    await ensureTable()
    const dates=dateRange()
    const rows=await db()`SELECT booking_date::text AS date, booking_time AS time FROM bookings WHERE booking_date>=CURRENT_DATE AND booking_date<=CURRENT_DATE+INTERVAL '35 days'`
    const taken=new Set(rows.map(r=>`${String(r.date)}|${String(r.time)}`))
    return NextResponse.json({timezone:'Europe/London',dates:dates.map(date=>({date,times:TIMES.filter(time=>!taken.has(`${date}|${time}`))}))},{headers:{'Cache-Control':'no-store'}})
  }catch{return NextResponse.json({error:'Booking availability is temporarily unavailable.'},{status:500})}
}

async function sendEmail(to:string,subject:string,html:string){
  const key=process.env.RESEND_API_KEY
  const from=process.env.RESEND_FROM_EMAIL||'Booth Marketing <bookings@boothmarketing.co.uk>'
  if(!key)return
  await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],subject,html})})
}

export async function POST(request:Request){
  try{
    if(!sameOrigin(request))return NextResponse.json({error:'Invalid request'},{status:403})
    if(!hasAllowedJsonSize(request,12_000))return NextResponse.json({error:'Request too large'},{status:413})
    const gate=rateLimit(`booking:${clientIp(request)}`,5,10*60*1000)
    if(!gate.ok)return NextResponse.json({error:'Too many attempts. Please try again shortly.'},{status:429})
    const body=await request.json()
    if(safeText(body.websiteCompany,100))return NextResponse.json({success:true})
    const name=safeText(body.name,120),email=safeText(body.email,200).toLowerCase(),company=safeText(body.company,160),notes=safeText(body.notes,1000),date=safeText(body.date,10),time=safeText(body.time,5)
    if(!name||!email||!company||!validDate(date)||!TIMES.includes(time)||!isWeekday(date))return NextResponse.json({error:'Complete all required booking details.'},{status:400})
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json({error:'Enter a valid email address.'},{status:400})
    if(!dateRange().includes(date))return NextResponse.json({error:'Choose one of the available dates.'},{status:400})
    await ensureTable()
    try{await db()`INSERT INTO bookings(id,booking_date,booking_time,name,email,company,notes) VALUES(${crypto.randomUUID()},${date},${time},${name},${email},${company},${notes})`}catch{return NextResponse.json({error:'That time has just been booked. Please choose another.'},{status:409})}
    const safe=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c))
    const when=`${date} at ${time} (UK time)`
    await Promise.allSettled([
      sendEmail(email,'Your Booth Marketing call is booked',`<p>Hi ${safe(name)},</p><p>Your Booth Marketing call is booked for <strong>${safe(when)}</strong>.</p><p>We look forward to speaking with you.</p>`),
      process.env.BOOKING_NOTIFICATION_EMAIL?sendEmail(process.env.BOOKING_NOTIFICATION_EMAIL,'New Booth Marketing booking',`<p><strong>${safe(name)}</strong> from ${safe(company)} booked ${safe(when)}.</p><p>${safe(email)}</p><p>${safe(notes)}</p>`):Promise.resolve()
    ])
    return NextResponse.json({success:true,date,time},{status:201})
  }catch{return NextResponse.json({error:'Unable to complete the booking.'},{status:500})}
}
