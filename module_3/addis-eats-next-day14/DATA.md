# Day 6 — Client Data Strategy

All browser queries use the shared `fetcher` from `lib/fetcher.js`. It parses JSON and throws an `Error` for every non-OK HTTP response, preserving the status and response payload for UI error handling.

| Query | Key | Refresh / retention rule | Reason |
|---|---|---|---|
| Menu page | `/api/dishes?page={page}&pageSize=3` | Revalidate on mount/focus using SWR defaults; `keepPreviousData: true`; page 1 uses server-provided `fallbackData` | Server HTML shows the first page immediately; page navigation retains the prior cards while the next page loads. |
| Debounced dish search | `null` when the debounced term is empty; otherwise `/api/dishes?q={encodedTerm}&page=1&pageSize=100` | Input is debounced by 300 ms; `keepPreviousData: true`; revalidates on mount/focus | A null key avoids needless empty-term requests, and previous results remain visible during a new search instead of flashing empty. |
| Order status | `/api/orders/{orderId}` | `refreshInterval: 5000`, `revalidateOnFocus: true`, `keepPreviousData: true`, with server-rendered `fallbackData` | Status can change after initial render; polling keeps it current while the server-rendered status prevents a first-paint spinner. |

## Query-string paging

The current page is stored in the `page` query parameter. Changing pages uses Next.js navigation and updates the URL, so `/menu?page=2` can be bookmarked, shared, or loaded directly. Page 1 omits the parameter for a clean canonical URL.

## API response expectations

Successful responses return `{ data: ... }`; failures return `{ error: { code, message } }`. The dishes endpoint also returns `pagination` metadata. The order status endpoint returns `404` for unknown orders.

## Notes

Orders are held in an in-memory demonstration store. A server restart or a different server instance can lose the data; use a persistent database for production. An order status URL is only available for an order created in the same running instance.
