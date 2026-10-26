# Folio — 30-day delivery plan

Folio gives an individual a private place to organize opportunities, interviews and follow-ups. Daily delivery includes a mandatory review and quality cycle.

## Required cycle every day
Review yesterday’s code, diff, bugs and prior tests; add/update focused tests; implement the scheduled outcome; debug and check responsive, keyboard and light/dark behavior; run lint, typecheck, tests and production build when possible and record exact results; update README and backlog; reprioritize discovered work and make tomorrow’s task explicit. Keep private registry config and secrets untracked.

## Day 00 foundation prepared
Next.js App Router, strict TypeScript, Mantine, React Icons, PWA shell, Prisma/PostgreSQL domain schema, polished responsive product dashboard, setup docs and local branch day-00-foundation.

| Day | Deliverable |
|---|---|
| 01 | Confirm acceptance criteria, route map, testing tools and privacy model; capture baseline quality results. |
| 02 | Finish reusable responsive shell, accessible navigation and persisted theme behavior. |
| 03 | Establish Prisma client boundary, reviewed migration and safe local seed data. |
| 04 | Add sign-in/session flow and protected routes; test anonymous and expired sessions. |
| 05 | Persist account-scoped application creation, editing and archiving with validation. |
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