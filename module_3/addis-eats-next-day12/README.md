# ADDIS EATS — Next.js Day 12

Day 12 adds delivery tracking with Leaflet, server-sent events (SSE), shared ETB/date formatting, and a CSV export of the signed-in user's order history. It carries forward the previous day's Next.js app and its documentation.

## Requirements
- Node.js 20.9 or later
- A `SESSION_SECRET` with at least 32 characters

## Setup
1. Copy `.env.example` to `.env.local` and set `SESSION_SECRET`.
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Open `http://localhost:3000`.

## Day 12 routes
- `/orders/[id]/tracking` — server-rendered delivery details, map, and live SSE status.
- `/api/orders/[id]/stream` — authenticated, ownership-scoped server-sent event stream.
- `/api/orders/export` — authenticated CSV download containing only the signed-in user's order history.

See [DELIVERY.md](./DELIVERY.md) for architecture and manual verification steps. The shared formatters are in `lib/format.js` (`etb`, `when`, `relative`).

## Important limitations
This is a coursework demonstration. Courier/destination coordinates are sample locations in Addis Ababa, not actual GPS. Orders are held in an in-memory store, so data is not durable across restarts and will not synchronize across separate hosting instances. For production, use a persistent database, trusted geocoding, real courier location updates, and a shared event transport. Run `npm install` and `npm run build` locally to verify this project in your environment; no successful build is claimed here.
