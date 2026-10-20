"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../components/cart/CartContext";

export default function CheckoutForm({ sessionPresent }) {
  const { items, total, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!items.length) { alert("Your cart is empty."); return; }
    setSubmitted(true);
    clearCart();
  }
  if (submitted) return <div className="success-panel"><h2>Thank you, {form.name}!</h2><p>Your demo checkout is complete.</p><Link href="/menu" className="primary-link">Return to menu</Link></div>;
  return (
    <>
      <p>Order total: <strong>{total} ETB</strong></p>
      {sessionPresent && <p className="muted">Checkout session cookie detected.</p>}
      {items.length === 0 && <p>Your cart is empty. Add dishes before placing a demo order.</p>}
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label><input id="name" name="name" value={form.name} onChange={handleChange} required />
        <label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <label htmlFor="address">Delivery address</label><textarea id="address" name="address" value={form.address} onChange={handleChange} required />
        <button className="primary-button" type="submit">Place Demo Order</button>
      </form>
      <p>Need to change your items? <Link href="/cart">Return to cart</Link>.</p>
    </>
  );
}
