import type { MetadataRoute } from 'next'
import { publicUrls } from '@/lib/public-urls'
const updated=new Date('2026-10-31T00:00:00.000Z')
export default function sitemap():MetadataRoute.Sitemap{return [
{url:publicUrls.home,lastModified:updated,changeFrequency:'weekly',priority:1},
{url:publicUrls.whatWeAutomate,lastModified:updated,changeFrequency:'monthly',priority:.9},
{url:publicUrls.prototypes,lastModified:updated,changeFrequency:'monthly',priority:.8},
{url:publicUrls.automationAudit,lastModified:updated,changeFrequency:'monthly',priority:.95},
{url:publicUrls.howItWorks,lastModified:updated,changeFrequency:'monthly',priority:.8},
{url:publicUrls.about,lastModified:updated,changeFrequency:'monthly',priority:.6},
{url:publicUrls.faq,lastModified:updated,changeFrequency:'monthly',priority:.5},
{url:publicUrls.privacy,lastModified:updated,changeFrequency:'yearly',priority:.2},
{url:publicUrls.terms,lastModified:updated,changeFrequency:'yearly',priority:.2},
]}
