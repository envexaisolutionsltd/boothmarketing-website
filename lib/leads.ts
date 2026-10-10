import { db } from './db'
import { createHash } from 'node:crypto'
export type LeadStatus='NEW'|'CONTACTED'|'QUALIFIED'|'BOOKED'|'CLOSED_WON'|'CLOSED_LOST'
export type EnquiryType='WEBSITE_AUDIT'|'AUTOMATION_AUDIT'|'CONTACT'
export type Lead={id:string;name:string;email:string;company:string;phone?:string;consent?:boolean;industry?:string;teamSize?:string;challenge?:string;status:LeadStatus;enquiryType?:EnquiryType;notes?:string;websiteUrl?:string;opportunityScore?:string;firstImpression?:string;trustIssues?:string;conversionIssues?:string;uxIssues?:string;technicalIssues?:string;aiSearchIssues?:string;recommendedChanges?:string;outreachAngle?:string;createdAt:string;updatedAt?:string}
export type LeadActivity={id:string;leadId:string;activityType:string;summary:string;metadata:Record<string,unknown>;createdAt:string}
type LeadRow={id:string;name:string;email:string;company:string;phone?:string|null;consent?:boolean|null;industry:string|null;team_size:string|null;challenge:string|null;status:LeadStatus;enquiry_type?:EnquiryType|null;notes:string|null;website_url:string|null;opportunity_score:string|null;first_impression:string|null;trust_issues:string|null;conversion_issues:string|null;ux_issues:string|null;technical_issues:string|null;ai_search_issues:string|null;recommended_changes:string|null;outreach_angle:string|null;created_at:string|Date;updated_at:string|Date|null}
function map(r:LeadRow):Lead{return{id:r.id,name:r.name,email:r.email,company:r.company,phone:r.phone||'',consent:Boolean(r.consent),industry:r.industry||'',teamSize:r.team_size||'',challenge:r.challenge||'',status:r.status,enquiryType:r.enquiry_type||'WEBSITE_AUDIT',notes:r.notes||'',websiteUrl:r.website_url||'',opportunityScore:r.opportunity_score||'',firstImpression:r.first_impression||'',trustIssues:r.trust_issues||'',conversionIssues:r.conversion_issues||'',uxIssues:r.ux_issues||'',technicalIssues:r.technical_issues||'',aiSearchIssues:r.ai_search_issues||'',recommendedChanges:r.recommended_changes||'',outreachAngle:r.outreach_angle||'',createdAt:new Date(r.created_at).toISOString(),updatedAt:r.updated_at?new Date(r.updated_at).toISOString():undefined}}
async function ensureLeadSchema(){
 const sql=db()
 await sql`CREATE TABLE IF NOT EXISTS leads(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  industry TEXT NOT NULL DEFAULT '',
  team_size TEXT NOT NULL DEFAULT '',
  challenge TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'NEW',
  phone TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  enquiry_type TEXT NOT NULL DEFAULT 'WEBSITE_AUDIT',
  notes TEXT NOT NULL DEFAULT '',
  website_url TEXT NOT NULL DEFAULT '',
  opportunity_score TEXT NOT NULL DEFAULT '',
  first_impression TEXT NOT NULL DEFAULT '',
  trust_issues TEXT NOT NULL DEFAULT '',
  conversion_issues TEXT NOT NULL DEFAULT '',
  ux_issues TEXT NOT NULL DEFAULT '',
  technical_issues TEXT NOT NULL DEFAULT '',
  ai_search_issues TEXT NOT NULL DEFAULT '',
  recommended_changes TEXT NOT NULL DEFAULT '',
  outreach_angle TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
 )`
 await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS enquiry_type TEXT NOT NULL DEFAULT 'AUTOMATION_AUDIT'`
 await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT`
 await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent BOOLEAN NOT NULL DEFAULT false`
 await sql`CREATE TABLE IF NOT EXISTS lead_submission_keys (submission_key TEXT PRIMARY KEY, fingerprint TEXT NOT NULL, lead_id TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP)`
 await sql`CREATE TABLE IF NOT EXISTS lead_notifications (id BIGSERIAL PRIMARY KEY, lead_id TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'PENDING', attempts INTEGER NOT NULL DEFAULT 0, next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, last_error TEXT NOT NULL DEFAULT '', updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP)`
 await sql`CREATE INDEX IF NOT EXISTS lead_notifications_queue_idx ON lead_notifications(status,next_attempt_at)`
 await sql`CREATE TABLE IF NOT EXISTS lead_activity(
  id BIGSERIAL PRIMARY KEY,
  lead_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  summary TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
 )`
}
export async function getLeads(){await ensureLeadSchema();const rows=await db()`SELECT * FROM leads ORDER BY created_at DESC`;return rows.map(r=>map(r as unknown as LeadRow))}
export async function getLeadById(id:string){await ensureLeadSchema();const rows=await db()`SELECT * FROM leads WHERE id=${id} LIMIT 1`;return rows[0]?map(rows[0] as unknown as LeadRow):null}
export async function hasRecentMatchingLead(email:string,company:string,websiteUrl:string,challenge:string){await ensureLeadSchema();const rows=await db()`SELECT id FROM leads WHERE lower(trim(email))=lower(trim(${email})) AND lower(company)=lower(${company}) AND lower(COALESCE(website_url,''))=lower(${websiteUrl}) AND COALESCE(challenge,'')=${challenge} AND created_at >= CURRENT_TIMESTAMP - INTERVAL '10 minutes' LIMIT 1`;return rows.length>0}
export async function getLeadActivity(id:string):Promise<LeadActivity[]>{try{await ensureLeadSchema();const rows=await db()`SELECT id,lead_id,activity_type,summary,metadata,created_at FROM lead_activity WHERE lead_id=${id} ORDER BY created_at DESC`;return rows.map(r=>({id:String(r.id),leadId:String(r.lead_id),activityType:String(r.activity_type),summary:String(r.summary),metadata:(r.metadata&&typeof r.metadata==='object'?r.metadata:{}) as Record<string,unknown>,createdAt:new Date(r.created_at).toISOString()}))}catch{return[]}}
export async function addLeadActivity(leadId:string,activityType:string,summary:string,metadata:Record<string,unknown>={}){await ensureLeadSchema();await db()`INSERT INTO lead_activity(lead_id,activity_type,summary,metadata) VALUES(${leadId},${activityType},${summary},${JSON.stringify(metadata)}::jsonb)`}
export async function saveLead(lead:Lead){await ensureLeadSchema();await db()`INSERT INTO leads(id,name,email,company,phone,consent,industry,team_size,challenge,status,enquiry_type,notes,website_url,opportunity_score,first_impression,trust_issues,conversion_issues,ux_issues,technical_issues,ai_search_issues,recommended_changes,outreach_angle,created_at) VALUES(${lead.id},${lead.name},${lead.email},${lead.company},${lead.phone||''},${Boolean(lead.consent)},${lead.industry||''},${lead.teamSize||''},${lead.challenge||''},${lead.status},${lead.enquiryType||'AUTOMATION_AUDIT'},${lead.notes||''},${lead.websiteUrl||''},${lead.opportunityScore||''},${lead.firstImpression||''},${lead.trustIssues||''},${lead.conversionIssues||''},${lead.uxIssues||''},${lead.technicalIssues||''},${lead.aiSearchIssues||''},${lead.recommendedChanges||''},${lead.outreachAngle||''},${lead.createdAt})`;try{await addLeadActivity(lead.id,'CREATED',lead.enquiryType==='AUTOMATION_AUDIT'?'Automation audit request received':'Website enquiry received',{enquiryType:lead.enquiryType||'WEBSITE_AUDIT'})}catch{};return lead}
export async function updateLead(id:string,u:Partial<Lead>){const before=await getLeadById(id);await db()`UPDATE leads SET status=COALESCE(${u.status??null},status),notes=COALESCE(${u.notes??null},notes),website_url=COALESCE(${u.websiteUrl??null},website_url),opportunity_score=COALESCE(${u.opportunityScore??null},opportunity_score),first_impression=COALESCE(${u.firstImpression??null},first_impression),trust_issues=COALESCE(${u.trustIssues??null},trust_issues),conversion_issues=COALESCE(${u.conversionIssues??null},conversion_issues),ux_issues=COALESCE(${u.uxIssues??null},ux_issues),technical_issues=COALESCE(${u.technicalIssues??null},technical_issues),ai_search_issues=COALESCE(${u.aiSearchIssues??null},ai_search_issues),recommended_changes=COALESCE(${u.recommendedChanges??null},recommended_changes),outreach_angle=COALESCE(${u.outreachAngle??null},outreach_angle),updated_at=CURRENT_TIMESTAMP WHERE id=${id}`;try{if(before&&u.status&&u.status!==before.status)await addLeadActivity(id,'STATUS_CHANGED',`Status changed from ${before.status.replaceAll('_',' ')} to ${u.status.replaceAll('_',' ')}`,{from:before.status,to:u.status})}catch{}}
export async function deleteLead(id:string){await ensureLeadSchema();await db()`DELETE FROM leads WHERE id=${id}`}
export async function safeLeads(){try{return{leads:await getLeads(),error:false}}catch{return{leads:[] as Lead[],error:true}}}

/**
 * One atomic transaction for a submission key, lead, audit activity and notification.
 * Concurrent retries are serialised by the primary key. Different keys, even from
 * the same email address, create separate legitimate enquiries.
 */
export async function saveLeadIdempotently(lead:Lead,submissionKey:string){
 await ensureLeadSchema()
 const fingerprint=createHash('sha256').update(JSON.stringify({
  name:lead.name,email:lead.email,company:lead.company,phone:lead.phone||'',
  consent:Boolean(lead.consent),industry:lead.industry||'',teamSize:lead.teamSize||'',
  challenge:lead.challenge||'',websiteUrl:lead.websiteUrl||'',enquiryType:lead.enquiryType||'AUTOMATION_AUDIT'
 })).digest('hex')
 const sql=db()
 return sql.begin(async tx=>{
  const inserted=await tx`INSERT INTO lead_submission_keys(submission_key,fingerprint,lead_id)
   VALUES(${submissionKey},${fingerprint},${lead.id}) ON CONFLICT DO NOTHING RETURNING lead_id`
  if(!inserted.length){
   const existing=await tx`SELECT lead_id,fingerprint FROM lead_submission_keys WHERE submission_key=${submissionKey} LIMIT 1`
   if(!existing.length)throw new Error('Idempotency lookup failed')
   if(existing[0].fingerprint!==fingerprint)return {id:String(existing[0].lead_id),duplicate:true,conflict:true}
   return {id:String(existing[0].lead_id),duplicate:true,conflict:false}
  }
  await tx`INSERT INTO leads(id,name,email,company,phone,consent,industry,team_size,challenge,status,enquiry_type,website_url,created_at)
   VALUES(${lead.id},${lead.name},${lead.email},${lead.company},${lead.phone||''},${Boolean(lead.consent)},${lead.industry||''},${lead.teamSize||''},${lead.challenge||''},${lead.status},${lead.enquiryType||'AUTOMATION_AUDIT'},${lead.websiteUrl||''},${lead.createdAt})`
  await tx`INSERT INTO lead_activity(lead_id,activity_type,summary,metadata)
   VALUES(${lead.id},'CREATED','Enquiry received',${JSON.stringify({enquiryType:lead.enquiryType||'AUTOMATION_AUDIT'})}::jsonb)`
  await tx`INSERT INTO lead_notifications(lead_id) VALUES(${lead.id})`
  return {id:lead.id,duplicate:false,conflict:false}
 })
}
