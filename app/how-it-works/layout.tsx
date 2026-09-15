import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Commercial Insurance Broker Websites Are Built | Booth Marketing',
  description: 'See Booth Marketing’s process for understanding the brokerage, auditing the current site, mapping the buyer journey, designing, building and launching.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How Commercial Insurance Broker Websites Are Built | Booth Marketing',
    description: 'A structured website process for established commercial insurance brokerages.',
    url: '/how-it-works',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
