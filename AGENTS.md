# Folio contributor guide

## Product direction
Folio is a private workspace for people managing a professional job search. Keep the interface calm, legible and useful. Avoid gamified urgency and invented AI claims.

## Required daily cycle
1. Read this guide, BACKLOG.md, Git status and prior-day notes.
2. Review existing changes, open bugs and tests; reproduce defects first.
3. Add or update focused tests for existing behavior and today's acceptance criteria.
4. Implement the day's planned outcome and debug related defects.
5. Check responsive, keyboard, light/dark, lint, typecheck, tests and production build where the environment permits; record exact results.
6. Update README, backlog status, decisions and tomorrow's task. Add discovered work with priority and reason.
7. Commit only reviewed, relevant changes. Keep .npmrc, .env, credentials and local data out of commits. Never force-push.

## Engineering
- Use strict TypeScript and App Router conventions.
- Keep DB access and secrets on the server; validate every boundary and scope records to the account owner.
- Include accessible labels, focus states, empty/loading/error states.
- Treat service-worker caching as a privacy boundary; authenticated responses must not be cached.
- Review migrations for reversibility. Avoid placeholder secrets and unsupported product claims.

## Delivery from Day 02

- Read and follow [DELIVERY-POLICY.md](DELIVERY-POLICY.md). Finish Folio and its own PR panel review, merge and sync before the next portfolio repository, or record an exact external blocker. No concurrent project or subagent work.
- Choose commit counts, boundaries, content and wording from this product's real changes; do not copy a fixed history pattern from other projects.
- Review the latest pushed head and checks in GitHub and merge through this repository's PR panel. Respect required independent approvals; self-review does not replace them.
