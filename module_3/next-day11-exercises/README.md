# ADDIS EATS — Next.js Day 11 Analytics Exercises

A small standalone Next.js App Router project covering the seven requested analytics exercises. It uses local sample data so you can focus on server/client boundaries, charts, semantic tables, URL state, sorting, pagination, and state demonstrations.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Demonstrate the four states

Use the buttons at the top of the dashboard, or open these URLs directly:

- Success: `http://localhost:3000/?state=success`
- Loading: `http://localhost:3000/?state=loading`
- Empty: `http://localhost:3000/?state=empty`
- Error: `http://localhost:3000/?state=error`

Loading and error are intentionally simulated demo states, not actual network failure behavior. The empty state is rendered before any chart data is shown.

## Sorting and paging

Click any order table column heading to sort. The selected sort key, direction, and page are encoded in `searchParams`. Use Previous/Next links to change pages. Example: `/?sort=total&dir=asc&page=2`.

## Exercise map

1. **Server aggregation:** `lib/orders.ts` aggregates neighbourhood revenue and daily counts; `app/page.tsx` calls the aggregation functions and passes only summary rows to the client chart leaves in `components/Charts.tsx`.
2. **Revenue bar chart:** fixed-height responsive chart frame, ETB labels, and patterned bars.
3. **Orders line chart:** heading specifies 20–25 October 2026 and the unit is non-cancelled orders per day.
4. **Equivalent data tables:** each chart includes a semantic table with caption and `thead`/`th scope`.
5. **Order table:** semantic table, caption, row headers, right-aligned ETB totals.
6. **Sorting:** URL `searchParams`, with `aria-sort` on the active column.
7. **Paging and states:** pagination uses `Link`; state controls demonstrate success, loading, empty, and error.

## Important notes

This is a learning project using hard-coded sample order records. It is not connected to a production database, and the loading/error states are deliberately simulated for demonstration. The SVG charts use patterns, dashes, point markers, labels, and equivalent tables so meaning does not depend on colour alone.

Before submission, run `npm run build` and record the result. A live URL is not included because this project has not been deployed from this environment.
