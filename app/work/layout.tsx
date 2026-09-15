import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selected Work | Commercial Insurance Website Concept | Booth Marketing',
  description: 'Explore Booth Marketing’s Northstead Commercial Risk concept and selected execution work. Northstead is independent concept work, not a commissioned client project.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Selected Work | Booth Marketing',
    description: 'Northstead Commercial Risk is Booth Marketing’s flagship independent commercial insurance brokerage website concept.',
    url: '/work',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
