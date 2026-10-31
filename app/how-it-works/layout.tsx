import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How AI Automation Works | Booth Marketing',
  description: 'See how Booth Marketing diagnoses, prioritises, prototypes and builds useful AI automation around real business processes.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How AI Automation Works | Booth Marketing',
    description: 'See how Booth Marketing diagnoses, prioritises, prototypes and builds useful AI automation around real business processes.',
    url: '/how-it-works',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
