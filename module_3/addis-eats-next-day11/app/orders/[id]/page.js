import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { findOwnedOrder } from "../../../lib/server/order-store";
import { getSession } from "../../../lib/server/session";
import OrderStatusClient from "./OrderStatusClient";

export const dynamic = "force-dynamic";

export const metadata = { title: 'Order Status', description: 'Track the status of your ADDIS EATS order. Sign in to view orders associated with your account.' };

export default async function OrderStatusPage({ params }) {
  const session = await getSession();
  if (!session) redirect(`/signin?next=${encodeURIComponent("/orders")}`);
  const { id } = await params;
  const order = findOwnedOrder(id, session.userId);
  if (!order) notFound();
  const fallbackData = { id: order.id, status: order.status, createdAt: order.createdAt };
  return <section><p className="eyebrow">Order tracking</p><h1>Order status</h1><p>The initial status is rendered on the server; the browser refreshes it every five seconds.</p><OrderStatusClient orderId={id} fallbackData={fallbackData} /><p><Link href={`/orders/${id}/tracking`} className="primary-link">Track delivery on map</Link></p><p><Link href="/menu" className="secondary-link">Back to menu</Link></p></section>;
}
