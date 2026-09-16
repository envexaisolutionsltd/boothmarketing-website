import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversion-Focused Websites | Booth Marketing',
  description: 'Websites for established businesses designed around trust, positioning, mobile experience and action in an AI-assisted buying environment.',
  alternates: { canonical: '/websites' },
  openGraph: {
    title: 'Conversion-Focused Websites | Booth Marketing',
    description: 'Websites designed around trust, positioning, mobile experience and action in an AI-assisted buying environment.',
    url: '/websites',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
