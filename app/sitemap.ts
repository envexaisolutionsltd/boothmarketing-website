import type { MetadataRoute } from 'next'
const base='https://www.boothmarketing.co.uk'
const updated=new Date('2026-09-14T00:00:00.000Z')
export default function sitemap():MetadataRoute.Sitemap{return [
{url:`${base}/`,lastModified:updated,changeFrequency:'weekly',priority:1},
{url:`${base}/websites`,lastModified:updated,changeFrequency:'monthly',priority:.95},
{url:`${base}/website-audit`,lastModified:updated,changeFrequency:'monthly',priority:.95},
{url:`${base}/work`,lastModified:updated,changeFrequency:'monthly',priority:.85},
{url:`${base}/work/northstead-commercial-risk`,lastModified:updated,changeFrequency:'monthly',priority:.9},
{url:`${base}/how-it-works`,lastModified:updated,changeFrequency:'monthly',priority:.8},
{url:`${base}/about`,lastModified:updated,changeFrequency:'monthly',priority:.65},
{url:`${base}/privacy`,lastModified:updated,changeFrequency:'yearly',priority:.2},
{url:`${base}/cookies`,lastModified:updated,changeFrequency:'yearly',priority:.2},
{url:`${base}/terms`,lastModified:updated,changeFrequency:'yearly',priority:.2}]}
