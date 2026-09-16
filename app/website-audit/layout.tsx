import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Conversion Audit | Booth Marketing',
  description: 'Find out where your current website is losing trust, clarity or action. Booth Marketing reviews the buyer journey before recommending a redesign.',
  alternates: { canonical: '/website-audit' },
  openGraph: {
    title: 'Website Conversion Audit | Booth Marketing',
    description: 'Find out where your current website is losing trust, clarity or action before deciding whether a redesign is justified.',
    url: '/website-audit',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
