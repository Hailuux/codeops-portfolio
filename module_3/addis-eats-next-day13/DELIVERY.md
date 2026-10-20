# Day 12 — Delivery tracking and resilient CSV

## Tracking page
- Visit `/orders/[id]/tracking` while signed in as the owner of that order.
- The server renders the initial order status and delivery details.
- `TrackingMap.js` is a client boundary and imports Leaflet CSS. It loads `TrackingMapInner.js` with `dynamic(..., { ssr: false })` so Leaflet does not execute during server rendering.
- The map has an explicit 360px height, retains OpenStreetMap attribution, and shows the courier and destination as separate markers. The same labels/address are repeated in adjacent text so the information is not map-only.
- Coordinates are clearly labelled as demo coordinates around Addis Ababa. Connect trusted address geocoding and courier GPS before treating this as live location data.

## Server-sent events
- `GET /api/orders/[id]/stream` verifies the session and order ownership before streaming.
- Each message is encoded as `data: {JSON}\n\n`, as required by SSE.
- The client starts with the server-provided `initialStatus`, opens an `EventSource`, displays connection state, and closes the source on unmount.
- The demo emits the current status every three seconds. Since the in-memory store is shared only within the current server process, use a database and event broker for multi-instance production deployments.

## Shared formatting
`lib/format.js` is the single shared module for:
- `etb(value)` — Ethiopian birr formatting.
- `when(value)` — human-readable date/time formatting.
- `relative(value)` — relative time formatting.

All three formatters are defined once and reused by tracking and CSV output.

## CSV export
- `GET /api/orders/export` requires a valid session and exports only the current user's orders.
- CSV fields are quoted when they contain commas, double quotes, carriage returns, or newlines; embedded double quotes are doubled. The file uses CRLF row endings and a UTF-8 BOM for spreadsheet compatibility.
- Export includes a stable header even when the user has no orders. It is private and `no-store`.

## Manual checks
1. Sign in and place an order, then open `/orders/<id>/tracking`.
2. Confirm map tiles show OpenStreetMap attribution and the same courier/destination details appear as text.
3. Observe the status connection label; navigate away and back to verify the EventSource lifecycle.
4. Visit `/api/orders/export` and open the CSV in a spreadsheet or text editor.
5. Try export and stream URLs while signed out (401), and try an order belonging to another user (404).
6. For CSV edge-case testing, ensure test data includes a comma, double quote and newline in an address or item name; the exporter quotes these cells and doubles embedded quotes.
