# ADDIS EATS — Day 7 Authentication Review

## Session design
- `session` is a signed, eight-hour HMAC token. The secret is server-only in `SESSION_SECRET`.
- Cookie options: `httpOnly: true`, `sameSite: "lax"`, `secure: true` in production, `path: "/"`, eight-hour max age.
- `getSession()` in `lib/server/session.js` is the shared verifier used by server pages, Server Actions and route handlers. Invalid, expired, malformed, or incorrectly signed tokens return `null`.
- Middleware checks cookie presence only as an early redirect optimization. It is not the authorization boundary: every private page/action/handler verifies the signed token itself.
- `next` accepts only a local path. Protocol-relative URLs (`//host`), absolute URLs, and backslash tricks fall back to `/menu`.

## Protected routes and layers

| Route | Middleware | Rendering/action check | What it proves |
|---|---|---|---|
| `/cart` | Requires a session cookie | Page must call `getSession()` | Middleware reduces unnecessary access; page validates signature/expiry |
| `/checkout` | Requires a session cookie | Page checks `getSession()`; `placeOrder` checks it again | A forged cookie cannot authorize a write |
| `/orders/[id]` | Requires a session cookie | Page uses `findOwnedOrder(id, session.userId)` | The order belongs to the signed-in session, not merely a supplied ID |
| `GET /api/orders/[id]` | Middleware matcher includes `/orders`, not `/api`; handler independently calls `getSession()` | Handler uses `findOwnedOrder` | API access requires valid session and ownership |
| `POST /api/orders` | Not matched by middleware | Handler must validate the session before creating the order | API writes cannot trust the UI or middleware |
| `cancelOrder` Server Action | Middleware is not the security boundary for actions | Action verifies session and passes session user ID to `cancelOwnedOrder` | Session and ownership are checked at the write point |
| `/staff` | Requires a session cookie | Page verifies session and requires role `staff` | Customer sessions cannot access staff content |

## Demo credentials
- Customer: `customer@addiseats.local` / `EatsDemo2026!`
- Staff: `staff@addiseats.local` / `StaffDemo2026!`

These hard-coded demo accounts are for coursework only. Replace them with a database-backed identity provider, password hashing (Argon2id/bcrypt), rate limiting, CSRF protections appropriate to the deployment, and durable sessions before production. Do not use these demo passwords outside local development.
