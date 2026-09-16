import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How We Build Conversion-Focused Websites | Booth Marketing',
  description: 'See how Booth Marketing turns buyer intent, positioning, proof and mobile experience into a clearer website decision path.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How We Build Conversion-Focused Websites | Booth Marketing',
    description: 'See how Booth Marketing turns buyer intent, positioning, proof and mobile experience into a clearer website decision path.',
    url: '/how-it-works',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
