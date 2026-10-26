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