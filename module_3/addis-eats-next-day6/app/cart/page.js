"use client";

import Link from "next/link";
import { useCart } from "../../components/cart/CartContext";

export default function CartPage() {
  const { items, ready, total, removeItem, updateQuantity } = useCart();
  if (!ready) return <section><h1>Your Cart</h1><p>Loading cart…</p></section>;
  return (
    <section>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <><p>Your cart is empty.</p><Link href="/menu" className="primary-link">Browse the menu</Link></>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div><h2>{item.name}</h2><p>{item.price} ETB each</p></div>
                <label>Quantity
                  <input type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, event.target.value)} />
                </label>
                <p>{item.price * item.quantity} ETB</p>
                <button className="secondary-button" type="button" onClick={() => removeItem(item.id)}>Remove</button>
              </article>
            ))}
          </div>
          <h2>Total: {total} ETB</h2>
          <Link href="/checkout" className="primary-link">Proceed to Checkout</Link>
        </>
      )}
    </section>
  );
}
