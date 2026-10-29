# ADDIS EATS — Next.js Day 14

Day 14 builds on Day 13 with an authentication review, a three-attack negative-test plan, a state inventory, a deployment test record, and a Vercel deployment runbook.

## Run locally

- Node.js 20.9 or later
- Copy `.env.example` to `.env.local` and set a unique `SESSION_SECRET` of at least 32 characters.
- Run `npm install`, then `npm run dev`.
- Open `http://localhost:3000`.

Demo-only accounts are documented in [DAY14-AUTH.md](./DAY14-AUTH.md). Do not use these credentials in a real service.

## Day 14 — Five short documents

1. [DAY14-AUTH.md](./DAY14-AUTH.md) — session design and limitations.
2. [DAY14-ATTACKS.md](./DAY14-ATTACKS.md) — three negative security tests.
3. [DAY14-STATES.md](./DAY14-STATES.md) — application state inventory.
4. [DAY14-TESTS.md](./DAY14-TESTS.md) — deployment battery and evidence log.
5. [DAY14-DEPLOYMENT.md](./DAY14-DEPLOYMENT.md) — Vercel runbook.

## Live URL and verification status

**Live URL: not available yet.** This archive has not been deployed to a repository or Vercel, and its production build and deployed test battery have not been verified in this environment. Do not present this as completed until the five documents' checks are run against the actual deployment. Follow [DAY14-DEPLOYMENT.md](./DAY14-DEPLOYMENT.md), record real results in [DAY14-TESTS.md](./DAY14-TESTS.md), then replace this note with the verified URL.

## Important coursework limitations

Authentication uses hard-coded demo accounts. Orders are held in memory and can disappear on restart or behave inconsistently across instances. A production system needs a trusted identity provider or database-backed authentication, password hashing, rate limiting, durable transactional storage, operational monitoring, and a security review. See also [AUTH.md](./AUTH.md), [ATTACKS.md](./ATTACKS.md), and [PREFLIGHT.md](./PREFLIGHT.md).
