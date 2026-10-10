'use client'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { emptyAuditValues, validateAudit, type AuditErrors, type AuditField, type AuditValues } from '@/lib/automation-landing/validation'

const fields: { key: AuditField; label: string; required: boolean; type?: string; autocomplete?: string }[] = [
  { key: 'fullName', label: 'Full name', required: true, autocomplete: 'name' },
  { key: 'businessName', label: 'Business name', required: true, autocomplete: 'organization' },
  { key: 'email', label: 'Email address', required: true, type: 'email', autocomplete: 'email' },
  { key: 'phone', label: 'Phone number (optional)', required: false, type: 'tel', autocomplete: 'tel' },
  { key: 'challenge', label: 'Biggest operational challenge', required: true },
]

export default function AuditDemoForm() {
  const [values, setValues] = useState<AuditValues>({ ...emptyAuditValues })
  const [errors, setErrors] = useState<AuditErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')
  const inputRefs = useRef<Partial<Record<AuditField, HTMLInputElement | HTMLTextAreaElement | null>>>({})
  const consentRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const pending = status === 'sending'

  function change(key: AuditField, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (attempted) setErrors(validateAudit(next))
    if (status === 'error') { setStatus('idle'); setServerError('') }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    const found = validateAudit(values)
    setAttempted(true)
    setErrors(found)
    setConsentError(!consent)
    const first = fields.find(field => found[field.key])
    if (first) { inputRefs.current[first.key]?.focus(); return }
    if (!consent) { consentRef.current?.focus(); return }
    setStatus('sending')
    setServerError('')
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiryType: 'AUTOMATION_AUDIT',
          name: values.fullName.trim(),
          company: values.businessName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          challenge: values.challenge.trim(),
          consent: true,
          websiteCompany: honeypot,
        }),
      })
      const data: { error?: string; success?: boolean; duplicate?: boolean } = await response.json().catch(() => ({}))
      if (!response.ok || data.success !== true) throw new Error(data.error || 'Your request could not be submitted. Please try again.')
      setStatus('success')
      setValues({ ...emptyAuditValues })
      setConsent(false)
      setHoneypot('')
      setErrors({})
      setConsentError(false)
      requestAnimationFrame(() => statusRef.current?.focus())
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Unable to submit your request. Please try again.')
      setStatus('error')
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  if (status === 'success') return <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="automation-landing__form-success"><h3>Request received</h3><p>Your Automation Audit request has been received. Booth Marketing can review your enquiry and contact you using the details supplied.</p><button type="button" onClick={() => { setStatus('idle'); setAttempted(false) }} className="automation-landing__form-button">Send Another Request</button></div>

  return <form noValidate onSubmit={submit} className="automation-landing__form" aria-busy={pending}>
    <div className="automation-landing__form-grid">{fields.map(field => {
      const id = `audit-form-${field.key}`
      const errorId = `${id}-error`
      const hasError = Boolean(errors[field.key])
      const common = { id, name: field.key, value: values[field.key], required: field.required, disabled: pending, 'aria-invalid': hasError, 'aria-describedby': hasError ? errorId : undefined, onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => change(field.key, e) }
      return <div key={field.key} className={`automation-landing__field ${field.key === 'challenge' ? 'automation-landing__field--wide' : ''}`}><label htmlFor={id}>{field.label}{field.required ? ' *' : ''}</label>{field.key === 'challenge' ? <textarea {...common} maxLength={1500} rows={5} ref={node => { inputRefs.current[field.key] = node }} /> : <input {...common} type={field.type || 'text'} maxLength={field.key === 'fullName' ? 100 : field.key === 'businessName' ? 150 : field.key === 'email' ? 254 : 30} autoComplete={field.autocomplete} ref={node => { inputRefs.current[field.key] = node }} />}{hasError && <p className="automation-landing__error" id={errorId}>{errors[field.key]}</p>}</div>
    })}</div>
    <div className="automation-landing__honeypot" aria-hidden="true"><label htmlFor="audit-website-company">Leave this field empty</label><input id="audit-website-company" name="websiteCompany" type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" /></div>
    <label className="automation-landing__consent"><input ref={consentRef} type="checkbox" checked={consent} disabled={pending} aria-invalid={consentError} aria-describedby={consentError ? 'audit-consent-error' : undefined} onChange={e => { setConsent(e.target.checked); setConsentError(false) }} /><span>I agree that Booth Marketing may use these details to assess my request and contact me about this automation audit. See the <a href="/privacy">privacy notice</a>.</span></label>
    {consentError && <p id="audit-consent-error" className="automation-landing__error">Please agree before submitting your request.</p>}
    <p className="automation-landing__privacy">Do not include passwords, customer records or confidential business information.</p>
    {status === 'error' && <div ref={statusRef} tabIndex={-1} role="alert" className="automation-landing__form-error">{serverError} Your entries have been preserved so you can try again.</div>}
    <button type="submit" disabled={pending} className="automation-landing__form-button">{pending ? 'Submitting…' : 'Request an Automation Audit'}</button>
    <p className="automation-landing__microcopy">No payment or commitment. Confirmation appears only after the server accepts your request.</p>
  </form>
}
