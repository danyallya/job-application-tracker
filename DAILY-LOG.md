# Daily work log

## Day 00 — foundation (2026-10-26, Asia/Tehran)

- Prepared the product-specific Next.js/TypeScript workspace, responsive interface, light/dark theme, React Icons, PWA shell, README, AGENTS.md and 30-day backlog.
- Review: inspected the starter page, tests, database schema/config, build, Git ignore rules and local registry setup; corrected issues found by checks before recording a passing result.
- Dependencies: generated package-lock.json and installed packages after Nexus 404s. The user approved npmjs fallback. Local .npmrc remains ignored, preserves Nexus as default and maps only required scopes. No private registry config is tracked.
- Checks: npm test passed (1/1), npm run lint passed, npm run typecheck passed, and npm run build passed. The production build emitted the PWA manifest/service-worker shell.
- Database setup: npm run db:generate generated Prisma Client from the local schema. No real database connection or data push was attempted.
- GitHub: Day 00 foundation commit 2ac8371 is pushed to both main and day-00-foundation: https://github.com/danyallya/job-application-tracker. Day 01 has not started.
- Schedule: Day 01 has not started. The next task is Day 01 in BACKLOG.md; wait for the user to trigger that day.

## Day 01 — acceptance and privacy baseline (2026-10-27, Asia/Tehran)

- Review: reviewed the dashboard, Prisma schema, current navigation, service worker, tests and Git history. The preview currently has a root route and in-page Applications, Calendar and Insights targets; Settings and Help are visible placeholders without targets.
- Implementation: documented acceptance criteria, route map, verification tools and the privacy boundary. Added a regression test for the current navigation anchors. Updated BACKLOG with Day 01 completion and the Day 02 navigation carry-over.
- Privacy: the dashboard uses curated source data and client-only state, without sign-in, persistence or database-backed user records. The service worker skips `/api/` and does not cache navigation responses; future personal records must be account-scoped on the server.
- Checks: `npm test` passed (1 file, 2 tests); `npm run lint`, `npm run typecheck`, `npm run db:generate`, `npm run build`, and `git diff --check` passed. No database migration was run; the baseline requires no database service.
- GitHub: implementation/docs commit `ef41557` (`docs: define day-one scope and privacy baseline`) was pushed to `day-01/acceptance-baseline`, fast-forwarded to `main`, and `main` was pushed. This log entry will be included in the final sync.
- Next: Day 02 — complete the responsive shell, accessible navigation destinations and persisted theme behavior.
