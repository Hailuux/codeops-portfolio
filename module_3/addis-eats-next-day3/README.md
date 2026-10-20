# ADDIS EATS — Next.js Day 3

This version keeps data rendering on the server and limits client JavaScript to the cart provider and interactive leaves. The application retains the menu, dish details, cart, checkout, and not-found behavior from Day 2.

## Requirements and run

- Node.js 20.9 or newer
- npm

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verify behavior

1. Open `/menu`; the menu and dishes render from Server Components.
2. Click **Add to Cart**. The header count should update.
3. Open `/cart`, change a quantity, or remove a dish. The total and header count should update.
4. Open `/menu/1` and add Shiro from its detail page.
5. Open `/checkout`; the server reads the `checkout-session` cookie and the client form uses the shared cart provider. This is a demo and does not process real payments or persist orders to a backend.
6. Open `/menu/999` to verify the not-found route.
7. Review `BOUNDARY.md` for the component-by-component boundary audit.

## First Load JS — before and after

**Important measurement note:** a real before/after number depends on the local production build and the exact Next.js/npm dependency resolution. This project-generation environment did not complete `npm install` for the Day 2 baseline, so no honest numeric baseline or after figure is available here. Do not treat estimates as measured results. Record the numbers from your own builds using the steps below.

| Build | First Load JS for `/menu` (shared + route-specific) |
|---|---:|
| Before (Day 2 project) | Not measured — run the baseline command below |
| After (Day 3 project) | Not measured — run the Day 3 command below |
| Difference | Calculate after recording both values |

### How to record comparable figures

1. Extract the Day 2 ZIP into a separate folder and run `npm install` then `npm run build`.
2. In the build output, find the `/menu` row and copy the **First Load JS** value into the **Before** row above.
3. Run the same commands in this Day 3 folder and copy `/menu`'s **First Load JS** into the **After** row.
4. Calculate `Before − After` for the reduction in KB. Use the same Node/npm environment for both builds.

```bash
npm install
npm run build
```

The build output lists route size and First Load JS. Keep the actual build output with your submission if you need evidence. A smaller number is expected because the menu and dish list no longer ship as client-rendered code, and cart interaction is isolated into client components; the measured result is authoritative.

## Key Day 3 decisions

- `app/layout.js` remains a Server Component and wraps the tree in the small client `Providers` boundary.
- Cart state and browser storage live in `components/cart/CartContext.js`.
- Menu and dish detail pages are server-rendered; data access is awaited by server components, not fetched with client hooks.
- `AddToCartButton`, `CartCount`, `SidebarControls`, and checkout/cart interactions are client leaves.
- `MenuShell` is a client shell receiving the server-rendered sidebar and route content through `children`.
- No callback props cross from a Server Component into a Client Component.
