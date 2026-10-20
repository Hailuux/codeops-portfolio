# Day 4 checklist

- [x] `GET /api/dishes` and `GET /api/dishes/[id]`, with consistent JSON error shape and real 404 for unknown IDs.
- [x] `POST /api/orders`: shared schema validation; `201` on success; `422` with `fieldErrors` on validation failure.
- [x] Checkout uses `placeOrder` Server Action rather than `fetch`; `useActionState` drives pending and error state.
- [x] Successful action calls `revalidatePath`.
- [x] `cancelOrder` validates a signed session and checks record ownership before cancellation.
- [x] `.env.local` is ignored; secret is server-only and not prefixed with `NEXT_PUBLIC_`.

The order store is in-memory by design for this learning exercise; see README before deploying.
