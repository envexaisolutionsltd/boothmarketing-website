'use client'

import { useEffect } from 'react'
import { boothMarketingPublic as company } from '@/lib/public-company'

type Tool = {
  name: string
  title: string
  description: string
  inputSchema: Record<string, unknown>
  annotations: { readOnlyHint: boolean; consequentialHint: boolean; untrustedContentHint: boolean }
  execute: (input: Record<string, unknown>) => unknown | Promise<unknown>
}
type Context = { registerTool: (tool: Tool, options?: { signal?: AbortSignal }) => unknown | Promise<unknown> }
const str = (value: unknown) => String(value ?? '').trim()
const empty = { type: 'object', additionalProperties: false, properties: {} }

function getContext(): Context | null {
  const doc = document as Document & { modelContext?: Context }
  if (doc.modelContext?.registerTool) return doc.modelContext
  const nav = navigator as Navigator & { modelContext?: Context }
  return nav.modelContext?.registerTool ? nav.modelContext : null
}

async function postLead(payload: Record<string, unknown>) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Booth-WebMCP': '1' },
    body: JSON.stringify(payload),
  })
  const result = await response.json().catch(() => ({})) as { duplicate?: boolean; error?: string }
  if (!response.ok) throw new Error(result.error || 'The enquiry could not be submitted.')
  return {
    success: true,
    duplicate: Boolean(result.duplicate),
    message: result.duplicate
      ? 'This request was already received recently, so another lead was not created.'
      : 'Your request has been received by Booth Marketing.',
    next_step: 'Booth Marketing will review the enquiry and respond using the contact details supplied.',
  }
}

export default function WebMCPTools() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_WEBMCP_ENABLED === 'false') return
    const context = getContext()
    if (!context) {
      if (process.env.NODE_ENV !== 'production') console.info('[WebMCP] Browser API unavailable; normal website behaviour is unchanged.')
      return
    }

    const controller = new AbortController()
    const tools: Tool[] = [
      {
        name: 'get_booth_marketing_services',
        title: 'Get Booth Marketing services',
        description: 'Read current public information about Booth Marketing services, ideal customers, problems solved and calls to action. Read-only. Do not infer prices, guarantees, clients or results.',
        inputSchema: empty,
        annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
        execute: () => ({
          company_name: company.companyName,
          what_booth_marketing_does: company.whatWeDo,
          positioning: company.positioning,
          buying_journey: company.buyingJourney,
          primary_services: company.primaryServices,
          secondary_services: company.secondaryServices,
          ideal_customer: company.idealCustomer,
          problems_solved: company.problemsSolved,
          process: company.process,
          engagement_note: company.engagementNote,
          calls_to_action: company.callsToAction,
        }),
      },
      {
        name: 'recommend_booth_marketing_service',
        title: 'Recommend a Booth Marketing service',
        description: 'Recommend a current AI automation service using only information the prospect supplies. Read-only; this tool does not inspect systems or make an operational diagnosis.',
        inputSchema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            business_type: { type: 'string', minLength: 1, maxLength: 120 },
            current_problem: { type: 'string', minLength: 1, maxLength: 800 },
            primary_goal: { type: 'string', minLength: 1, maxLength: 500 },
            additional_context: { type: 'string', maxLength: 1000 },
          },
          required: ['business_type', 'current_problem', 'primary_goal'],
        },
        annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
        execute: (input) => {
          const need = `${str(input.current_problem)} ${str(input.primary_goal)} ${str(input.additional_context)}`.toLowerCase()
          const prototype = /prototype|demonstrat|proof of concept|test an idea/.test(need)
          const implementation = /implement|connect systems|build|deploy|integrat/.test(need)
          const service = prototype
            ? company.primaryServices[1]
            : implementation
              ? company.primaryServices[2]
              : company.primaryServices[0]
          return {
            recommended_service: service.name,
            reason: prototype
              ? 'The supplied need is to see a proposed workflow demonstrated before a larger implementation.'
              : implementation
                ? 'The supplied need is to implement or connect a practical business workflow.'
                : 'The supplied information points to identifying and prioritising an automation opportunity first.',
            suggested_next_step: 'Request an Automation Audit so Booth Marketing can understand the process and decide what may be worth exploring.',
            limitation: 'This recommendation uses only the information supplied. No process, system or workflow has been inspected.',
          }
        },
      },
      {
        name: 'get_booth_marketing_process',
        title: 'Get Booth Marketing process',
        description: 'Explain the public Booth Marketing diagnosis, prioritisation, prototype, build and improvement process. Read-only and makes no delivery commitments.',
        inputSchema: empty,
        annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
        execute: () => ({
          company_name: company.companyName,
          process: company.process,
          calls_to_action: company.callsToAction,
          engagement_note: company.engagementNote,
        }),
      },
      {
        name: 'request_automation_audit',
        title: 'Request an Automation Audit',
        description: 'CONSEQUENTIAL WRITE. Submit an Automation Audit enquiry. Call only after the user explicitly chooses to submit, confirms the contact details, and agrees that Booth Marketing may contact them. Set confirmed_by_user and consent_to_contact to true only after that explicit confirmation.',
        inputSchema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 120 },
            email: { type: 'string', minLength: 3, maxLength: 200 },
            company: { type: 'string', minLength: 1, maxLength: 160 },
            business_type: { type: 'string', maxLength: 120 },
            team_size: { type: 'string', maxLength: 80 },
            website_url: { type: 'string', maxLength: 500 },
            message: { type: 'string', minLength: 1, maxLength: 1500 },
            consent_to_contact: { type: 'boolean', description: 'True only after the user agrees to be contacted about this request.' },
            confirmed_by_user: { type: 'boolean', description: 'True only after the user explicitly confirms submission of these details.' },
          },
          required: ['name', 'email', 'company', 'message', 'consent_to_contact', 'confirmed_by_user'],
        },
        annotations: { readOnlyHint: false, consequentialHint: true, untrustedContentHint: false },
        execute: async (input) => {
          if (input.confirmed_by_user !== true || input.consent_to_contact !== true) {
            throw new Error('Explicit submission confirmation and consent to contact are required.')
          }
          return postLead({
            name: str(input.name),
            email: str(input.email),
            company: str(input.company),
            websiteUrl: str(input.website_url),
            industry: str(input.business_type),
            teamSize: str(input.team_size),
            challenge: str(input.message),
            consent: true,
            enquiryType: 'AUTOMATION_AUDIT',
            webmcpConfirmed: true,
          })
        },
      },
      {
        name: 'submit_booth_marketing_enquiry',
        title: 'Submit Booth Marketing enquiry',
        description: 'CONSEQUENTIAL WRITE. Submit a general enquiry. Call only after the user explicitly chooses to contact Booth Marketing, confirms the contact details and agrees that Booth Marketing may contact them.',
        inputSchema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 120 },
            email: { type: 'string', minLength: 3, maxLength: 200 },
            company: { type: 'string', minLength: 1, maxLength: 160 },
            business_type: { type: 'string', maxLength: 120 },
            website_url: { type: 'string', maxLength: 500 },
            message: { type: 'string', minLength: 1, maxLength: 1500 },
            consent_to_contact: { type: 'boolean' },
            confirmed_by_user: { type: 'boolean' },
          },
          required: ['name', 'email', 'company', 'message', 'consent_to_contact', 'confirmed_by_user'],
        },
        annotations: { readOnlyHint: false, consequentialHint: true, untrustedContentHint: false },
        execute: async (input) => {
          if (input.confirmed_by_user !== true || input.consent_to_contact !== true) {
            throw new Error('Explicit submission confirmation and consent to contact are required.')
          }
          return postLead({
            name: str(input.name),
            email: str(input.email),
            company: str(input.company),
            websiteUrl: str(input.website_url),
            industry: str(input.business_type),
            challenge: str(input.message),
            consent: true,
            enquiryType: 'CONTACT',
            webmcpConfirmed: true,
          })
        },
      },
    ]

    Promise.allSettled(tools.map((tool) => Promise.resolve(context.registerTool(tool, { signal: controller.signal }))))
      .then((results) => {
        if (process.env.NODE_ENV !== 'production') {
          console.info(`[WebMCP] Registered ${results.filter((result) => result.status === 'fulfilled').length}/${tools.length} Booth Marketing tools.`)
        }
      })
    return () => controller.abort()
  }, [])

  return null
}
