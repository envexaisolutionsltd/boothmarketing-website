export const boothMarketingPublic = {
  companyName: 'Booth Marketing',
  domain: 'https://www.boothmarketing.co.uk',
  positioning: 'Your brokerage already earns trust offline. Your website should reinforce it online.',
  buyingJourney: ['Referral or introduction', 'Website check', 'Confidence', 'Broker conversation'],
  whatWeDo: 'Booth Marketing designs conversion-focused websites for established commercial insurance brokers that need to communicate expertise clearly, strengthen referral validation and create better-fit broker conversations.',
  primaryServices: [
    {
      name: 'Commercial Insurance Brokerage Websites',
      description: 'Website strategy, positioning, page architecture, messaging, responsive design and development built around commercial insurance buyers, sector expertise, broker visibility and credibility.',
    },
    {
      name: 'Commercial Insurance Brokerage Website Audit',
      description: 'A diagnostic review of positioning, first-impression credibility, referral validation, sector expertise, broker visibility, service clarity, proof, mobile experience, conversion journey, regulatory presentation and useful SEO or content worth preserving.',
    },
    {
      name: 'Targeted Website Improvements',
      description: 'Focused improvements where the current brokerage website remains fundamentally sound and a full rebuild is not justified.',
    },
  ],
  secondaryServices: [
    {
      name: 'Practical Business Automation',
      description: 'A secondary Booth Marketing capability for practical workflow improvements. It is not the primary proposition of the public acquisition site.',
    },
  ],
  idealCustomer: 'An established independent UK commercial insurance brokerage, typically with an experienced team and relationship-led new business, whose current website no longer reflects the standard, expertise or positioning of the brokerage.',
  problemsSolved: [
    'A brokerage website that looks less established than the business behind it',
    'Weak referral validation when prospects check the brokerage online',
    'Sector and broker expertise hidden behind generic product pages',
    'Generic quote-first journeys that attract the wrong type of enquiry',
    'Poor visibility of experienced brokers and account executives',
    'Mobile journeys that reduce confidence or make contact difficult',
    'A dated website where targeted improvements or a rebuild may be justified',
  ],
  process: [
    { step: 1, name: 'Understand the brokerage', description: 'Clarify clients, sector specialisms, insurance areas, team, new-business process and differentiation.' },
    { step: 2, name: 'Audit the current website', description: 'Review messaging, credibility, services, sectors, mobile experience, existing SEO and the enquiry journey.' },
    { step: 3, name: 'Map the buyer journey', description: 'Understand how a prospect moves from referral, introduction, outbound or search to confidence and a broker conversation.' },
    { step: 4, name: 'Design and build', description: 'Create the messaging, structure, visual design and development around the brokerage buyer journey.' },
    { step: 5, name: 'Review and launch', description: 'Complete responsive QA, forms, journeys, regulatory presentation, SEO foundations and final checks.' },
  ],
  callsToAction: [
    { name: 'Request Brokerage Website Audit', path: '/website-audit', description: 'Start with a diagnostic review of the current brokerage website before deciding whether to keep it, improve it or rebuild it.' },
    { name: 'Explore the Northstead Concept', path: '/work/northstead-commercial-risk', description: 'See independent commercial insurance brokerage concept work. Northstead is not a commissioned client project.' },
  ],
  engagementNote: 'Booth Marketing does not publish prices, guarantees, fabricated client claims, case-study results or fixed delivery commitments in the current public content. Booth Marketing is a website strategy, design and development service and does not provide insurance, legal or regulatory approval.',
} as const

export type BoothMarketingPublic = typeof boothMarketingPublic
