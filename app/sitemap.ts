import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/public-urls'
const routes=['/','/automation-audit','/what-we-automate','/how-it-works','/about','/prototypes','/privacy','/terms']
export default function sitemap():MetadataRoute.Sitemap {return routes.map(path=>({url:new URL(path,SITE_URL).toString()}))}
