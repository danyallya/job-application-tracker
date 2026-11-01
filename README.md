# Folio

**A considered workspace for a more intentional career search.**

Folio gives independent professionals one private place to organize opportunities, interviews and the follow-ups that keep a search moving. Its product direction is a clear application pipeline, useful agenda, account-scoped history and practical reporting.

## Product experience
- Application stages: saved, applied, screening, interview, offer, declined and withdrawn.
- Searchable opportunities with company, role, source, location, notes and next action.
- Daily follow-up agenda and per-application activity history.
- Responsive light/dark workspace and installable offline shell.
- Planned XLSX/PDF reports, import preview, reminders and data portability.

The public dashboard is curated preview content; it is separate from the signed-in account area. The initial authentication slice verifies a local sample account, creates expiring server-side sessions and protects `/workspace`. Saved application management remains a later milestone.

## Technology
Next.js App Router, React, TypeScript, Mantine, React Icons, Prisma and PostgreSQL. Recharts, XLSX and jsPDF support the planned reporting work.

## Local setup
Requirements: Node.js 20.11+, npm and PostgreSQL 15+.

1. Create a dedicated local PostgreSQL database named `folio_dev`; copy .env.example to .env and set DATABASE_URL to that local database.
2. Set FOLIO_SAMPLE_PASSWORD in .env to a local-only passphrase of 12–128 characters. Never reuse a personal password or commit .env.
3. Install dependencies with npm ci.
4. Generate the Prisma client with npm run db:generate.
5. Apply the checked-in development migration with npm run db:migrate.
6. Optionally load fictional examples with npm run db:seed.
7. Start the app with npm run dev and open http://localhost:3000.

The optional local seed creates the sample sign-in `sample@folio.invalid` with the passphrase selected in FOLIO_SAMPLE_PASSWORD. The seed remains restricted to loopback PostgreSQL database `folio_dev`; it is synthetic development data, not a public account. There is no sign-up or password-reset flow yet.

Saved-record persistence remains follow-up work; the public dashboard preview renders without requiring a database connection. Never expose .env or the local private .npmrc.

## Commands
- npm run dev — local app
- npm run lint — source lint
- npm run typecheck — strict TypeScript check
- npm run build — production build
- npm run db:generate — refresh Prisma client
- npm run db:migrate — create/apply a development migration
- npm run db:seed — upsert the fictional local account and examples into folio_dev
- npm run db:studio — inspect local records

## Data model
The initial Prisma migration creates User, Application and Activity; Day 04 adds nullable User.passwordHash and the Session table. Passwords use a salted scrypt hash. Session cookies are HttpOnly, SameSite=Lax and secure in production; the database stores only a SHA-256 token hash and expiry. `/workspace` checks the session on the server and rejects anonymous or expired sessions. `lib/prisma.ts` provides a server-only client singleton; the public dashboard preview still renders without PostgreSQL. Review migrations before release; destructive changes need a reversible plan.

`npm run db:seed` is optional and restricted to a PostgreSQL URL whose host is loopback and database name is exactly `folio_dev`; it also requires the local FOLIO_SAMPLE_PASSWORD value. It upserts the reserved `sample@folio.invalid` account, four fictional applications and their sample activities. Stable IDs avoid duplicate seed rows on repeat runs; the script never deletes records. Do not use real applicant or recruiter data in this seed.

See AGENTS.md for the daily review and quality cycle and BACKLOG.md for the full 30-day schedule. The prepared local Git branch is day-00-foundation.

## Day 01 acceptance and route map

- The existing root route (`/`) renders the dashboard preview with an overview, application pipeline, calendar agenda and insight panel.
- Current navigation destinations are in-page anchors: Applications → `#pipeline`, Calendar → `#calendar`, and Insights → `#insights`. Overview remains on `/`.
- Settings and Help are visible navigation placeholders with no destination section or route yet. Day 02 will complete the shared shell and accessible navigation before later backlog items add settings behavior.
- The dashboard data and metrics are curated preview content. They do not represent an account, a live job search or database records.

## Testing baseline

Vitest renders the current workspace with React server rendering and checks its visible navigation destinations. The project also uses ESLint, strict TypeScript, Next.js production builds, and Prisma Client generation. The Day 01 baseline passed `npm test`, `npm run lint`, `npm run typecheck`, `npm run db:generate`, and `npm run build`. Database migration commands require an explicitly configured local PostgreSQL service and are not part of this no-database preview baseline.

## Day 04 sign-in and protected route

`/sign-in` verifies the seeded local account and issues a random seven-day session token. The raw token is held only in an HttpOnly cookie; the database stores its SHA-256 digest and expiry. Every `/workspace` request resolves and checks that expiry on the server; sign-out deletes the server-side session and clears the cookie. Anonymous and expired sessions receive no workspace page. The public `/` dashboard remains a curated preview and does not become a signed-in record view.

Password reset, new-account enrollment, login rate limiting and saved-record persistence are not part of this milestone. The sample credentials are for an isolated local database only; do not deploy the sample seed as a public account.

## Privacy model

The public preview uses source-defined examples and browser-only component state. The `/workspace` route uses the signed-in user identity but does not yet read or write application records. `public/sw.js` caches only the offline shell, manifest, icons, and same-origin static assets; it skips `/api/` requests and does not cache navigation responses. Future reads and writes must require an authenticated account and scope every application and activity query by that account on the server. Authenticated pages and responses must remain outside service-worker caches.

## Privacy
Career history is sensitive. Every read and write must be scoped to the signed-in account. Production requires managed secrets, HTTPS, reviewed backups, private-data-safe logs and service-worker rules that never cache authenticated responses.

## Delivery and review

Folio's PR review must prove account-scoped job-search boundaries, honest preview metrics and working navigation destinations, including the recorded Settings and Help gaps. Follow [DELIVERY-POLICY.md](DELIVERY-POLICY.md) from Day 02 for sequential execution, scope-driven commits and this repository's separate branch/PR with GitHub panel review and merge.

## Contributions and examples

See [CONTRIBUTING.md](CONTRIBUTING.md) for reproducible reports, genuine collaboration and product examples such as a sample job-search flow that contains no applicant or recruiter data. Contributions follow the product backlog and reviewed PR workflow.

## Day 02 shell and appearance

WorkspaceShell owns shared sidebar/header/search and compact phone navigation. Every Settings/Help link has an honest in-page destination; Skip to workspace content targets the main region. Phone navigation keeps destinations reachable instead of hiding the sidebar's only links, and narrow search remains editable. Theme restoration waits before writing, accepts only light/dark, falls back to system appearance and tolerates blocked storage. Only folio-theme is stored; job records remain session preview data. These sections explain current limits rather than implementing account settings. The local desktop preview at 1265 CSS pixels showed no horizontal overflow; keyboard focus starts at the skip link, and the theme persists after reload. The available browser tab could not emulate a narrow viewport, so phone/tablet rendering remains unverified; static checks and CSS review do not substitute for that view.

## Day 03 Prisma boundary and local sample data

`lib/prisma.ts` is the server-only Prisma Client singleton, with development hot-reload reuse. The initial checked-in migration creates User, Application and Activity; the separate Day 04 migration adds session and credential fields. The preview dashboard does not import the database client or claim saved-record persistence.

To use the optional seed, create a dedicated local PostgreSQL database named `folio_dev`, copy `.env.example` to `.env`, set local credentials, generate the client, apply migrations, then run `npm run db:seed`. The seed script refuses non-loopback hosts or any database name other than `folio_dev`. It upserts the reserved `sample@folio.invalid` user, four fictional opportunities and their sample activity rows using stable IDs; rerunning it does not add duplicates and it never deletes records.

The application list currently shows all session-only sample and newly entered applications. Search filters by company, role and stage; **Clear search to view all applications** restores the full list. Recency sorting is not offered until application records have typed update timestamps and the Day 08 sorting/filter work is implemented.

## Day 04 credentials and session boundary

`lib/password-hash.mjs` stores salted scrypt password hashes. The database-backed local sample account uses the passphrase from FOLIO_SAMPLE_PASSWORD; no passphrase is committed. `lib/session-policy.ts` creates 256-bit random tokens, hashes them before persistence and rejects malformed, anonymous and expired sessions. The `/workspace` server route redirects unauthenticated requests to `/sign-in`, and sign-out revokes the stored session. The route intentionally contains no saved career data until Day 05 persistence work.
