import type { Metadata } from 'next'
import './automation-landing.css'

export const metadata: Metadata = {
  title: 'Free Automation Audit | Booth Marketing',
  description: 'Explore practical opportunities to simplify repetitive business workflows with a free initial automation audit from Booth Marketing.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  openGraph: { title: 'Free Automation Audit | Booth Marketing', description: 'A practical first step towards understanding your business workflows.' },
}

export default function AutomationLandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
