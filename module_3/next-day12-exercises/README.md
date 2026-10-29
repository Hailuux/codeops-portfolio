# ADDIS EATS — Next.js Day 12 Exercises

A standalone Next.js App Router project continuing the Day 11 analytics exercises and adding a schematic delivery map, server-sent order status updates, shared date/currency formatting, and a robust CSV export.

## Requirements

- Node.js 22 or newer (the CSV test uses Node's built-in TypeScript stripping)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Day 12 features

1. **Dynamic client map:** `components/MapLoader.tsx` uses `next/dynamic` with `ssr: false` and a fixed-size loading placeholder. `DeliveryMap.tsx` displays courier and destination markers together and repeats their route in text. It is a schematic exercise map, not a live geospatial map.
2. **SSE order status:** `GET /api/orders/AE-1041/stream` emits correctly framed `event`, `data`, and blank-line-delimited SSE messages. `OrderStatusStream` is seeded from server props, uses `EventSource`, closes on unmount, and deliberately closes when status becomes `Delivered`.
3. **Shared formatting:** `lib/format.js` exports `etb`, `when`, and `relative` helpers. Currency uses ETB; dates use the Africa/Addis_Ababa timezone.
4. **CSV export:** use the **Export CSV** link on the dashboard or open `/api/orders/export`. The CSV route includes test records containing a comma and quotation marks to demonstrate proper escaping. Embedded double quotes are doubled and cells containing commas/quotes/newlines are quoted.
5. **CSV test:** run `npm run test:csv`. It checks a comma-containing value and a quotation-mark-containing value.
6. **Day 11 preserved:** accessible charts and matching tables, server aggregation, URL-driven sorting and paging, and success/loading/empty/error demonstration links remain available.

## Demonstrate states

- `/?state=success`
- `/?state=loading`
- `/?state=empty`
- `/?state=error`

## Verify

```bash
npm run test:csv
npm run build
```

The CSV escaping test was run successfully while assembling this project. A full Next.js production build was not verified in this environment because dependency installation did not finish before timeout. Run the build locally before submission.

## Important scope notes

- The dataset is sample data, not a database.
- The map is a schematic illustration, not a live tile map or GPS integration.
- The SSE endpoint demonstrates an order status stream with timed sample transitions; it is not connected to a real order service.
- No deployment URL is claimed because this project has not been deployed.
