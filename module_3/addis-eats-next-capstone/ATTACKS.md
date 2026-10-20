# Day 7 — Three attacks against the local demo

These are safe, local tests against this training app. Results below describe the intended protections; run them after starting the app to confirm your own environment.

## 1. Open redirect via `next`
**Attempt:** Visit `/signin?next=https://evil.example` and sign in.

**Expected result:** `safeNext()` rejects the absolute URL and redirects to `/menu`. Protocol-relative `//evil.example` and backslash variants are rejected too.

**Why:** Only same-origin relative paths are allowed. Never redirect to a raw user-supplied URL.

## 2. IDOR / order enumeration
**Attempt:** Sign in as the customer and request `/api/orders/ORDER_ID` or `/orders/ORDER_ID` for an order owned by a different account.

**Expected result:** The API returns `404` and the page renders not-found. Both call `findOwnedOrder(orderId, session.userId)` rather than trusting the requested ID alone.

**Why:** An identifier is not authorization. Queries and writes are scoped to the authenticated session owner.

## 3. Forged or unsigned session cookie
**Attempt:** Set a cookie named `session` to `customer-1.fake` and request `/checkout` or `/staff`.

**Expected result:** Middleware may let a cookie-present request through its early check, but `getSession()` rejects the invalid signature and the page redirects to sign-in. Server Actions similarly fail without a valid session.

**Why:** Middleware checks presence only; the shared HMAC verifier is the actual authentication layer.

## Evidence to record
After running each attempt locally, record the exact URL/request, HTTP status or redirect destination, and a screenshot or terminal output. Do not claim a test passed until you observe the result.
