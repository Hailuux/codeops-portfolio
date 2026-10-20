# ADDIS EATS — Next.js Day 4

Day 4 adds Route Handler APIs, shared order validation, a Server Action checkout, cache revalidation, and an ownership-checked cancellation action. It preserves the Day 3 component-boundary structure.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
```

Set `SESSION_SECRET` in `.env.local` to a long random secret (at least 32 characters). Keep `.env.local` private; it is ignored by Git. Never use a `NEXT_PUBLIC_` prefix for secrets.

```bash
npm run dev
```

Open `http://localhost:3000`.

## API endpoints

- `GET /api/dishes` — `200` with `{ "data": [...] }`.
- `GET /api/dishes/1` — `200` with `{ "data": {...} }`; unknown IDs return `404` and `{ "error": { "code": "NOT_FOUND", "message": "Dish not found." } }`.
- `POST /api/orders` — JSON body `{ "name": "...", "email": "...", "address": "...", "items": [{ "id": "1", "quantity": 2 }] }`. Returns `201` on success; invalid form fields/items return `422` with `fieldErrors`. Malformed JSON returns `400`.

Example test:

```bash
curl -i http://localhost:3000/api/dishes
curl -i http://localhost:3000/api/dishes/999
curl -i -X POST http://localhost:3000/api/orders \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ab","email":"ab@example.com","address":"Bole, Addis Ababa","items":[{"id":"1","quantity":2}]}'
```

## Server Action checkout

The checkout form calls `placeOrder` directly as a Server Action. `useActionState` returns validation state and pending status; no browser `fetch` is used for checkout. Prices are looked up from server-side dish data, not trusted from the browser. After a successful write, `revalidatePath` refreshes the menu/cart/checkout paths and the action redirects to the confirmation page.

## Cancellation security

`cancelOrder` fails closed unless a valid signed `session` cookie is present. The cookie value must be `<userId>.<hex HMAC-SHA256(userId, SESSION_SECRET)>`; the authentication system must issue it as `HttpOnly`, `Secure` in production, `SameSite=Lax`, and `Path=/`. The action checks the verified session and then checks `order.ownerId === session.userId` before changing the order. Hiding a cancel button is not an authorization check.

This repository intentionally does not provide a login/session-issuing flow. Connect the helper to your real authentication provider before production use. Orders are kept in an in-memory Map for this exercise; they disappear when the server process restarts and are not suitable for production. Use a durable database with atomic ownership checks in a deployed application.

## Security notes

- `.env.local` is covered by `.gitignore`; `.env.example` contains only a placeholder.
- Do not place server secrets in client components or `NEXT_PUBLIC_*` variables.
- Both the API route and Server Action validate the submitted form and recompute prices/total on the server.
- This is an educational demo, not a production order system. Add database transactions, rate limiting, CSRF/origin protections appropriate to your deployment, monitoring, and a real authenticated session before launch.
