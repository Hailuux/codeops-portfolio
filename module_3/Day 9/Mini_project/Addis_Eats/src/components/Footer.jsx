
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

function Footer() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);

  const cartTotal = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + (Number(item.price) || 0),
      0
    )
  );

  const formattedTotal = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(cartTotal);

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <section className="footer-section">
          <h2>ADDIS EATS</h2>
          <p>
            Discover and enjoy Ethiopian dishes, traditional sides, and
            refreshing beverages.
          </p>
        </section>

        <section className="footer-section">
          <h2>Your Cart</h2>

          {items.length === 0 ? (
            <p className="muted">Your cart is currently empty.</p>
          ) : (
            <>
              <ul>
                {items.map((item) => (
                  <li className="footer-cart-item" key={item.id}>
                    <span>
                      {item.name} —{" "}
                      {new Intl.NumberFormat("en-ET", {
                        style: "currency",
                        currency: "ETB",
                        maximumFractionDigits: 2,
                      }).format(Number(item.price) || 0)}
                    </span>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <p>
                <strong>Total: {formattedTotal}</strong>
              </p>

              <Link to="/checkout">Proceed to checkout</Link>
            </>
          )}
        </section>

        <section className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: info@addiseats.example</p>
          <p>Location: Addis Ababa, Ethiopia</p>
        </section>
      </div>

      <p className="muted">
        © {new Date().getFullYear()} ADDIS EATS. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
