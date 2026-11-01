# Folio

**A considered workspace for a more intentional career search.**

Folio gives independent professionals one private place to organize opportunities, interviews and the follow-ups that keep a search moving. Its product direction is a clear application pipeline, useful agenda, account-scoped history and practical reporting.

## Product experience
- Application stages: saved, applied, screening, interview, offer, declined and withdrawn.
- Searchable opportunities with company, role, source, location, notes and next action.
- Daily follow-up agenda and per-application activity history.
- Responsive light/dark workspace and installable offline shell.
- Planned XLSX/PDF reports, import preview, reminders and data portability.

The foundation includes a styled product workspace and the initial data model. Dashboard metrics are curated preview content until persistence and account flows are delivered in the roadmap.

## Technology
Next.js App Router, React, TypeScript, Mantine, React Icons, Prisma and PostgreSQL. Recharts, XLSX and jsPDF support the planned reporting work.

## Local setup
Requirements: Node.js 20.11+, npm and PostgreSQL 15+.

1. Create a dedicated local PostgreSQL database named `folio_dev`; copy .env.example to .env and set DATABASE_URL to that local database.
2. Install dependencies with npm ci.
3. Generate the Prisma client with npm run db:generate.
4. Apply the checked-in development migration with npm run db:migrate.
5. Optionally load fictional examples with npm run db:seed.
6. Start the app with npm run dev and open http://localhost:3000.

Persistence and account/session routes are scheduled follow-up work; the current dashboard renders its product preview without requiring a database connection. Never expose .env or the local private .npmrc.

## Commands
- npm run dev — local app
- npm run lint — source lint
- npm run typecheck — strict TypeScript check
- npm run build — production build
- npm run db:generate — refresh Prisma client
- npm run db:migrate — create/apply a development migration
- npm run db:seed — upsert fictional examples into the dedicated local folio_dev database
- npm run db:studio — inspect local records

## Data model
The Prisma schema and initial migration contain User, Application and Activity. Applications are account-scoped and indexed for pipeline and recent updates. `lib/prisma.ts` provides a server-only client singleton for server code; the dashboard preview does not query it and still renders without PostgreSQL. Review migrations before release; destructive changes need a reversible plan.

`npm run db:seed` is optional and restricted to a PostgreSQL URL whose host is loopback and database name is exactly `folio_dev`. It upserts the reserved `sample@folio.invalid` account, four fictional applications and their sample activities. Stable IDs avoid duplicate seed rows on repeat runs; the script never deletes records. Do not use real applicant or recruiter data in this seed.

See AGENTS.md for the daily review and quality cycle and BACKLOG.md for the full 30-day schedule. The prepared local Git branch is day-00-foundation.

## Day 01 acceptance and route map

- The existing root route (`/`) renders the dashboard preview with an overview, application pipeline, calendar agenda and insight panel.
- Current navigation destinations are in-page anchors: Applications → `#pipeline`, Calendar → `#calendar`, and Insights → `#insights`. Overview remains on `/`.
- Settings and Help are visible navigation placeholders with no destination section or route yet. Day 02 will complete the shared shell and accessible navigation before later backlog items add settings behavior.
- The dashboard data and metrics are curated preview content. They do not represent an account, a live job search or database records.

## Testing baseline

Vitest renders the current workspace with React server rendering and checks its visible navigation destinations. The project also uses ESLint, strict TypeScript, Next.js production builds, and Prisma Client generation. The Day 01 baseline passed `npm test`, `npm run lint`, `npm run typecheck`, `npm run db:generate`, and `npm run build`. Database migration commands require an explicitly configured local PostgreSQL service and are not part of this no-database preview baseline.

## Privacy model

The current preview uses source-defined examples and browser-only component state; it has no sign-in, session, persistence, or database-backed personal records. `public/sw.js` caches only the offline shell, manifest, icons, and same-origin static assets; it skips `/api/` requests and does not cache navigation responses. Future reads and writes must require an authenticated account and scope every application and activity query by that account on the server. Authenticated pages and responses must remain outside service-worker caches.

## Privacy
Career history is sensitive. Every read and write must be scoped to the signed-in account. Production requires managed secrets, HTTPS, reviewed backups, private-data-safe logs and service-worker rules that never cache authenticated responses.

## Delivery and review

Folio's PR review must prove account-scoped job-search boundaries, honest preview metrics and working navigation destinations, including the recorded Settings and Help gaps. Follow [DELIVERY-POLICY.md](DELIVERY-POLICY.md) from Day 02 for sequential execution, scope-driven commits and this repository's separate branch/PR with GitHub panel review and merge.

## Contributions and examples

See [CONTRIBUTING.md](CONTRIBUTING.md) for reproducible reports, genuine collaboration and product examples such as a sample job-search flow that contains no applicant or recruiter data. Contributions follow the product backlog and reviewed PR workflow.

## Day 02 shell and appearance

WorkspaceShell owns shared sidebar/header/search and compact phone navigation. Every Settings/Help link has an honest in-page destination; Skip to workspace content targets the main region. Phone navigation keeps destinations reachable instead of hiding the sidebar's only links, and narrow search remains editable. Theme restoration waits before writing, accepts only light/dark, falls back to system appearance and tolerates blocked storage. Only folio-theme is stored; job records remain session preview data. These sections explain current limits rather than implementing account settings. The local desktop preview at 1265 CSS pixels showed no horizontal overflow; keyboard focus starts at the skip link, and the theme persists after reload. The available browser tab could not emulate a narrow viewport, so phone/tablet rendering remains unverified; static checks and CSS review do not substitute for that view.

## Day 03 Prisma boundary and local sample data

`lib/prisma.ts` is the server-only Prisma Client singleton, with development hot-reload reuse. The initial checked-in migration creates the current User, Application and Activity schema. The preview dashboard does not import the database client or claim persistence.

To use the optional seed, create a dedicated local PostgreSQL database named `folio_dev`, copy `.env.example` to `.env`, set local credentials, generate the client, apply migrations, then run `npm run db:seed`. The seed script refuses non-loopback hosts or any database name other than `folio_dev`. It upserts the reserved `sample@folio.invalid` user, four fictional opportunities and their sample activity rows using stable IDs; rerunning it does not add duplicates and it never deletes records.

The existing preview filter issue remains open: the “Recently updated” control changes its caption without changing results. Day 08 already covers combined filters and sorting; fix and test it there without treating this Day 03 database work as its resolution.
