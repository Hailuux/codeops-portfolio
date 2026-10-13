
import { Link, useParams } from "react-router-dom";

export default function Receipt() {
  const { orderId } = useParams();

  return (
    <main className="receipt-page">
      <section className="receipt-card">
        <h1>Order Receipt</h1>

        <p>
          Order reference: <strong>{orderId}</strong>
        </p>

        <p>
          This page is ready to display the details of an order retrieved
          from your backend.
        </p>

        <Link to="/menu">Return to menu</Link>
      </section>
    </main>
  );
}
