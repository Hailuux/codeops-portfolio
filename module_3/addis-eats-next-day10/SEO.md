# Day 9 SEO and social preview verification

## Production URL

Set `SITE_URL` in `.env.local` to the canonical deployed origin before building (for example, `https://your-real-domain.example`). The code uses `https://addis-eats.example.com` as a safe placeholder if unset; replace it before deployment. `metadataBase` is built from this value.

## Metadata and previews

- Root layout defines `metadataBase`, a title template, site-wide Open Graph, and Twitter large-image metadata.
- Home, menu, cart, checkout, sign-in, staff, order, confirmation, loading, error, and not-found routes have human-readable descriptions.
- The dish route derives title, description, canonical URL, Open Graph, and Twitter metadata from the dish record in `generateMetadata`.
- `/opengraph-image` creates a 1200 × 630 PNG for the site; `/menu/[id]/opengraph-image` creates a matching per-dish image at the same dimensions.
- Dish detail pages output Schema.org `MenuItem` JSON-LD using the same dish name, description, and ETB price shown in the page.
- `/sitemap.xml` is generated from the dish data and public routes only. Private routes and API paths are excluded from the sitemap and disallowed in `robots.txt`.
- `/menu` has canonical metadata at `/menu`, so `?page=`, search terms, and other query parameters do not create duplicate canonical URLs. Dish detail routes have a canonical URL as well.

## Verify against rendered output

1. Set `SITE_URL` to the actual production origin in `.env.local`.
2. Run `npm run build && npm run start`.
3. Inspect `view-source:http://localhost:3000/`, `/menu`, and `/menu/1`; search for `description`, `canonical`, `og:image`, `twitter:card`, and `application/ld+json`.
4. Open `http://localhost:3000/sitemap.xml` and `http://localhost:3000/robots.txt`. Confirm only `/`, `/menu`, and dish detail URLs are in the sitemap.
5. Open `/opengraph-image` and `/menu/1/opengraph-image`; both should return a PNG with dimensions 1200 × 630.
6. Before deployment, test the deployed URL in the Facebook Sharing Debugger and LinkedIn Post Inspector (or an equivalent social preview debugger). Scrape/refresh the preview after publishing.

A social debugger requires a publicly reachable deployment; local preview metadata cannot be fetched by external services.
