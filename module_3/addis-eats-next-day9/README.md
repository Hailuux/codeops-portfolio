# ADDIS EATS — Next.js Capstone (Day 5)

Complete learning capstone migrated to Next.js App Router, continuing the Day 4 implementation. Includes five primary page routes (`/`, `/menu`, `/menu/[id]`, `/cart`, `/checkout`), nested layouts and special files, dish and order Route Handlers, a schema-validated checkout Server Action, cache revalidation, and ownership checks inside the cancellation action.

## Requirements

- Node.js 20.9+
- npm

## Setup

```bash
npm install
cp .env.example .env.local
```

Set `SESSION_SECRET` in `.env.local` to a random secret of at least 32 characters. Never commit `.env.local`; never expose the secret through a `NEXT_PUBLIC_` variable.

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Production build and smoke test

Run these commands from a clean clone or the extracted project folder:

```bash
npm ci
npm run build
npm run start
```

In a second terminal:

```bash
bash verify-production.sh
```

The smoke test verifies `/api/dishes`, that a missing dish returns `404`, and that invalid order data returns `422`. The script exits non-zero if either expected error status is wrong.

### Build output record

**Build status in the artifact-generation environment: NOT VERIFIED.** Dependency installation could not complete because the npm registry was not reachable within the execution window. No production build output is fabricated here. After `npm ci && npm run build`, paste the exact route table emitted by Next.js below and update `STRATEGY.md` so its markers match.

```text
PASTE EXACT `npm run build` ROUTE TABLE HERE
```

## Rendering and component boundaries

- `STRATEGY.md` documents every route's expected rendering strategy and the Next.js build marker to confirm.
- `BOUNDARY.md` lists the component/module execution side and why it belongs there.
- The menu route uses ISR (`revalidate = 60`); dish details use `generateStaticParams`; checkout is dynamic because it reads `cookies()`.
- The checkout API and Server Action use the shared schema in `lib/order-schema.js`.
- `cancelOrder` verifies the session and order ownership inside the action. The UI is not the authorization boundary.

## API examples

```bash
curl -i http://localhost:3000/api/dishes
curl -i http://localhost:3000/api/dishes/1
curl -i http://localhost:3000/api/dishes/999
curl -i -X POST http://localhost:3000/api/orders \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ab","email":"ab@example.com","address":"Bole, Addis Ababa","items":[{"id":"1","quantity":2}]}'
```

Valid orders return `201`; invalid data returns `422` with `fieldErrors`; unknown dishes return `404`.

## GitHub: push and verify from a fresh clone

I cannot push to your GitHub account or verify a fresh clone without repository access/credentials. After creating an empty GitHub repository, run:

```bash
git init
git add .
git commit -m "Complete ADDIS EATS Next.js capstone"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Then verify from a new folder:

```bash
 git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git addis-eats-fresh-clone
 cd addis-eats-fresh-clone
 npm ci
 cp .env.example .env.local
 # set SESSION_SECRET in .env.local
 npm run build
 npm run start
```

Run `bash verify-production.sh` from another terminal. Do not commit real `.env.local` credentials.

## Limitations

This is an educational capstone: order storage is an in-memory `Map` and resets when the server restarts. The repository does not implement a login flow that issues signed session cookies. Connect a real authentication provider and persistent database before production use.


## Day 6: client data and refresh behavior

Install the added SWR dependency after extracting the project:

```bash
npm install
npm run dev
```

- Menu: visit `/menu`, search with a term (300 ms debounce), and page with Previous/Next. The page number is shareable in the URL, for example `/menu?page=2`.
- Shared fetcher: `lib/fetcher.js` throws for all non-OK responses so SWR exposes API failures to the UI.
- Order status: visit `/orders/<order-id>` for an order created by this same running app. The route renders its initial status on the server and then polls every five seconds. Unknown IDs return the not-found page.
- Query keys and refresh decisions: see `DATA.md`.

The order store is in-memory for training; status tracking is not durable across restarts or multiple server instances. No production build or live `curl` test is claimed here unless you run it locally.


## Day 7 — Authentication and authorization

See [`AUTH.md`](./AUTH.md) for the protected-route matrix and [`ATTACKS.md`](./ATTACKS.md) for three local security tests.

1. Configure `SESSION_SECRET` in `.env.local` with at least 32 characters.
2. Run `npm install` and `npm run dev`.
3. Visit `/signin`. Demo customer: `customer@addiseats.local` / `EatsDemo2026!`; staff: `staff@addiseats.local` / `StaffDemo2026!`.
4. Visit `/checkout`, `/orders/<id>`, and `/staff` while signed out and signed in to compare behavior.
5. Try `/signin?next=https://evil.example`; after sign-in it should redirect to `/menu`.

Security note: demo credentials are hard-coded only for this course exercise. The session is HMAC-signed and cookie-protected, but this is not a production identity system. Use a proper identity provider, persistent database, rate limiting, and production security review before deployment.

## Day 8: performance work

See [PERF.md](./PERF.md) for the repeatable before/after Lighthouse procedure and the explanation of each change. The score table is intentionally marked TODO because no Lighthouse run was completed in the generation environment; enter actual results from identical production-build tests rather than inventing numbers.

- Images use `next/image` with width, height, sizes, and descriptive alt text.
- Exactly the first menu card image is prioritized; remaining images are not.
- Remote images are limited to `images.unsplash.com` in `next.config.mjs`.
- The font is bundled locally through `next/font/local`.
- Optional analytics uses `next/script` with `lazyOnload` and is disabled by default.
- Copy `.env.example` to `.env.local`; `.env*.local` is ignored by Git. Never expose `SESSION_SECRET` with a `NEXT_PUBLIC_` prefix.


## Day 9 — Metadata, social previews, structured data

See [SEO.md](./SEO.md) for the verification checklist. Configure `SITE_URL` to the actual production origin before building; the example domain is a placeholder, not a claim that the app is deployed. The site and per-dish Open Graph images are generated at 1200 × 630. `/sitemap.xml` is built from the current dish records and excludes private pages.

Quick checks after `npm run build` and `npm run start`:

```bash
curl -I http://localhost:3000/opengraph-image
curl -I http://localhost:3000/menu/1/opengraph-image
curl -s http://localhost:3000/sitemap.xml
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/menu/1 | grep -E 'canonical|og:image|application/ld\+json|description'
```

The build and external social preview debugger were not run in this environment; use the checks above and a publicly deployed URL to confirm actual rendered output.
