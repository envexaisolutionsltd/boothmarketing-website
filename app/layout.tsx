import type { Metadata, Viewport } from 'next'
import './globals.css'
import WebMCPTools from '@/components/WebMCPTools'

const SITE_URL='https://www.boothmarketing.co.uk'

export const viewport:Viewport={width:'device-width',initialScale:1,maximumScale:5,viewportFit:'cover'}

export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:'Web Design for Commercial Insurance Brokers | Booth Marketing',description:'Booth Marketing builds conversion-focused websites for established UK commercial insurance brokers, designed to strengthen referrals, communicate expertise and create better broker conversations.',alternates:{canonical:'/'},openGraph:{title:'Web Design for Commercial Insurance Brokers | Booth Marketing',description:'Conversion-focused websites for established commercial insurance brokers.',url:SITE_URL,siteName:'Booth Marketing',type:'website',images:[{url:'/booth-marketing-logo.png',alt:'Booth Marketing'}]},twitter:{card:'summary_large_image',title:'Web Design for Commercial Insurance Brokers | Booth Marketing',description:'Conversion-focused websites for established commercial insurance brokers.',images:['/booth-marketing-logo.png']},icons:{icon:'/booth-marketing-logo.png',shortcut:'/booth-marketing-logo.png',apple:'/booth-marketing-logo.png'}}
const organizationSchema={'@context':'https://schema.org','@type':'Organization',name:'Booth Marketing',url:SITE_URL,logo:`${SITE_URL}/booth-marketing-logo.png`,description:'Website strategy, design and development for established commercial insurance brokers.'}
const websiteSchema={'@context':'https://schema.org','@type':'WebSite',name:'Booth Marketing',url:SITE_URL}
const serviceSchema={'@context':'https://schema.org','@type':'Service',name:'Commercial Insurance Broker Website Design',provider:{'@type':'Organization',name:'Booth Marketing',url:SITE_URL},serviceType:['Website Design for Commercial Insurance Brokers','Insurance Broker Web Design UK','Website Strategy','Website Conversion Audits','Mobile-First Web Development'],areaServed:'United Kingdom'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<WebMCPTools/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceSchema)}}/></body></html>}
