# Folio — 30-day delivery plan

Folio gives an individual a private place to organize opportunities, interviews and follow-ups. Daily delivery includes a mandatory review and quality cycle.

## Required cycle every day
Review yesterday’s code, diff, bugs and prior tests; add/update focused tests; implement the scheduled outcome; debug and check responsive, keyboard and light/dark behavior; run lint, typecheck, tests and production build when possible and record exact results; update README and backlog; reprioritize discovered work and make tomorrow’s task explicit. Keep private registry config and secrets untracked.

## Day 00 foundation prepared
Next.js App Router, strict TypeScript, Mantine, React Icons, PWA shell, Prisma/PostgreSQL domain schema, polished responsive product dashboard, setup docs and local branch day-00-foundation.

### Day 00 validation
Nexus returned 404 for packages used by this project. Following the user's approval, dependencies were installed with npmjs fallback. The ignored local .npmrc preserves Nexus as default and contains only required scope overrides. Tests, lint, typecheck and production build passed; Day 01 has not started.

| Day | Deliverable |
|---|---|
| 01 | Done — document acceptance criteria, current route map, testing tools and privacy model; capture baseline quality results. |
| 02 | Merged — shared shell, compact navigation, Settings/Help destinations and safe theme restoration. PR #4 merged at `4679cc0`; local desktop checks passed, GitHub had no configured checks, and live phone/tablet viewport validation remains unavailable. Issue #3 tracks the separately reproduced preview filter defect. |
| 03 | Merged — PostgreSQL 18.6 migration and repeat-seed acceptance passed locally on 2026-11-01. PR [#5](https://github.com/danyallya/job-application-tracker/pull/5) merged at `25e3897`; local `main` is synchronized. |
| 04 | Merged — password-verified sign-in, expiring database sessions, sign-out and server protection for `/workspace`. PR [#6](https://github.com/danyallya/job-application-tracker/pull/6) merged at `b28a1e32172fdc1e3c5d72ef5ec471cbfa0e7030`; local `main` was reconciled at `b46cf52ba21aaefc6c69531536fe483884184e59` after the Issue #3 follow-up. |
| 05 | Done — persist account-scoped application creation, editing and soft archiving with server-side validation. Add synthetic records only in the local `folio_dev` database; do not claim production readiness or accessibility conformance. |
| 06 | Add application detail and activity history with loading, empty and error states. |
| 07 | Add stage transitions and audit events with keyboard-accessible controls. |
| 08 | Add search, stage filters, sorting and pagination; test combined filters. |
| 09 | Add follow-up reminders with timezone-safe due dates and overdue behavior. |
| 10 | Build agenda calendar with month navigation and responsive layout. |
| 11 | Add interview preparation notes and structured company/contact information. |
| 12 | Derive overview metrics from saved records and verify chart totals. |
| 13 | Add accessible Recharts activity trends and meaningful empty states. |
| 14 | Export XLSX reports and verify columns, dates and formula safety. |
| 15 | Export paginated PDF reports with a print-friendly layout. |
| 16 | Build CSV import preview, field mapping and validation before writes. |
| 17 | Complete transactional imports and duplicate detection. |
| 18 | Add preferences for target role, weekly goal, date format and reminders. |
| 19 | Add preference-aware in-app reminders and notification controls. |
| 20 | Harden forms and server boundaries with validation and rate limits. |
| 21 | Review query plans and indexes against realistic account-sized data. |
| 22 | Improve PWA installation, offline shell and stale-data messaging. |
| 23 | Audit offline caching; exclude authenticated API responses and private pages. |
| 24 | Add account data export and confirmed account deletion flows. |
| 25 | Audit keyboard use, focus, contrast, reduced motion and screen-reader labels. |
| 26 | Complete phone, tablet and desktop visual review; fix layout defects. |
| 27 | Review authorization, CSRF, headers, logging, dependencies and secret handling. |
| 28 | Reduce bundle and query costs; document measured performance and tradeoffs. |
| 29 | Release-candidate regression suite, migration rehearsal and production build. |
| 30 | Publish release notes, deployment guide, product screenshots and next-quarter plan. |

A day is complete only when review, tests, implementation, debugging, documentation, tomorrow's plan and honest verification are recorded. Avoid activity-only commits.

- Day 01: Done. The documented root/anchor route map, privacy boundary, test tools and passing baseline are recorded in README and DAILY-LOG. The navigation still exposes Settings and Help placeholders with no target; address their destinations while completing the responsive accessible shell on Day 02.

## Process change effective Day 02 — 2026-10-27

Apply [DELIVERY-POLICY.md](DELIVERY-POLICY.md) to every remaining ticket: finish Folio before the next repository, use meaningful scope-driven commits and deliver through its own reviewed PR. A blocked external gate needs a concrete record and next action. This adds delivery gates without moving Day 02–30 product work or changing completed history.

## Contribution integration — 2026-10-27

Effective Day 02: apply [CONTRIBUTING.md](CONTRIBUTING.md) inside existing tickets. At already scheduled weekly reviews, assess real feedback such as a synthetic application-stage or navigation reproduction with expected scope; at documentation/setup tickets, improve a sample job-search flow that contains no applicant or recruiter data. Day 30 records actual contribution evidence and outstanding external dependencies. No day is renumbered and no quota or badge is a completion criterion.

- Review follow-up for Issue #3 (Day 01–02): removed the unsupported “Recently updated” toggle, made the all-applications state explicit, and made the search action clear the query to restore every item. PR [#7](https://github.com/danyallya/job-application-tracker/pull/7) merged this verified fix and closed the issue. Recency sorting stays on Day 08 until records have typed update timestamps.

## Day 05 delivery

Application creation, editing, validation and account-scoped archiving are implemented and tested on branch `day-05/account-scoped-applications`. Next scope is Day 06: application detail and activity history with loading, empty and error states. A new manual user trigger is still required.
