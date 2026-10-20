import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  // Reading the request's cookie makes this page request-specific.
  const checkoutSession = (await cookies()).get("checkout-session")?.value ?? null;

  return (
    <section className="checkout-panel">
      <h1>Checkout</h1>
      <p className="muted">
        Checkout is rendered per request because it reads the request cookie.
      </p>
      <CheckoutForm sessionPresent={Boolean(checkoutSession)} />
    </section>
  );
}
