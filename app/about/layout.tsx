import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Booth Marketing | AI Automation',
  description: 'Booth Marketing helps established businesses identify repetitive work and implement practical AI automation.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Booth Marketing | AI Automation',
    description: 'Practical AI automation built around established businesses and their workflows.',
    url: '/about',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
