import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { timingSafeEqual } from 'node:crypto'
export const runtime='nodejs'
function authorised(request:Request){const secret=process.env.CRON_SECRET;const header=request.headers.get('authorization')||'';if(!secret||!header.startsWith('Bearer '))return false;const a=Buffer.from(header.slice(7));const b=Buffer.from(secret);return a.length===b.length&&timingSafeEqual(a,b)}
export async function GET(request:Request){
 if(!authorised(request))return NextResponse.json({error:'Unauthorised'},{status:401})
 const url=process.env.LEAD_NOTIFICATION_WEBHOOK_URL
 const token=process.env.LEAD_NOTIFICATION_WEBHOOK_TOKEN
 if(!url||!token)return NextResponse.json({error:'Notification provider not configured. Existing queue remains pending.'},{status:503})
 if(!url.startsWith('https://'))return NextResponse.json({error:'HTTPS notification endpoint required'},{status:503})
 const sql=db()
 try{
  await sql`UPDATE lead_notifications SET status='PENDING',updated_at=CURRENT_TIMESTAMP WHERE status='PROCESSING' AND updated_at < CURRENT_TIMESTAMP - INTERVAL '15 minutes' AND attempts < 6`
  const tasks=await sql`UPDATE lead_notifications SET status='PROCESSING',attempts=attempts+1,updated_at=CURRENT_TIMESTAMP WHERE id IN
   (SELECT id FROM lead_notifications WHERE status='PENDING' AND next_attempt_at<=CURRENT_TIMESTAMP AND attempts<6 ORDER BY id FOR UPDATE SKIP LOCKED LIMIT 10)
   RETURNING id,lead_id,attempts`
  let delivered=0,failed=0
  for(const task of tasks){
   try{
    const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`,'Idempotency-Key':String(task.id)},body:JSON.stringify({event:'lead.created',leadId:String(task.lead_id),notificationId:String(task.id)}),signal:AbortSignal.timeout(8000),cache:'no-store'})
    if(!response.ok)throw new Error(`Provider returned ${response.status}`)
    await sql`UPDATE lead_notifications SET status='DELIVERED',updated_at=CURRENT_TIMESTAMP,last_error='' WHERE id=${task.id}`
    delivered++
   }catch(error){
    const attempts=Number(task.attempts)
    const message=error instanceof Error?error.message.slice(0,160):'Notification failed'
    await sql`UPDATE lead_notifications SET status=${attempts>=6?'FAILED':'PENDING'},next_attempt_at=CURRENT_TIMESTAMP + (${Math.min(3600,60*2**(attempts-1))} * INTERVAL '1 second'),last_error=${message},updated_at=CURRENT_TIMESTAMP WHERE id=${task.id}`
    failed++
   }
  }
  return NextResponse.json({processed:tasks.length,delivered,failed},{headers:{'Cache-Control':'no-store'}})
 }catch{return NextResponse.json({error:'Notification queue processing failed'},{status:500})}
}
