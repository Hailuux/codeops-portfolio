# ADDIS EATS — Next.js

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Test routes
- `/` — Home
- `/menu` — Menu (brief delay demonstrates `loading.js`)
- `/menu/1` — Dynamic dish details
- `/cart` — Cart
- `/checkout` — Demo checkout
- `/menu?error=1` — Deliberately triggers the menu error boundary
- `/menu/999` — Calls `notFound()` for an unknown dish
- `/this-page-does-not-exist` — Custom not-found page

## Production test
```bash
npm run build
npm run start
```

Internal navigation uses `next/link`. Menu components are colocated in `app/menu/` and do not create routes unless they are `page.js` files. Cart uses browser localStorage. Checkout is a demo and does not process payments or save orders to a backend.
