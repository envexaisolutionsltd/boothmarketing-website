import type { MetadataRoute } from 'next'
const base='https://www.boothmarketing.co.uk'
const paths=['/','/services','/services/workflow-automation','/services/ai-powered-automation','/services/automation-consulting','/what-we-automate','/automation-audit','/prototypes','/how-it-works','/about','/websites','/website-audit','/privacy','/terms']
export default function sitemap():MetadataRoute.Sitemap{return paths.map(path=>({url:base+path,changeFrequency:path==='/'?'weekly':'monthly',priority:path==='/'?1:path==='/automation-audit'?.9:.6}))}
