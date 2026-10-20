# Day 8 performance report

## Measurement status

The baseline and after-change Lighthouse runs must be performed on the same machine, browser version, network profile, route, and production build settings. This environment did not successfully install dependencies or run Lighthouse, so no scores or timing values are fabricated here. Fill in the table from real reports before submitting.

## Lighthouse measurements

Run against `/menu` on a production server, not `next dev`.

| Metric | Before changes | After changes | Change |
|---|---:|---:|---:|
| Performance score | TODO | TODO | TODO |
| Largest Contentful Paint (LCP) | TODO ms | TODO ms | TODO |
| First Contentful Paint (FCP) | TODO ms | TODO ms | TODO |
| Speed Index | TODO ms | TODO ms | TODO |
| Total Blocking Time (TBT) | TODO ms | TODO ms | TODO |
| Cumulative Layout Shift (CLS) | TODO | TODO | TODO |
| Transfer size | TODO KB | TODO KB | TODO |

## Exact repeatable procedure

1. Check out the Day 7 ZIP as the **before** version and install dependencies.
2. Build and start production: `npm run build` then `npm run start`.
3. Run Lighthouse against `http://localhost:3000/menu` using Chrome DevTools (Lighthouse, Mobile, same settings for both runs). Save the report.
4. Repeat the same steps with Day 8 and record the results above. Do at least three runs per version and report the median to reduce noise.
5. Keep the generated Lighthouse HTML/JSON reports with the submission if your course requires evidence.

## What changed and why

- **Dish photos use `next/image`:** explicit intrinsic dimensions reserve space and reduce layout shifts; `sizes` tells the browser which responsive width it needs; Next.js serves optimized variants.
- **Exactly one priority image:** the first menu dish image has `priority`; all other dish images are not prioritized, preventing excessive competition for bandwidth. Re-check the route if the first card changes.
- **Remote image host configured:** `images.unsplash.com` is explicitly allowed in `next.config.mjs`; only this hostname is listed.
- **Self-hosted font:** `next/font/local` bundles the local DejaVu font at build time and uses `display: swap`, avoiding a render-blocking external font request.
- **Analytics loaded lazily:** `next/script` uses `strategy="lazyOnload"`, so optional third-party analytics waits until the page load and idle period. Leave `NEXT_PUBLIC_ANALYTICS_ID` empty to disable it.
- **Environment hygiene:** `.env.example` is committed, `.env*.local` is ignored, and the session signing secret is server-only. The `NEXT_PUBLIC_` analytics value is a public measurement identifier, never a secret.

## Interpretation

Do not claim an improvement until the measured after values are compared with the baseline. The expected causes above are hypotheses; the real reports determine whether they improved this project on the tested device and route.
