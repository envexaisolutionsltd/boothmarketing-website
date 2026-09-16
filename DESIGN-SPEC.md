# Booth Marketing Public Site Release Standard

## Visual source of truth
Use the approved dark Booth Marketing production design and its established responsive sizing. Public pages use the shared `booth-public` system. Admin styling remains isolated.

## Non-negotiable release rules
1. Public-facing copy uses no em dashes.
2. FAQ accordions allow only one open item at a time. Opening another closes the previous item.
3. Founder or About content must not use AI-generated founder photography.
4. Founder/About content belongs near the end of the sales journey. A dedicated About page is acceptable, with founder detail late on that page.
5. Do not use generic AI-style grid backgrounds. Use Booth's architectural dark surfaces, typography, hairlines and content-led layouts.
6. Do not force excessive content onto one page. Use focused supporting routes when detail deserves its own page.
7. Main conversion journeys must offer a native calendar booking option where a direct conversation is appropriate.
8. In a single brand lockup, use the Booth logo asset without separately repeating the Booth Marketing brand name as adjacent text.
9. Public pages must use the same design language, typography, spacing, controls, borders and dark palette.
10. The navbar shell spans the full viewport width. Its inner content uses the shared site container.
11. Do not publish package or service pricing.
12. Avoid decorative boxes inside boxes. Prefer section structure, hairlines and simple grouped content.
13. The mobile navigation drawer should occupy about 75% of viewport width, with a sensible maximum width.
14. Logo assets used on dark surfaces must have transparent backgrounds and no artificial logo panel.
15. Do not display CONVOCORE branding on the public site.
16. Public website builds use Next.js.
17. Buttons and controls must remain fully visible and non-overlapping at supported mobile widths.
18. Keep image payloads lean. Lazy-load below-fold imagery and avoid unnecessary heavy background images.
19. Cards in the same group use consistent dimensions, padding and positioning.
20. Navbar items do not reveal extra descriptive hover panels or tooltip copy.
21. Booking uses Booth's native `/book` calendar, server-side slot reservation and Resend email delivery when `RESEND_API_KEY` is configured. Do not use Calendly. The database enforces one booking per date/time slot.
22. Adjacent section backgrounds and dividers must meet cleanly without accidental gaps, doubled spacing or unrelated visual treatments.

## Responsive baseline
Design reference: 390px mobile. Failure test: 360px. QA widths: 360, 375, 390, 412, 430, 768, 1024, 1280, 1440 and 1920px.

Mobile gutters are approximately 18px. Public content uses the shared 1200px maximum container. Touch targets should be at least 44px where practical. Avoid `!important` typography overrides. Do not hide layout defects with horizontal scrolling.

## Brand direction
- near-black canvas and depth surfaces
- off-white primary text
- muted grey supporting copy
- thin low-contrast borders
- restrained red accent only where useful
- no green redesign
- no AI grids, neon AI gradients, robots, digital brains or decorative 3D filler
- no fake testimonials, client logos, statistics or ROI claims
- no public pricing

## Conversion architecture
Primary discovery CTA: `Request Website Audit`.
High-intent alternative: `Book a Call`, using the native Booth booking route.
Proof CTA: `View Commercial Insurance Concept`.

Do not replace the Website Audit everywhere with booking. Booking is the high-intent alternative for prospects ready to talk.

## Booking configuration
The booking API stores reservations in Postgres and prevents duplicate date/time reservations with a database unique constraint. Available slots are UK business-day slots surfaced by `/api/bookings`.

For email delivery configure:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (optional, defaults to the Booth bookings sender)
- `BOOKING_NOTIFICATION_EMAIL` for internal booking notifications

The visitor confirmation and internal notification are sent through Resend when configured.

## Final gate
Do not call the public site finished until the rules above have been checked across the homepage and all public routes. Admin pages are outside the public visual standard but must continue to function after public-site changes.
