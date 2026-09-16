import type { MetadataRoute } from 'next'
import { publicUrls } from '@/lib/public-urls'
const core=new Date('2026-09-09T00:00:00.000Z')
export default function sitemap():MetadataRoute.Sitemap{return [
{url:publicUrls.home,lastModified:core,changeFrequency:'weekly',priority:1},
{url:publicUrls.websites,lastModified:core,changeFrequency:'monthly',priority:.9},
{url:publicUrls.websiteAudit,lastModified:core,changeFrequency:'monthly',priority:.95},
{url:publicUrls.automation,lastModified:core,changeFrequency:'monthly',priority:.75},
{url:publicUrls.automationAudit,lastModified:core,changeFrequency:'monthly',priority:.7},
{url:publicUrls.howItWorks,lastModified:core,changeFrequency:'monthly',priority:.8},
{url:publicUrls.about,lastModified:core,changeFrequency:'monthly',priority:.6},
{url:publicUrls.agentInfo,lastModified:core,changeFrequency:'monthly',priority:.7},
{url:publicUrls.llms,lastModified:core,changeFrequency:'monthly',priority:.7},
{url:publicUrls.privacy,lastModified:core,changeFrequency:'yearly',priority:.2},
{url:publicUrls.terms,lastModified:core,changeFrequency:'yearly',priority:.2}]}
