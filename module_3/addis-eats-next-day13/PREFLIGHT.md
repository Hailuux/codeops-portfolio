# Day 13 Accessibility, mobile and deployment pre-flight

## Keyboard-only checks

- [ ] Start at the address bar and use Tab / Shift+Tab through every route.
- [ ] Confirm every interactive control is a native `<a>`, `<button>`, or form control; no clickable `<div>`.
- [ ] Confirm visible focus outline on links, buttons, inputs, selects and textareas.
- [ ] Activate links with Enter and buttons with Enter/Space.
- [ ] Submit sign-in and checkout forms with Enter; verify errors are announced and focus remains usable.
- [ ] Confirm pending submit buttons disable immediately and cannot trigger duplicate submissions.
- [ ] Verify dialogs/menus (if added) can be opened and closed using keyboard only.

## Phone checks

- [ ] Test at 320px, 375px and 390px viewport widths.
- [ ] Confirm no horizontal overflow and all primary targets are at least 44 × 44 CSS pixels.
- [ ] Confirm navigation, cart, checkout and tracking work without hover.
- [ ] Test portrait orientation and browser zoom at 200%.

## Production checks

```bash
npm ci
npm run build
npm run start
```

Run the app locally in a private/incognito window and verify:

- [ ] Public home/menu pages load.
- [ ] Signed-out access to `/checkout`, `/staff`, `/staff/dashboard`, and order routes redirects appropriately.
- [ ] Sign-in and sign-out work; `next` cannot redirect to an external URL.
- [ ] Checkout validates input, shows pending state, and only creates one order per submission.
- [ ] Menu image, tracking map, SSE status and CSV export behave as documented.
- [ ] `/api/dishes`, `/api/dishes/999`, and invalid `/api/orders` return expected responses.
- [ ] Browser console has no uncaught errors; inspect network for failed requests.

## Vercel deployment

1. Import the Git repository into Vercel.
2. Configure variables separately under **Preview** and **Production**. At minimum set a unique strong `SESSION_SECRET` in both; set `SITE_URL` to the correct URL for each environment. Do not commit `.env.local`.
3. Deploy a Preview first; repeat the checklist above against its URL.
4. Deploy Production; set production variables, redeploy, then repeat checks in a private window.
5. Put the real production URL and date of verification into README.md only after those checks pass.

## Evidence log

| Environment | URL | Build | Private-window checks | Date / notes |
|---|---|---|---|---|
| Local production build | `http://localhost:3000` | Run locally | Pending until checked | |
| Vercel Preview | Add actual URL | Pending | Pending | |
| Vercel Production | Add actual URL | Pending | Pending | |

Do not mark a row passed unless the commands and browser checks were actually completed.
