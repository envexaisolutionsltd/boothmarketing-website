import type { Metadata } from 'next'
import './globals.css'
import WebMCPTools from '@/components/WebMCPTools'
import { boothMarketingPublic } from '@/lib/public-company'

const SITE_URL = 'https://www.boothmarketing.co.uk'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Booth Marketing | Conversion-Focused Websites for Established Businesses',
  description: 'Booth Marketing builds conversion-focused websites and landing pages for established businesses, designed for faster trust, clearer positioning and stronger action in an AI-assisted buying environment.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Booth Marketing | Conversion-Focused Websites for Established Businesses',
    description: 'Conversion-focused websites and landing pages built for faster trust, clearer positioning and stronger action.',
    url: SITE_URL,
    siteName: 'Booth Marketing',
    type: 'website',
    images: [{ url: '/booth-marketing-logo.png', alt: 'Booth Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Booth Marketing | Conversion-Focused Websites for Established Businesses',
    description: 'Conversion-focused websites and landing pages built for faster trust, clearer positioning and stronger action.',
    images: ['/booth-marketing-logo.png'],
  },
  icons: {
    icon: '/booth-marketing-logo.png',
    shortcut: '/booth-marketing-logo.png',
    apple: '/booth-marketing-logo.png',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: boothMarketingPublic.companyName,
  url: SITE_URL,
  logo: `${SITE_URL}/booth-marketing-logo.png`,
  description: boothMarketingPublic.whatWeDo,
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: boothMarketingPublic.companyName,
  url: SITE_URL,
}

const websiteServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Conversion-Focused Website Design and Development',
  provider: { '@type': 'Organization', name: boothMarketingPublic.companyName, url: SITE_URL },
  serviceType: ['Conversion-Focused Websites', 'Website Strategy', 'Landing Pages', 'Website Conversion Audits', 'Mobile-First Web Development'],
  areaServed: 'Worldwide',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <WebMCPTools />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteServiceSchema) }} />
      </body>
    </html>
  )
}
