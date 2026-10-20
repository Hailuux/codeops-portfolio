import { notFound } from "next/navigation";
import Link from "next/link";
import { findOrder } from "../../../lib/server/order-store";
import OrderStatusClient from "./OrderStatusClient";

export const dynamic = "force-dynamic";

export default async function OrderStatusPage({ params }) {
  const { id } = await params;
  const order = findOrder(id);
  if (!order) notFound();
  const fallbackData = { id: order.id, status: order.status, createdAt: order.createdAt };
  return <section><p className="eyebrow">Order tracking</p><h1>Order status</h1><p>The initial status is rendered on the server; the browser refreshes it every five seconds.</p><OrderStatusClient orderId={id} fallbackData={fallbackData} /><p><Link href="/menu" className="secondary-link">Back to menu</Link></p></section>;
}
