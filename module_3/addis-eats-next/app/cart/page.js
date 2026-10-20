"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [items, setItems] = useState([]);
  function loadCart() {
    try { setItems(JSON.parse(localStorage.getItem("addis-eats-cart") || "[]")); }
    catch { setItems([]); }
  }
  useEffect(() => {
    loadCart();
    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("storage", loadCart);
    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);
  function removeItem(id) {
    const updated = items.filter(item => item.id !== id);
    localStorage.setItem("addis-eats-cart", JSON.stringify(updated));
    setItems(updated); window.dispatchEvent(new Event("cart-updated"));
  }
  function changeQuantity(id, quantity) {
    const updated = items.map(item => item.id === id ? { ...item, quantity: Number(quantity) } : item).filter(item => item.quantity > 0);
    localStorage.setItem("addis-eats-cart", JSON.stringify(updated));
    setItems(updated); window.dispatchEvent(new Event("cart-updated"));
  }
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <section><h1>Your Cart</h1>
    {items.length === 0 ? <><p>Your cart is empty.</p><Link href="/menu" className="primary-link">Browse the menu</Link></> :
      <><div className="cart-list">{items.map(item => <article className="cart-item" key={item.id}>
        <div><h2>{item.name}</h2><p>{item.price} ETB each</p></div>
        <label>Quantity<input type="number" min="1" value={item.quantity} onChange={event => changeQuantity(item.id, event.target.value)} /></label>
        <p>{item.price * item.quantity} ETB</p>
        <button className="secondary-button" onClick={() => removeItem(item.id)}>Remove</button>
      </article>)}</div><h2>Total: {total} ETB</h2><Link href="/checkout" className="primary-link">Proceed to Checkout</Link></>}
  </section>;
}
