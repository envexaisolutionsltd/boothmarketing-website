import type { Metadata } from 'next'
import './globals.css'
import WebMCPTools from '@/components/WebMCPTools'
import FunctionalityNotice from '@/components/FunctionalityNotice'
import { boothMarketingPublic } from '@/lib/public-company'

const SITE_URL = 'https://www.boothmarketing.co.uk'
const TITLE = 'AI Automation Agency UK | Booth Marketing'
const DESCRIPTION = 'Practical AI automation for established businesses. Booth Marketing identifies repetitive work and bottlenecks, prototypes useful workflows and builds automation around the opportunities worth solving.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), title: TITLE, description: DESCRIPTION, alternates: { canonical: '/' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: SITE_URL, siteName: 'Booth Marketing', type: 'website', images: [{ url: '/booth-marketing-logo.png', alt: 'Booth Marketing' }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/booth-marketing-logo.png'] },
  icons: { icon: '/booth-marketing-logo.png', shortcut: '/booth-marketing-logo.png', apple: '/booth-marketing-logo.png' },
}
const organizationSchema={'@context':'https://schema.org','@type':'Organization',name:boothMarketingPublic.companyName,url:SITE_URL,logo:`${SITE_URL}/booth-marketing-logo.png`,description:DESCRIPTION}
const websiteSchema={'@context':'https://schema.org','@type':'WebSite',name:boothMarketingPublic.companyName,url:SITE_URL}
const serviceSchema={'@context':'https://schema.org','@type':'Service',name:'AI Automation for Business',provider:{'@type':'Organization',name:boothMarketingPublic.companyName,url:SITE_URL},serviceType:['AI Automation','Business Process Automation','AI Workflow Automation','AI Automation Prototyping'],areaServed:'United Kingdom'}
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}<FunctionalityNotice/><WebMCPTools/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceSchema)}}/></body></html>}
