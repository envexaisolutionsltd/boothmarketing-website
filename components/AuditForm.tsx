'use client'

import { useState } from 'react'

export default function AuditForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())

    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      setMessage('Thanks. Your audit request has been received.')
      event.currentTarget.reset()
    } else {
      setMessage('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={submitForm} className="space-y-4">
      <input name="name" required placeholder="Your name" className="w-full rounded-xl border p-3" />
      <input name="email" required placeholder="Business email" className="w-full rounded-xl border p-3" />
      <input name="company" required placeholder="Company name" className="w-full rounded-xl border p-3" />
      <input name="websiteUrl" placeholder="Website URL" className="w-full rounded-xl border p-3" />
      <input name="industry" required placeholder="Industry" className="w-full rounded-xl border p-3" />
      <input name="teamSize" required placeholder="Team size" className="w-full rounded-xl border p-3" />
      <textarea name="challenge" placeholder="Biggest website challenge" className="w-full rounded-xl border p-3" />

      <button disabled={loading} className="rounded-xl bg-black px-6 py-3 text-white">
        {loading ? 'Submitting...' : 'Request My Audit'}
      </button>

      {message && <p>{message}</p>}
    </form>
  )
}
