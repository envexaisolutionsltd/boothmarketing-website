export const boothMarketingPublic = {
  companyName: 'Booth Marketing',
  domain: 'https://www.boothmarketing.co.uk',
  positioning: 'You keep hearing what AI can do. We show you what it can do in your business.',
  buyingJourney: ['Business friction', 'Diagnosis', 'Prioritisation', 'Prototype', 'Implementation'],
  whatWeDo: 'Booth Marketing finds repetitive work, bottlenecks and missed opportunities inside established businesses, then builds practical AI automation systems around the processes worth improving.',
  primaryServices: [
    { name: 'AI Opportunity Diagnosis', description: 'Understand the current process, identify bottlenecks and decide which automation opportunities are commercially worth investigating.' },
    { name: 'AI Automation Prototypes', description: 'Focused demonstrations that make a proposed workflow tangible before a larger implementation.' },
    { name: 'AI Workflow Automation', description: 'Practical systems that connect approved business processes, software and people while keeping human judgement where it matters.' },
  ],
  secondaryServices: [
    { name: 'Build & Bounce', description: 'Build, test and document the agreed automation before handing it over to the business.' },
    { name: 'Build & Maintain', description: 'Ongoing support, monitoring and improvement for implemented automation systems where appropriate.' },
  ],
  idealCustomer: 'An established business that knows AI may create useful operational leverage but does not yet know what should be automated, how it should work, or which opportunity should be tackled first.',
  problemsSolved: [
    'Repetitive manual work consuming staff time',
    'Slow lead and customer enquiry handling',
    'Manual data movement between business systems',
    'Follow-ups that depend on somebody remembering',
    'Routine document and inbox processing',
    'Information that is difficult for teams to retrieve',
    'Uncertainty about where AI can create practical business value',
  ],
  process: [
    { step: 1, name: 'Diagnose', description: 'Understand how work currently moves through the business and where friction appears.' },
    { step: 2, name: 'Prioritise', description: 'Compare opportunities by size of prize, speed to value and implementation complexity.' },
    { step: 3, name: 'Prototype', description: 'Demonstrate how the improved process could work before a larger implementation.' },
    { step: 4, name: 'Build', description: 'Connect the required systems, define safeguards and implement the agreed workflow.' },
    { step: 5, name: 'Improve', description: 'Support, monitor and refine the system where ongoing ownership is useful.' },
  ],
  callsToAction: [
    { name: 'Find an Automation Opportunity', path: '/automation-audit', description: 'Describe the operational friction in your business so Booth can identify where automation may be worth exploring.' },
    { name: 'See a Working Prototype', path: '/prototypes', description: 'Explore demonstration systems that show how practical AI automation can work inside common business processes.' },
  ],
  engagementNote: 'Work is scoped around the business problem rather than a fixed technology package. Booth Marketing does not publish fabricated results, guarantees, client claims or fixed delivery commitments.',
} as const
export type BoothMarketingPublic = typeof boothMarketingPublic
