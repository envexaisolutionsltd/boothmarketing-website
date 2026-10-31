import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What We Automate | Booth Marketing',
  description: 'Explore business processes Booth Marketing can assess for practical, human-controlled AI automation.',
  alternates: { canonical: '/what-we-automate' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children }
