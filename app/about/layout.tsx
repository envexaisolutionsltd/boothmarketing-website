import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Booth Marketing | Commercial Insurance Broker Websites',
  description: 'Why Booth Marketing has chosen established commercial insurance brokers as the primary market for its website strategy, design and development offer.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Booth Marketing | Commercial Insurance Broker Websites',
    description: 'Website strategy, positioning, design and development built around how commercial insurance relationships begin.',
    url: '/about',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
