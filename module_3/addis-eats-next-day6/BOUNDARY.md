# Component boundary map — Day 5

| Component / module | Runs on | Justification |
|---|---|---|
| `app/layout.js` | Server | Owns `<html>` and `<body>`, global CSS, shared chrome. |
| `app/page.js` | Server | Static landing content and `next/link`; no browser APIs. |
| `components/Header.js` | Server | Navigation is rendered with `next/link`; cart count is a separate client leaf. |
| `components/Footer.js` | Server | Static footer links and text. |
| `components/Providers.js` | Client | Provides cart context to descendants that need browser state. |
| `components/cart/CartContext.js` | Client | Uses React context and browser local storage for cart persistence. |
| `components/cart/CartCount.js` | Client | Reads cart state and updates the displayed count. |
| `app/menu/layout.js` | Server | Persistent menu layout; composes server content and sidebar. |
| `app/menu/page.js` | Server | Async-capable route with ISR and a Suspense boundary. |
| `app/menu/DishList.js` | Server | Loads menu data on the server and renders the list. |
| `app/menu/DishCard.js` | Server | Renders dish data and links; no interactive browser state. |
| `app/menu/AddToCartButton.js` | Client | Small interactive leaf that changes cart state. |
| `app/menu/CategoryBar.js` | Client | Handles interactive category selection. |
| `app/menu/MenuShell.js` | Client | Client shell receives server-rendered menu content through `children`. |
| `app/menu/MenuSidebar.js` | Server | Renders menu sidebar structure and links. |
| `app/menu/SidebarControls.js` | Client | Owns the sidebar's local interactive state. |
| `app/menu/[id]/page.js` | Server | Generates known dish paths and reads `params`; no fetching hooks. |
| `app/menu/data.js` | Server-safe module | Reads dish data for server-rendered pages. |
| `app/menu/dishes.js` | Shared static data | Contains menu data only; no secret or browser-only APIs. |
| `app/menu/loading.js` | Server special file | Segment loading fallback. |
| `app/menu/error.js` | Client (required by Next.js) | Error boundary must be a client component to use reset behavior. |
| `app/cart/page.js` | Client | Reads and changes browser-persisted cart state. |
| `app/checkout/page.js` | Server | Reads request cookies and is therefore dynamic. |
| `app/checkout/CheckoutForm.js` | Client | Handles form input and `useActionState` pending/validation UI. |
| `app/checkout/actions.js` | Server Action | Validates submitted fields, resolves trusted prices, writes order, and revalidates paths. |
| `app/checkout/confirmation/page.js` | Server | Static presentation route. |
| `app/orders/cancel/page.js` | Server | Renders the cancellation form route. |
| `app/orders/cancel/CancelOrderForm.js` | Client | Handles form pending/result state; it does not authorize cancellation. |
| `app/api/dishes/route.js` | Server Route Handler | Returns dish data as JSON. |
| `app/api/dishes/[id]/route.js` | Server Route Handler | Resolves one dish and returns a consistent 404 shape. |
| `app/api/orders/route.js` | Server Route Handler | Validates JSON and recomputes totals on the server. |
| `lib/order-schema.js` | Shared pure module | Validation logic reused by the API and Server Action. |
| `lib/server/dishes.js` | Server-only data module | Resolves trusted dish IDs and prices. |
| `lib/server/order-store.js` | Server-only data module | In-memory demo order persistence and ownership-aware mutation. |
| `lib/server/session.js` | Server-only module | Verifies signed session cookies using a server secret. |
| `app/not-found.js` | Server | Global not-found UI. |
