import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "../../../../lib/server/session";
import { findOwnedOrder } from "../../../../lib/server/order-store";
import { etb, when } from "../../../../lib/format";
import TrackingLiveStatus from "./TrackingLiveStatus";
import TrackingMap from "./TrackingMap";

export const dynamic = "force-dynamic";
export const metadata = { title: "Live delivery tracking", description: "Track your ADDIS EATS courier, delivery destination, and live order status." };

export default async function TrackingPage({ params }) {
  const session = await getSession();
  if (!session) redirect(`/signin?next=${encodeURIComponent("/orders")}`);
  const { id } = await params;
  const order = findOwnedOrder(id, session.userId);
  if (!order) notFound();

  // Demo coordinates for Addis Ababa; replace with trusted courier/address geocoding in production.
  const delivery = {
    courier: { lat: 9.0184, lng: 38.7525, label: "Courier · Bole" },
    destination: { lat: 8.9958, lng: 38.7854, label: order.address || "Delivery address (demo location)" },
  };
  const seed = { id: order.id, status: order.status, createdAt: order.createdAt, updatedAt: order.cancelledAt || order.createdAt };
  return <section className="tracking-page">
    <p className="eyebrow">Order #{order.id.slice(0, 8)}</p><h1>Track your delivery</h1>
    <p className="muted">Placed {when(order.createdAt)} · Total {etb(order.total)}</p>
    <TrackingLiveStatus orderId={order.id} initialStatus={seed} />
    <div className="tracking-grid">
      <div><h2>Courier and delivery address</h2><TrackingMap courier={delivery.courier} destination={delivery.destination} />
        <div className="tracking-details"><p><strong>Courier location:</strong> {delivery.courier.label}</p><p><strong>Delivery destination:</strong> {delivery.destination.label}</p><p><strong>Address:</strong> {order.address || "Address not supplied in this demo order"}</p></div>
      </div>
      <aside className="tracking-details"><h2>Order details</h2><p><strong>Status:</strong> {order.status}</p><p><strong>Placed:</strong> {when(order.createdAt)}</p><p><strong>Total:</strong> {etb(order.total)}</p><p className="muted">Map markers use demo coordinates. No real courier GPS is connected.</p><Link href={`/orders/${order.id}`} className="secondary-link">View order status</Link></aside>
    </div>
    <p><Link href="/api/orders/export" className="primary-link">Export my order history (CSV)</Link></p>
  </section>;
}
