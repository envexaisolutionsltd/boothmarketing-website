import { NextRequest, NextResponse } from 'next/server'

const encoder = new TextEncoder()
const ALPHA_PAGE = '/alpha-preview'

async function validSession(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false
  const parts = token.split('.')
  if (parts.length !== 3 || parts[0] !== 'authenticated') return false

  const expiresAt = Number(parts[1])
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false

  const payload = `${parts[0]}.${parts[1]}`
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const signature = new Uint8Array(parts[2].match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [])
  if (signature.length !== 32) return false
  return crypto.subtle.verify('HMAC', key, signature, encoder.encode(payload))
}

export async function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl

  const isAlpha = hostname.toLowerCase() === 'alpha.boothmarketing.co.uk'

  if (isAlpha && request.method === 'POST' && (pathname === '/api/leads' || pathname === '/api/bookings')) {
    return NextResponse.json({ error: 'Submissions are disabled on the alpha staging site.' }, { status: 403, headers: { 'X-Robots-Tag': 'noindex, nofollow' } })
  }

  if (!isAlpha && pathname === ALPHA_PAGE) {
    return new NextResponse('Not found', { status: 404 })
  }

  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    const response = NextResponse.next()
    if (isAlpha) response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  const token = request.cookies.get('booth_admin_session')?.value
  const authenticated = await validSession(token, process.env.ADMIN_PASSWORD)

  if (!authenticated) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.delete('booth_admin_session')
    if (isAlpha) response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  const response = NextResponse.next()
  if (isAlpha) response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
