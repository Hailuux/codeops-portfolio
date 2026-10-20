# Rendering strategy — Day 5

The symbols below are the expected Next.js 15 `next build` markers. The actual marker printed by the installed Next.js version is authoritative; copy it into this table after running the build.

| Route | Expected build marker | Strategy | Reason |
|---|---|---|---|
| `/` | `○` | Static | Server-rendered landing page has no request-specific reads. |
| `/menu` | `◐` | Incremental Static Regeneration (ISR), 60 seconds | `export const revalidate = 60`; the page does not read cookies, headers, or search params. |
| `/menu/[id]` | `○` | Build-time static generation | `generateStaticParams()` returns every known dish ID. Unknown IDs use `notFound()`. |
| `/cart` | `○` shell + client state | Static route shell | Cart is read from browser local storage in a client component; user-specific cart data is not rendered on the server. |
| `/checkout` | `ƒ` | Dynamic per request | `cookies()` reads request-specific checkout state. |
| `/checkout/confirmation` | `○` shell | Static route shell | Confirmation page is a presentation route; order identity/data must not be trusted from client input. |
| `/orders/cancel` | `○` shell + client form | Static route shell | The server action performs authorization; hiding or showing the form is not an authorization boundary. |
| `/api/dishes` | `ƒ` | Route Handler | Next.js 15 does not cache GET Route Handlers by default. |
| `/api/dishes/[id]` | `ƒ` | Route Handler | ID is resolved at request time and unknown IDs return a 404. |
| `/api/orders` | `ƒ` | POST Route Handler | Each request is validated and writes an order. |

If your `next build` output uses a different marker, update the “Expected build marker” column to match the output exactly and explain the reason here. Do not label a route static just because its page component is a Server Component.
