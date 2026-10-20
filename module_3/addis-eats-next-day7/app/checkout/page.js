import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import { getSession } from "../../lib/server/session";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=%2Fcheckout");
  return <section className="checkout-panel"><h1>Checkout</h1><p className="muted">Signed in as {session.userId}. Checkout is rendered per request and verifies the session here.</p><CheckoutForm sessionPresent /></section>;
}
