# ADDIS EATS — Client/Server Boundary Audit (Day 3)

| Component/file | Runs on | Why this boundary is deliberate |
|---|---|---|
| `app/layout.js` — `RootLayout` | Server Component | Owns `<html>`/`<body>`, metadata, global CSS, and static site chrome; it has no client directive. |
| `components/Providers.js` — `Providers` | Client Component | Creates the isolated client context boundary around the app while accepting server-rendered `children`. |
| `components/cart/CartContext.js` — `CartProvider`, `useCart` | Client Component | Cart state, localStorage synchronization, and cart actions require browser state/events. |
| `components/Header.js` — `Header` | Server Component | Navigation is static and uses `next/link`; only the count is interactive. |
| `components/cart/CartCount.js` — `CartCount` | Client Component | Reads live cart state and updates the count without converting the whole header to client JavaScript. |
| `components/Footer.js` — `Footer` | Server Component | Static links and footer copy need no browser APIs. |
| `app/page.js` — `HomePage` | Server Component | Static landing content and links require no client state. |
| `app/menu/layout.js` — `MenuLayout` | Server Component | Composes sidebar and route content without owning interaction. |
| `app/menu/MenuShell.js` — `MenuShell` | Client Component | Demonstrates a client layout shell receiving server-rendered components through `children`; it has no event handlers itself. |
| `app/menu/MenuSidebar.js` — `MenuSidebar` | Server Component | Sidebar headings and links are static; interaction is delegated to a smaller leaf. |
| `app/menu/SidebarControls.js` — `SidebarControls` | Client Component | Toggle state and counter are the only interactive sidebar behavior. |
| `app/menu/page.js` — `MenuPage` | Async-capable Server Component | Exports ISR configuration and streams the async server-rendered dish list through Suspense. |
| `app/menu/DishList.js` — `DishList` | Async Server Component | Awaits server-side data and maps results; no hooks or client directive. |
| `app/menu/data.js` — `getDishes`, `getDishById` | Server-only module by usage | Data access is imported only by Server Components; it contains no browser APIs or React hooks. |
| `app/menu/dishes.js` — `dishes` | Shared data module, server-used | Static dish records are imported by server data functions and static parameter generation. |
| `app/menu/[id]/page.js` — `DishDetailsPage` | Async Server Component | Resolves `params`, loads a dish, and calls `notFound()` on the server. |
| `app/menu/AddToCartButton.js` — `AddToCartButton` | Client Component | The click handler calls the cart context; it receives serializable dish data, not a callback from a server component. |
| `app/menu/DishCard.js` — `DishCard` | Server Component | Static presentation and links; interactive action is isolated in `AddToCartButton`. |
| `app/menu/CategoryBar.js` — `CategoryBar` | Server Component | Uses links for category navigation; no local state or browser APIs. |
| `app/cart/page.js` — `CartPage` | Client Component | Quantity edits/removal and live totals depend on cart context state. |
| `app/checkout/page.js` — `CheckoutPage` | Async Server Component | Reads request cookies, so it is explicitly request-dynamic; passes only a boolean to the form. |
| `app/checkout/CheckoutForm.js` — `CheckoutForm` | Client Component | Form state, submit handling, and cart clearing require interactivity. |
| `app/menu/loading.js` | Server-rendered route fallback | Static loading UI, no client behavior. |
| `app/menu/error.js` | Client Component (Next.js requirement) | Route error boundary needs a reset handler and therefore must be client-side. |
| `app/not-found.js` | Server Component | Static not-found content and links. |

## Callback-prop check

No Server Component passes a callback prop to a Client Component. Server-to-client props are serializable values (`dish` records, `sessionPresent`, and `children`). Event handlers and cart actions are created and used inside client components/context. `MenuShell` receives `children` as a React slot, which is the supported way to compose server-rendered content inside a client shell.
