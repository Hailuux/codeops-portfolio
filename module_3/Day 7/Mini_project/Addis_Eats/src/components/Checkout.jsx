
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuth } from "./AuthContext";

function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "Bole",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const cartTotal = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + (Number(item.price) || 0),
      0
    )
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 2,
    }).format(Number(price) || 0);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty. Add a dish before placing an order.");
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^(?:\+251|0)9\d{8}$/.test(form.phone.trim())) {
      setError(
        "Enter a valid Ethiopian mobile number, such as 0912345678 or +251912345678."
      );
      return;
    }

    if (!form.address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    // Demo submission only; this does not send an order to a backend.
    clear();
    setSuccess(true);
  }

  if (success) {
    return (
      <section className="content-card">
        <h1>Order Submitted</h1>
        <p className="form-success">
          Your demo order has been submitted successfully.
        </p>
        <p>
          Thank you, {form.name}. Your delivery address is {form.address}.
        </p>
        <p className="muted">
          This demonstration does not create a real order or process a payment.
        </p>
        <button type="button" onClick={() => navigate("/menu")}>
          Return to menu
        </button>
      </section>
    );
  }

  return (
    <section>
      <header className="page-heading">
        <h1>Checkout</h1>
        <p>Review your cart and enter your delivery details.</p>
        {user?.email && (
          <p className="muted">Signed in as {user.email}</p>
        )}
      </header>

      <section className="cart-card">
        <h2>Your Order</h2>

        {items.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <Link to="/menu">Browse the menu</Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)}</p>
                  </div>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name} from your order`}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>

            <p className="cart-summary">
              Total: {formatPrice(cartTotal)}
            </p>
          </>
        )}
      </section>

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <h2>Delivery Details</h2>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-group">
          <label htmlFor="checkout-name">Full name</label>
          <input
            id="checkout-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkout-phone">Phone number</label>
          <input
            id="checkout-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0912345678"
            value={form.phone}
            onChange={handleChange}
            aria-describedby="phone-help"
            required
          />
          <small id="phone-help" className="muted">
            Use 09XXXXXXXX or +2519XXXXXXXX.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="checkout-address">Delivery address</label>
          <select
            id="checkout-address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          >
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Piassa">Piassa</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" disabled={items.length === 0}>
          Place Demo Order
        </button>
      </form>
    </section>
  );
}

export default Checkout;
