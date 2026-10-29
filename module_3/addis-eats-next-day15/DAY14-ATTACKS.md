# Day 14 — Three negative authentication/security tests

Run only against your local instance or a deployment you own or are authorized to test. Capture actual status/redirect evidence. Expected outcomes are not proof until observed.

1. **Unsigned/forged session:** request `/checkout` with `Cookie: session=customer-1.fake`. Expected: redirected to `/signin`; the cookie's presence must not authenticate the request.
2. **Open redirect:** visit `/signin?next=https://example.org` and sign in with a demo account. Expected: navigation stays on the app, normally `/menu`; it must not navigate to `example.org`. Repeat with `next=//example.org`.
3. **Unauthenticated order write:** send a syntactically valid `POST /api/orders` with no session cookie. Expected: HTTP `401` with `UNAUTHENTICATED`, and no order created.

Record date, deployed URL, request, observed status/location, and result for each test in `DAY14-TESTS.md`. If any observed result differs, mark it FAIL and fix it before claiming completion. Do not put real customer data or secrets in evidence.
