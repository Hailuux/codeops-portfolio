"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutForm({ sessionPresent }) {
  const [items, setItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem("addis-eats-cart") || "[]"));
    } catch {
      setItems([]);
    }
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!items.length) {
      alert("Your cart is empty.");
      return;
    }
    setSubmitted(true);
    localStorage.removeItem("addis-eats-cart");
    setItems([]);
  }

  if (submitted) {
    return (
      <div className="success-panel">
        <h2>Thank you, {form.name}!</h2>
        <p>Your demo checkout is complete.</p>
        <Link href="/menu" className="primary-link">Return to menu</Link>
      </div>
    );
  }

  return (
    <>
      <p>Order total: <strong>{total} ETB</strong></p>
      {sessionPresent && <p className="muted">Checkout session cookie detected.</p>}
      {items.length === 0 && <p>Your cart is empty. Add dishes before placing a demo order.</p>}
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} required />
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <label htmlFor="address">Delivery address</label>
        <textarea id="address" name="address" value={form.address} onChange={handleChange} required />
        <button className="primary-button" type="submit">Place Demo Order</button>
      </form>
      <p>Need to change your items? <Link href="/cart">Return to cart</Link>.</p>
    </>
  );
}
