# Day 14 — Authentication verification

## Current implementation
- The demo signs an eight-hour session token with HMAC-SHA256 using server-only `SESSION_SECRET`.
- The `session` cookie is `HttpOnly`, `SameSite=Lax`, scoped to `/`, and `Secure` in production.
- Protected pages, API handlers and order actions must verify the token on the server; middleware cookie-presence checks are only an early redirect.
- Order reads must be scoped to the authenticated user's ID.

## Local demo accounts
- Customer: `customer@addiseats.local` / `EatsDemo2026!`
- Staff: `staff@addiseats.local` / `StaffDemo2026!`

These are public training credentials, not production credentials. Do not use this in a real service: replace hard-coded accounts with a trusted identity provider or database, password hashing, rate limiting, durable storage, CSRF review and security monitoring. Keep `SESSION_SECRET` server-only and at least 32 characters. Authentication is not considered production-verified until the live checks in `DAY14-TESTS.md` have been run and recorded.
