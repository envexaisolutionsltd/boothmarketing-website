import fs from 'node:fs'

const read = (path) => fs.readFileSync(path, 'utf8')
const urls = read('lib/public-urls.ts')
const sitemap = read('app/sitemap.ts')
const llms = read('app/llms.txt/route.ts')
const agentInfo = read('app/agent-info/page.tsx')

const required = [
  'https://www.boothmarketing.co.uk',
  'whatWeAutomate',
  'prototypes',
  'automationAudit',
  'agentInfo',
  'companyApi',
  'llms',
  'sitemap',
  'robots',
  'faq',
]
for (const value of required) {
  if (!urls.includes(value)) throw new Error(`Missing public URL contract: ${value}`)
}
if (!sitemap.includes("@/lib/public-urls")) throw new Error('Sitemap must use centralized public URLs')
if (!llms.includes("@/lib/public-urls")) throw new Error('llms.txt must use centralized public URLs')
if (!llms.includes("isAlpha ? 'noindex, nofollow' : 'index, follow'")) throw new Error('llms.txt must prevent alpha indexing while allowing production indexing')
if (!agentInfo.includes("host === 'alpha.boothmarketing.co.uk'")) throw new Error('Agent information metadata must detect the alpha host')
if (!agentInfo.includes('index: !isAlpha, follow: !isAlpha')) throw new Error('Agent information page metadata must be noindex on alpha and indexable on production')
if (!urls.includes('https://www.boothmarketing.co.uk')) throw new Error('Public URLs must use the production canonical origin')
console.log('Indexing/discovery contract checks passed.')
