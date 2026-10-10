import AuditDemoForm from '@/components/automation-landing/AuditDemoForm'
import LandingHeader from '@/components/automation-landing/LandingHeader'
import LandingFooter from '@/components/automation-landing/LandingFooter'
import PrimaryCTA from '@/components/automation-landing/PrimaryCTA'

export default function AutomationLandingPage() {
  return <div className="automation-landing">
    <a className="automation-landing__skip" href="#main-content">Skip to content</a>
    <LandingHeader />
    <main id="main-content">
      <section className="automation-landing__hero" aria-labelledby="automation-landing-title">
        <div className="automation-landing__container automation-landing__hero-inner">
          <div><p className="automation-landing__eyebrow">PRACTICAL AUTOMATION FOR BUSINESS</p>
            <h1 id="automation-landing-title">Your business shouldn't depend on endless manual work.</h1>
            <p className="automation-landing__lead">Repetitive tasks, disconnected tools and unnecessary handoffs can slow operations down. We help businesses identify where practical automation could simplify workflows and reduce avoidable administration.</p>
            <PrimaryCTA />
            <p className="automation-landing__microcopy">Start with your business problem. No technical knowledge required.</p>
          </div>
          <div className="automation-landing__workflow" role="img" aria-label="Incoming work leads to routine handling and then human review"><span>Incoming work</span><span aria-hidden="true">↓</span><span>Routine handling</span><span aria-hidden="true">↓</span><span>Human review</span></div>
        </div>
      </section>
      <section className="automation-landing__section" aria-labelledby="audience-heading"><div className="automation-landing__container"><h2 id="audience-heading">Is this the right starting point for your business?</h2><div className="automation-landing__cards"><div className="automation-landing__card"><h3>A good fit</h3><ul><li>Established businesses with repeatable processes</li><li>Teams handling repetitive administration</li><li>Owners seeking clarity before investing</li></ul></div><div className="automation-landing__card"><h3>Probably not the right fit</h3><ul><li>Projects without a defined operational problem</li><li>Expectations of instant, effortless results</li><li>Experiments without a practical business purpose</li></ul></div></div><p>Not every process needs automating. The first step is understanding where change would actually be useful.</p></div></section>
      <section className="automation-landing__section automation-landing__section--surface" aria-labelledby="offer-heading"><div className="automation-landing__container"><p className="automation-landing__eyebrow">A USEFUL FIRST STEP</p><h2 id="offer-heading">Find the opportunities worth exploring.</h2><p>The Free Automation Audit starts with understanding how your business operates today. We discuss the challenges you face, look at relevant workflows and identify where automation may be worth further investigation.</p><ul className="automation-landing__topics">{['Repetitive tasks','Process bottlenecks','Disconnected tools','Time-consuming admin','Automation suitability','Practical next steps'].map(x=><li key={x}>{x}</li>)}</ul><p className="automation-landing__microcopy">This is an initial assessment, not a comprehensive investigation, guaranteed savings report or free implementation.</p><PrimaryCTA /></div></section>
      <section className="automation-landing__section" aria-labelledby="process-heading"><div className="automation-landing__container"><h2 id="process-heading">A straightforward conversation, not a complicated process.</h2><div className="automation-landing__cards automation-landing__cards--three">{[['01','Share the challenge','Describe where time is being lost or work is becoming unnecessarily difficult.'],['02','Discuss the workflow','Where appropriate, we have a short introductory conversation about processes, tools and constraints.'],['03','Understand the options','Identify opportunities, clarify uncertainties and decide whether further investigation is worthwhile.']].map(([n,t,d])=><div className="automation-landing__card" key={n}><p className="automation-landing__eyebrow">{n}</p><h3>{t}</h3><p>{d}</p></div>)}</div><p>No pressure to proceed with a project.</p></div></section>
      <section id="automation-audit-form" className="automation-landing__section automation-landing__section--surface" aria-labelledby="form-heading"><div className="automation-landing__container"><h2 id="form-heading">Tell us where your business gets stuck.</h2><p>A few details are enough to begin. You don't need a technical brief.</p><AuditDemoForm /></div></section>
      <section className="automation-landing__section automation-landing__final" aria-labelledby="final-heading"><div className="automation-landing__container"><h2 id="final-heading">Find out where your business could work more efficiently.</h2><p>You don't need to know what to automate. Start by identifying where work gets stuck, and explore whether a more practical process is possible.</p><PrimaryCTA /></div></section>
    </main>
    <LandingFooter />
  </div>
}
