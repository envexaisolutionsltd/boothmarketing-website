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
  const [complete, setComplete] = useState(false)
  const inputRefs = useRef<Partial<Record<AuditField, HTMLInputElement | HTMLTextAreaElement | null>>>({})
  const statusRef = useRef<HTMLDivElement>(null)
  function change(key: AuditField, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (attempted) setErrors(validateAudit(next))
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validateAudit(values)
    setAttempted(true)
    setErrors(found)
    const first = fields.find(field => found[field.key])
    if (first) { inputRefs.current[first.key]?.focus(); return }
    setValues({ ...emptyAuditValues })
    setErrors({})
    setComplete(true)
    requestAnimationFrame(() => statusRef.current?.focus())
  }
  function restart() {
    setValues({ ...emptyAuditValues })
    setErrors({})
    setAttempted(false)
    setComplete(false)
    requestAnimationFrame(() => inputRefs.current.fullName?.focus())
  }
  if (complete) return <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="automation-landing__form-success"><h3>Demonstration completed</h3><p>Demonstration completed. Your information passed validation, but no audit request has been sent.</p><button type="button" onClick={restart} className="automation-landing__form-button">Start Again</button></div>
  return <form noValidate onSubmit={submit} autoComplete="off" className="automation-landing__form">
    <div className="automation-landing__form-grid">{fields.map(field => {
      const id = `audit-demo-${field.key}`
      const errorId = `${id}-error`
      const hasError = Boolean(errors[field.key])
      const common = { id, name: field.key, value: values[field.key], required: field.required, 'aria-invalid': hasError, 'aria-describedby': hasError ? errorId : undefined, onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => change(field.key, e) }
      return <div key={field.key} className={`automation-landing__field ${field.key === 'challenge' ? 'automation-landing__field--wide' : ''}`}><label htmlFor={id}>{field.label}{field.required ? ' *' : ''}</label>{field.key === 'challenge' ? <textarea {...common} rows={5} ref={node => { inputRefs.current[field.key] = node }} /> : <input {...common} type={field.type || 'text'} autoComplete={field.autocomplete} ref={node => { inputRefs.current[field.key] = node }} />}{hasError && <p className="automation-landing__error" id={errorId}>{errors[field.key]}</p>}</div>
    })}</div>
    <p className="automation-landing__notice">Demonstration only. This form checks your entries locally. Nothing is sent to Booth Marketing or saved by this page.</p>
    <p className="automation-landing__privacy">Do not include passwords, customer records or confidential business information.</p>
    <button type="submit" className="automation-landing__form-button">Request an Automation Audit</button>
  </form>
}
