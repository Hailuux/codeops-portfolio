# Day 11 — Server Analytics and Accessible Data Views

## What is implemented

- `/staff/dashboard` calculates neighbourhood and date aggregates in the server page. Chart components receive only summary rows, not raw orders.
- Revenue by neighbourhood uses a patterned bar chart and ETB-formatted labels. Orders over time uses a dashed line, point markers, and numeric labels so it does not depend on colour alone.
- Both charts have headings, units, a fixed-height visual area, and a semantic data table with `caption`, `thead`, and scoped headers.
- The orders table is a semantic HTML table. Sort key, direction, and page are encoded in the URL; sorting controls and pagination use `next/link`.
- Staff access is checked on the server. A non-staff session receives an access-denied view and a signed-out visitor is redirected to sign in.

## Demonstrate the four states

Sign in with the project's staff demo account, then open `/staff/dashboard`. Use these links on the page, or open the URLs directly:

- Success/live data: `/staff/dashboard`
- Loading demonstration: `/staff/dashboard?state=loading`
- Empty data: `/staff/dashboard?state=empty`
- Error demonstration: `/staff/dashboard?state=error`

The loading and error URLs are deliberate state demonstrations, not proof of a real backend outage. The empty state renders without order records.

## Verify sorting and pagination

Try `/staff/dashboard?sort=total&dir=asc&page=1`, then use the table headings and Previous/Next links. Only `createdAt`, `total`, `status`, and `name` are accepted as sort keys; page values are bounded to the available page range.

## Run locally

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000/staff/dashboard`. A staff session is required.

## Validation note

A source-level correction was made to the local-font import in `app/layout.js` (`next/font/local` uses a default import). Run `npm run build` in your environment before treating the build as verified. No live deployment or external test run is claimed by this ZIP.
