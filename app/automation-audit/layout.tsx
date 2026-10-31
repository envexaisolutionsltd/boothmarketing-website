import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Automation Audit | Booth Marketing',
  description: 'Describe the repetitive work, bottlenecks or disconnected systems in your business and request a practical Automation Audit.',
  alternates: { canonical: '/automation-audit' },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children }
