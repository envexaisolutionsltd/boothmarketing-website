# V5.2 Deployment and verification status

## Completed in the feature branch
- Services overview and three differentiated service routes.
- Five-scenario deterministic interactive workflow simulation on /prototypes.
- Lead API idempotency key and transactional creation of lead, activity and notification outbox.
- Browser audit form retains submission key across retries.
- Authenticated notification processing endpoint at /api/cron/lead-notifications.
- SEO sitemap and navigation additions, global canonical removal, basic CSP tightening.
- Server-side submission activity record without contact data in analytics payload.
- Interim privacy notice draft, **not approved legal disclosure**.

## Critical outstanding gates
1. Build/type-check on a preview deployment. No local Git clone or build has been run.
2. Validate actual production database schema and constraints before allowing new transactional tables to be created. The code creates additive tables on demand; this is not a substitute for an approved migration.
3. Confirm email/webhook provider. Worker requires CRON_SECRET, LEAD_NOTIFICATION_WEBHOOK_URL, LEAD_NOTIFICATION_WEBHOOK_TOKEN and an actual Vercel Cron or external scheduler. These have **not** been configured or verified. Until configured, notification rows remain pending.
4. Worker posts an opaque lead ID only, not PII. The receiving integration must be separately authenticated, authorised, and able to look up the lead through a secure internal route if required.
5. Rate limiting is still process-local and not suitable as a distributed production abuse control.
6. Admin sessions are still tied to ADMIN_PASSWORD; a separate security review and migration are required.
7. Privacy notice is an interim draft. Legal controller, retention, processors, lawful basis and transfers must be confirmed before publication.
8. The Vercel project reports framework vite despite Next.js. The production domain is currently aliased to V3.1 commit 5f170c5d4ceee26890e3f44dcbd5224553654f5f.
9. The new sitemap excludes legacy pages. Check Search Console and preserve legacy search equity before production release.
10. Check full mobile UX, keyboard/screen-reader interactions, form error states, database concurrency, notification retry, recovery and production rollback.

## Release policy
Do not merge this branch into main or deploy it to production until gates above are addressed. A READY preview build is not equivalent to full acceptance testing.
