# Day 13 Accessibility and Deployment Pre-flight

## Source checks

- [x] No `div` with `onClick` or `onKeyDown` was found in `app/` or `components/` during the static scan. This is a source scan, not a complete manual accessibility audit.
- [x] Links are native anchors through Next.js `Link`; chart SVGs have equivalent tables.
- [x] Global visible `:focus-visible` treatment is applied to links, buttons, form controls, and focusable elements.
- [x] Interactive links and controls have a 44px minimum height baseline.
- [x] Reduced-motion preference is respected; hover is not required to reveal actions.
- [x] Order pagination and sorting remain URL-based.
- [ ] Physically complete the keyboard-only pass (Tab, Enter, Escape) on the target browser.
- [ ] Verify contrast and focus visibility at 200% zoom and with screen-reader output.
- [ ] Test on a real phone and confirm no horizontal page overflow (the data table may scroll horizontally inside its own container).

## Order submission / duplicate prevention

This project does not currently contain a checkout/order-placement form or a `POST /api/orders` write endpoint. Therefore pending-submit disabling and the “double tap creates one order” check cannot honestly be marked passed for this project. If a checkout flow is added, disable the submit button while pending and enforce idempotency on the server (client-side disabling alone is not sufficient).

## Build and route table

Run locally from the project directory:

```bash
npm install
npm run build
```

Review the route table printed by Next.js at the end of the build. Record the actual output and result here; do not copy an expected route table and call it observed evidence.

- Build result: **Not run in the preparation environment**.
- Route table reviewed: **Not yet**.

## Vercel Preview and Production

1. Push this directory to a Git repository and import it into Vercel.
2. Configure required environment variables separately for Preview and Production. This exercise currently has no required secret environment variable; do not invent secrets. If adding environment variables later, set them in each environment and redeploy.
3. Deploy a Preview, run the smoke tests, then promote/deploy to Production.
4. Open the deployed site in a private/incognito window. Test all state URLs, sorting, pagination, CSV export, map, SSE status and browser console/network errors.
5. Paste the actual production URL and observed results below.

- Preview URL: **Not deployed**
- Production URL: **Not deployed**
- Private-window post-deployment checks: **Not run**
