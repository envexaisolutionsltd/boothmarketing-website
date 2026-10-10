# V5.1 Implementation readiness and release gates

## Scope of this branch
- Rebuild the homepage buyer journey without invented testimonials, client results or functioning automation claims.
- Clarify the Free Automation Audit as an initial review with possible discovery conversation.
- Update the calculator to use editable working weeks and distinguish capacity from cash savings.
- Preserve the existing lead API, database and CRM until a production schema review is complete.

## Verified from connected services (10 October 2026)
- Repository: envexaisolutionsltd/boothmarketing-website, main contains Next.js application.
- Vercel project: boothmarketing-patch, ID prj_jFDwAkl6JgdvKSuA3K9LK8aJyIH3, associated with boothmarketing.co.uk and www.boothmarketing.co.uk.
- Vercel framework setting reports vite; investigate against Next.js before deployment.
- Latest READY deployment reported for feature/v3-1-mobile-seo-foundations commit 5f170c5d4ceee26890e3f44dcbd5224553654f5f. Another READY deployment reported main commit 05a4dd859fcfc4a72cce11c74e1725df379aa96c.
- Current main lead API checks recent matching email/company/website/challenge within ten minutes. It does not provide a database-enforced idempotency key.
- Existing lead model stores records in a leads table and writes activity separately. No production database inspection has been performed.

## G0 technical discovery blockers
- Determine which deployment serves the actual public domain and confirm the current deployed commit.
- Correct or justify Vercel framework configuration.
- Review existing V3.1 pull request before merging changes to main.
- Inspect real database indexes, migrations, historical records and privileges. Do not change constraints without backup and compatibility plan.
- Verify preview/production data isolation and notification provider.
- Record current sitemap, canonical URLs, redirects and Search Console baseline.

## G1 commercial approval
- Authorised business owner confirms the free audit can be fulfilled.
- Assign named reviewer and backup, daily queue review and escalation process.
- Confirm whether discovery and recommendations are verbal or written.
- Verify public contact details and every published client reference.
- Do not promise timelines, results, or free implementation.

## G2 UX/content review
- Review homepage copy and CTA routes.
- Verify accessible navigation at 320, 375, 390, 430, 768, 1024, 1440px.
- Check calculator working-week assumptions, values, keyboard access and accessible result announcements.
- Confirm all synthetic examples are labelled.
- Approve final service pages and search-intent mapping before creating new indexable routes.

## G3 backend contract (not implemented on this branch)
- A contact can have multiple distinct enquiries.
- Retries use a stable idempotency key with database uniqueness, including concurrent requests and lost responses.
- The lead and notification task are persisted atomically.
- Notification delivery is retried with bounded backoff and a visible administrator failure queue.
- Auth, session recovery, rate limiting and webhook verification must be tested.
- Audit submissions must not report success before persistence.

## G4 privacy/measurement
- Complete UK GDPR processing register: controller, purpose, lawful basis, processor, retention, deletion, transfers.
- Analytics event audit_submitted must represent confirmed persistence, not a click.
- Do not send PII or free-text challenges to analytics.
- Record baseline before claiming conversion gains.

## G5 acceptance and release
- Run Next.js build and type checks in a connected CI/preview environment.
- Test full audit submission against isolated database including duplicate retries and failures.
- Test desktop and mobile keyboard navigation, screen readers, zoom and reduced motion.
- Verify performance, SEO and redirects.
- Confirm production backup, rollback and incident contacts.
- Do not merge or deploy to production before G0-G5 are satisfied.

## Known remaining work
Services IA, deterministic interactive simulation, CRM schema/idempotency, notification outbox, security hardening, SEO migration, analytics and complete QA are future gated releases, not completed by this branch.
