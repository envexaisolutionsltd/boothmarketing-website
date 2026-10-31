# Testing environment

The `testing` branch is the staging branch for changes that should be reviewed before they reach `main`.

## Preview site

- URL: https://alpha.boothmarketing.co.uk
- Hosting: Vercel project `boothmarketing-patch`
- The `alpha.boothmarketing.co.uk` project domain is assigned to the `testing` Git branch.
- Commits pushed to `testing` create or update the preview deployment at the alpha URL.
- Production remains connected to `main` at `www.boothmarketing.co.uk`.

## Data safety

Vercel preview deployments currently receive the project's shared Supabase integration variables. Treat the preview site as connected to the production Supabase backend until a separate staging database and preview-only credentials are configured. Avoid creating, editing, or deleting real leads or other production records while testing.

## Release flow

1. Make and review changes on `testing`.
2. Check the alpha deployment and its QA results.
3. Merge the reviewed changes into `main` only when ready for production.
