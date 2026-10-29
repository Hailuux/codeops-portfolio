# Day 11 analytics notes

## Data boundary

`app/staff/dashboard/page.js` is a Server Component. It checks the signed session and staff role before reading orders, then aggregates neighbourhood and daily totals on the server. Only summary rows (`neighbourhood`, `orders`, `revenue`; and `date`, `orders`, `revenue`) are passed to the client chart leaves in `Charts.js`. Raw customer records never cross into chart props.

Neighbourhood is inferred from a matching neighbourhood name in the delivery address (`Bole`, `Piassa`, `Kazanchis`, `Lideta`, `Arat Kilo`); unrecognised addresses are grouped as `Other / not specified`. For a production system, store a validated neighbourhood field instead of inferring it from free text.

## URL state

- `sort=createdAt|name|status|total` selects a sort column.
- `dir=asc|desc` controls direction.
- `page=1...` selects the page, with five rows per page.
- `state=loading|empty|error` intentionally renders a demonstrable state for coursework. Remove or protect these demo switches in production.
- Sort and page links preserve the other state where applicable and use `next/link`.

## Four states

- Success: `/staff/dashboard` with orders available.
- Loading: `/staff/dashboard?state=loading`.
- Empty: `/staff/dashboard?state=empty`.
- Error: `/staff/dashboard?state=error`.

The empty state also appears naturally when there are no orders in the in-memory store. The error state is a deliberate presentation demo rather than a simulated database failure.

## Accessibility

Both charts have headings, a stated unit, fixed-height plot areas, text labels and a companion HTML table with caption, `thead`, and scoped headers. Bar fills use a high-contrast hatch pattern; the line uses a dashed stroke and point labels, so chart meaning does not rely on colour alone. The order table uses semantic `table`, `caption`, `thead`, `th scope`, and `Link`-based URL pagination.

## Data limitation

The course app's order store is in-memory. Data resets on server restart and is not shared across serverless instances. Replace it with a persistent database and authenticated staff reporting queries before production use.
