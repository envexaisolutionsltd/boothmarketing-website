import fs from 'node:fs'

const company = fs.readFileSync('lib/public-company.ts', 'utf8')
const tools = fs.readFileSync('components/WebMCPTools.tsx', 'utf8')
const leads = fs.readFileSync('app/api/leads/route.ts', 'utf8')

const expected = [
  'get_booth_marketing_services',
  'recommend_booth_marketing_service',
  'get_booth_marketing_process',
  'request_automation_audit',
  'submit_booth_marketing_enquiry',
]
for (const name of expected) {
  if (!tools.includes(`name: '${name}'`)) throw new Error(`Missing WebMCP tool: ${name}`)
}
for (const phrase of ['AI Opportunity Diagnosis', 'AI Automation Prototypes', 'AI Workflow Automation']) {
  if (!company.includes(phrase)) throw new Error(`Public company contract missing: ${phrase}`)
}
for (const legacyPhrase of ['request_website_audit', 'Website Conversion Audit', 'Landing Pages']) {
  if (tools.includes(legacyPhrase)) throw new Error(`Legacy website service remains in WebMCP: ${legacyPhrase}`)
}
for (const phrase of ['consent_to_contact', 'confirmed_by_user', 'webmcpConfirmed']) {
  if (!tools.includes(phrase)) throw new Error(`WebMCP writes must require explicit consent: missing ${phrase}`)
}
if (!leads.includes('webmcpConfirmed!==true')) throw new Error('Lead API must reject unconfirmed WebMCP writes')
if (!leads.includes('hasRecentMatchingLead')) throw new Error('Lead API must retain duplicate protection')
if (!leads.includes("enquiryType==='AUTOMATION_AUDIT'&&!consent")) throw new Error('Lead API must require consent for audit submissions')
if (/ADMIN_PASSWORD|POSTGRES_URL|SUPABASE_SERVICE_ROLE/.test(company + tools)) throw new Error('Public agent code references a secret name')
console.log('WebMCP contract checks passed:', expected.length, 'tools')
