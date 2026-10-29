# Day 14 — Deployment test record

## Required battery
- [ ] `npm install` completes with no dependency errors.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Menu, dish details, cart, sign-in, checkout, confirmation, order details, tracking and staff authorization checked.
- [ ] Empty, loading, invalid, pending, error and success states checked where applicable.
- [ ] Three negative security tests from `DAY14-ATTACKS.md` observed and recorded.
- [ ] Keyboard-only navigation and visible focus checked.
- [ ] Mobile viewport checked; no horizontal overflow or hover-only actions.
- [ ] Deployed site checked in a private/incognito window.
- [ ] Preview and Production environment variables set separately in Vercel.

## Evidence log
| Check | URL / request | Observed result | PASS/FAIL | Date |
|---|---|---|---|---|
| Forged session | | | NOT RUN | |
| Open redirect | | | NOT RUN | |
| Unauthenticated order write | | | NOT RUN | |
| Production build | | | NOT RUN | |
| Private-window smoke test | | | NOT RUN | |

Do not mark checks PASS without observed evidence. No live deployment or successful build is claimed by this starter archive.
