import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Booth Marketing | Websites & Automation',
  description: 'Booth Marketing builds conversion-focused websites and AI automation systems for established businesses.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Booth Marketing | Websites & Automation',
    description: 'Conversion-focused websites and AI automation systems built around established businesses.',
    url: '/about',
  },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
