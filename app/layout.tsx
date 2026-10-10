import type { Metadata } from 'next'
import './globals.css'
import WebMCPTools from '@/components/WebMCPTools'
import { boothMarketingPublic } from '@/lib/public-company'
const SITE_URL='https://www.boothmarketing.co.uk'
const TITLE='Dental Website Design UK | Booth Marketing'
const DESCRIPTION='Website design and rebuilds for UK dental practices. Clear treatment navigation, mobile-friendly experiences and practical enquiry journeys. Request a free dental website audit.'
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:TITLE,description:DESCRIPTION,openGraph:{title:TITLE,description:DESCRIPTION,url:SITE_URL,siteName:'Booth Marketing',type:'website',images:[{url:'/booth-marketing-logo.png',alt:'Booth Marketing'}]},twitter:{card:'summary_large_image',title:TITLE,description:DESCRIPTION,images:['/booth-marketing-logo.png']},icons:{icon:'/booth-marketing-logo.png',shortcut:'/booth-marketing-logo.png',apple:'/booth-marketing-logo.png'}}
const organizationSchema={'@context':'https://schema.org','@type':'Organization',name:boothMarketingPublic.companyName,url:SITE_URL,logo:`${SITE_URL}/booth-marketing-logo.png`,description:DESCRIPTION}
const websiteSchema={'@context':'https://schema.org','@type':'WebSite',name:boothMarketingPublic.companyName,url:SITE_URL}
const serviceSchema={'@context':'https://schema.org','@type':'Service',name:'Dental Website Design and Development',provider:{'@type':'Organization',name:boothMarketingPublic.companyName,url:SITE_URL},serviceType:['Dental Website Design','Dental Website Rebuilds','Website Development'],areaServed:'United Kingdom'}
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}<WebMCPTools/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceSchema)}}/></body></html>}
