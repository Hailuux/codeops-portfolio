import CancelOrderForm from "./CancelOrderForm";
export const dynamic = "force-dynamic";
export const metadata = { title: 'Cancel Order', description: 'Review order cancellation options for an order you own in ADDIS EATS.' };

export default function CancelOrderPage() {
  return <section className="checkout-panel"><h1>Cancel an order</h1><p className="muted">Cancellation requires a valid signed session and verifies that the order belongs to that session.</p><CancelOrderForm /></section>;
}
