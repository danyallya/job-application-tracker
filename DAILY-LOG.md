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

## Review workflow maintenance — 2026-10-27

- The user requested careful sequential project execution, commit content/counts suited to each product and an independent branch/PR per repository with panel review and merge.
- Folio's PR review must prove account-scoped job-search boundaries, honest preview metrics and working navigation destinations, including the recorded Settings and Help gaps. Added a standalone delivery policy and entry points in AGENTS, README and BACKLOG.
- Documentation-only maintenance on `docs/folio-account-review`; Markdown diff reviewed and `git diff --check` used. No application tests/build rerun for this process change. Next product work: Day 02 — responsive reusable shell, accessible navigation destinations and persisted theme.
- This is the pre-merge log state. The portfolio workspace DELIVERY-RECEIPTS.md records the actual PR URL, checked head, panel gates, merge SHA and sync afterward; reconcile it here in the next authorized update.

## Contribution guidance maintenance — 2026-10-27

- User request: integrate achievable GitHub profile goals naturally into future project work. Added Folio contribution guidance around a synthetic application-stage or navigation reproduction with expected scope and useful documentation examples. Preserved the daily backlog and all delivery gates.
- Previous delivery-policy PR #1 is merged in origin/main; this maintenance starts from that merged history. No badge, collaborator, star or accepted answer is claimed.
- Documentation-only scope on docs/folio-private-contributions; reviewed Markdown and git diff --check. App tests/build are not rerun because runtime behavior is unchanged.
- External blocker: local browser use is disabled in Work settings. PR creation, panel review and merge remain pending; resume from this branch when browser access is available, inspect existing PRs first, target main and follow all gates.
- Publication is pre-merge here; the final PR/head/panel/check/merge/sync evidence goes in the workspace DELIVERY-RECEIPTS.md after completion. Next: Day 02 — responsive reusable shell, accessible navigation destinations and persisted theme. Wait for the user's day trigger.

## Day 02 — Folio shared shell — 2026-10-28

- Reconciled policy/contribution PRs #1/#2 at origin/main 4340009. Reviewed Day 01 navigation/privacy changes and existing theme effects. Initial appearance was written before restoration and storage exceptions could break startup. Added validated storage helpers and an initialization gate before writes.
- Extracted WorkspaceShell for sidebar, header and search. Added skip link/main target, compact navigation and real Settings/Help explanation sections. Phone search stays editable and tablet settings/help controls remain present. Account settings, database writes and reports are not claimed.
- npm test -- --maxWorkers=1 passed (2 files, 4 tests); lint and typecheck passed; build result is recorded in the workspace receipt. Local full diff review covers nine files before this log; storage helper cases use synthetic values and write only folio-theme. No database change or private career data.
- Work browser disabled: live focus/phone/tablet/desktop/theme inspection and PR creation/exact-head panel Files changed/Checks/conversation/merge/sync pending. Branch day-02/folio-shell-navigation is preserved for those gates. No CI, independent approval or badge claim.
- Next product scope is Day 03 Prisma boundary, reviewed migration and synthetic seed, after Day 02 delivery gates and its manual trigger. Existing preview date/metrics remain illustrative; this work changes shell behavior only.
