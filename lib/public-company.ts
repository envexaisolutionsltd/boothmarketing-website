export const boothMarketingPublic = {
  companyName: 'Booth Marketing',
  domain: 'https://www.boothmarketing.co.uk',
  positioning: 'Your business has moved forward. Has your website kept up?',
  buyingJourney: ['Referral or outreach', 'Website check', 'Confidence', 'Conversation'],
  whatWeDo: 'Booth Marketing designs conversion-focused websites and landing pages for established B2B businesses whose current website no longer reflects the company behind it.',
  primaryServices: [
    {
      name: 'Conversion-Focused Websites',
      description: 'Website strategy, positioning, page architecture, messaging, responsive design and development built around clarity, credibility and enquiry.',
    },
    {
      name: 'Landing Pages',
      description: 'Focused conversion paths for specific offers, campaigns and audiences when a full website rebuild is not justified.',
    },
    {
      name: 'Website Conversion Audit',
      description: 'A diagnostic review of first-impression trust, offer clarity, positioning, mobile usability, calls to action, proof, page structure and performance friction.',
    },
  ],
  secondaryServices: [
    {
      name: 'Practical Business Automation',
      description: 'Practical automation for established business workflows where repetitive operational work can be simplified. This remains secondary to Booth Marketing\'s website offer.',
    },
  ],
  idealCustomer: 'An established B2B business that has grown beyond its current website and needs its digital presence to better reflect its reputation, explain the business clearly, strengthen buyer confidence and support sales conversations.',
  problemsSolved: [
    'A website that no longer reflects the standard of the business',
    'Weak first-impression trust and credibility',
    'Unclear positioning or service explanation',
    'A poor validation experience for referred or outbound prospects',
    'Slow or confusing mobile journeys',
    'Weak calls to action or enquiry paths',
    'A dated website where targeted improvements or a rebuild may be justified',
  ],
  process: [
    { step: 1, name: 'Understand the business', description: 'Clarify what the company sells, who buys, how opportunities are created and why customers choose it.' },
    { step: 2, name: 'Diagnose the current site', description: 'Review clarity, positioning, proof, mobile experience, page structure and the route from attention to action.' },
    { step: 3, name: 'Design the decision path', description: 'Decide what a serious buyer needs to see, in what order, and where different services or audiences need different pages.' },
    { step: 4, name: 'Build for speed and trust', description: 'Create a fast, mobile-first website that reflects the standard of the company and makes the next step clear.' },
    { step: 5, name: 'Launch and improve', description: 'Launch the agreed website and use real buyer behaviour to guide future improvements where appropriate.' },
  ],
  callsToAction: [
    { name: 'Request Website Audit', path: '/website-audit', description: 'Start with a diagnostic review of the current website before deciding whether targeted improvements or a rebuild are justified.' },
    { name: 'Submit Enquiry', path: '/website-audit', description: 'Send a deliberate website enquiry through Booth Marketing\'s public lead infrastructure.' },
  ],
  engagementNote: 'Work is scoped around the business problem rather than a fixed package. Booth Marketing does not publish prices, guarantees, client claims, case-study results or fixed delivery commitments in the current public content.',
} as const

export type BoothMarketingPublic = typeof boothMarketingPublic
