'use client'

import { Eye, EyeOff, LockKeyhole, ArrowRight } from 'lucide-react'
import { FormEvent, useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        cache: 'no-store',
        body: JSON.stringify({ password }),
      })
      const data = await response.json().catch(() => ({})) as { error?: string }
      if (!response.ok) {
        if (response.status === 503) setError('Admin login is not configured on this deployment. Add ADMIN_PASSWORD to the production environment and redeploy.')
        else if (response.status === 429) setError('Too many login attempts. Please wait a few minutes and try again.')
        else if (response.status === 401) setError('That password was not accepted. Please try again.')
        else setError(data.error || 'We could not sign you in. Please try again.')
        return
      }
      window.location.replace('/admin')
    } catch {
      setError('We could not sign you in. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#090a0b] px-5 py-10 text-[#f4f4f3]">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',backgroundSize:'52px 52px'}} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d92f3c]/[0.055] blur-[120px]" />

      <section className="relative z-10 w-full max-w-[430px]">
        <div className="mb-7 text-center">
          <img src="/booth-marketing-logo.png" alt="Booth Marketing" className="mx-auto w-[175px] sm:w-[195px]" />
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#9b9ca2]">
            <LockKeyhole className="h-3 w-3 text-[#d8cbb7]" /> Private Operations
          </div>
        </div>

        <div className="rounded-[22px] border border-white/[0.09] bg-[#0d0f10]/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
          <h1 className="text-[30px] font-semibold tracking-[-0.045em]">Welcome back.</h1>
          <p className="mt-2 text-[13px] leading-6 text-[#85868c]">Sign in to manage enquiries, website audits and your sales pipeline.</p>

          <form onSubmit={submit} className="mt-7">
            <label htmlFor="password" className="mb-2 block text-[12px] font-medium text-[#c9c9cc]">Admin password</label>
            <div className="relative">
              <input id="password" autoFocus required value={password} onChange={event => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" className="min-h-[52px] w-full rounded-xl border border-white/[0.09] bg-[#090a0b] px-4 pr-12 text-[15px] text-white outline-none transition placeholder:text-[#55565b] focus:border-[#d8cbb7]/40" />
              <button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#6f7076] transition hover:bg-white/[0.04] hover:text-white">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p role="alert" className="mt-3 rounded-lg border border-[#d92f3c]/15 bg-[#190f11] px-3 py-2.5 text-[11px] leading-5 text-[#d1a3a8]">{error}</p>}
            <button disabled={loading || !password} className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-xl border border-[#efe3cf] bg-[#efe3cf] px-5 text-[13px] font-semibold text-[#151515] transition hover:bg-[#f6ead7] disabled:cursor-wait disabled:opacity-60">
              {loading ? 'Signing in...' : 'Enter dashboard'}
              {!loading && <ArrowRight className="ml-2.5 h-4 w-4" />}
            </button>
          </form>
        </div>
        <p className="mt-5 text-center text-[10px] tracking-[0.04em] text-[#55565b]">BOOTH MARKETING · SECURE OPERATIONS</p>
      </section>
    </main>
  )
}
