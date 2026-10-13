import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

export default function CartPanel() {
  const location = useLocation();

  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const testError = new URLSearchParams(location.search).get("testCartError");

  if (import.meta.env.DEV && testError === "1") {
    throw new Error("Deliberate cart error for Day 9 testing");
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  return (
    <section className="cart-panel" aria-labelledby="cart-heading">
      <h2 id="cart-heading">Your cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{Number(item.price).toFixed(2)} ETB</p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p className="cart-total">
            <strong>Total: {total.toFixed(2)} ETB</strong>
          </p>

          <div className="cart-actions">
            <button type="button" onClick={clear}>
              Clear cart
            </button>

            <Link to="/checkout">Proceed to checkout</Link>
          </div>
        </>
      )}
    </section>
  );
}