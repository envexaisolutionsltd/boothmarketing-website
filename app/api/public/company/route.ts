import { NextResponse } from 'next/server'
import { boothMarketingPublic } from '@/lib/public-company'

export const dynamic = 'force-dynamic'

export function GET(request: Request) {
  const isAlpha = new URL(request.url).hostname.toLowerCase() === 'alpha.boothmarketing.co.uk'
  return NextResponse.json(boothMarketingPublic, {
    headers: {
      'Cache-Control': isAlpha ? 'no-store, max-age=0, must-revalidate' : 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': isAlpha ? 'noindex, nofollow' : 'index, follow',
    },
  })
}
