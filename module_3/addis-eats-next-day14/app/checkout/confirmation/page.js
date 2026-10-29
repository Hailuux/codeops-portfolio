import Link from "next/link";
import { findOrder } from "../../../lib/server/order-store";

export const dynamic = "force-dynamic";

export const metadata = { title: 'Order Confirmation', description: 'Review the result of your ADDIS EATS checkout and return to your menu.' };

export default async function OrderConfirmationPage({ searchParams }) {
  const { id } = await searchParams;
  const order = id ? findOrder(id) : null;
  return (
    <section className="success-panel">
      <p className="eyebrow">ADDIS EATS</p>
      <h1>Order submitted</h1>
      {order ? <><p>Order reference: <strong>{order.id}</strong></p><p>Total: <strong>{order.total} ETB</strong></p><p>Status: {order.status}</p></> : <p>Your order was submitted. The demo store may reset when the server restarts.</p>}
      <Link href="/menu" className="primary-link">Return to menu</Link>
    </section>
  );
}
