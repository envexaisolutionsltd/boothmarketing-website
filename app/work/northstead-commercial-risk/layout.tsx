import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Northstead Commercial Risk Concept | Booth Marketing',
  description: 'Independent commercial insurance brokerage website concept by Booth Marketing, built around commercial risk context, buyer confidence and broker-led conversations. Not a commissioned client project.',
  alternates: { canonical: '/work/northstead-commercial-risk' },
  openGraph: {
    title: 'Northstead Commercial Risk Concept | Booth Marketing',
    description: 'Independent commercial insurance brokerage website concept. Not a commissioned client project.',
    url: '/work/northstead-commercial-risk',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
