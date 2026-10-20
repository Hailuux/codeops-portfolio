"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/cart/CartContext";
import { placeOrder } from "./actions";

const initialState = { status: "idle", message: "", fieldErrors: {} };

export default function CheckoutForm({ sessionPresent }) {
  const { items, total, clearCart, ready } = useCart();
  const router = useRouter();
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const serializedItems = useMemo(() => JSON.stringify(items.map(({ id, quantity }) => ({ id, quantity }))), [items]);

  useEffect(() => {
    if (state.status === "success" && state.orderId) {
      clearCart();
      router.push(`/checkout/confirmation?id=${encodeURIComponent(state.orderId)}`);
    }
  }, [state.status, state.orderId, clearCart, router]);

  if (!ready) return <p role="status">Loading your cart…</p>;
  return (
    <>
      <p>Order total: <strong>{total} ETB</strong></p>
      {sessionPresent && <p className="muted">Checkout session cookie detected.</p>}
      {state.message && <p role="alert" className={state.status === "error" ? "form-error" : "muted"}>{state.message}</p>}
      {items.length === 0 && <p>Your cart is empty. Add dishes before placing an order.</p>}
      <form className="checkout-form" action={formAction}>
        <input type="hidden" name="items" value={serializedItems} readOnly />
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" autoComplete="name" minLength={2} maxLength={100} required aria-invalid={Boolean(state.fieldErrors?.name)} aria-describedby={state.fieldErrors?.name ? "name-error" : undefined} />
        {state.fieldErrors?.name && <p id="name-error" className="form-error" role="alert">{state.fieldErrors.name[0]}</p>}
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required aria-invalid={Boolean(state.fieldErrors?.email)} aria-describedby={state.fieldErrors?.email ? "email-error" : undefined} />
        {state.fieldErrors?.email && <p id="email-error" className="form-error" role="alert">{state.fieldErrors.email[0]}</p>}
        <label htmlFor="address">Delivery address</label>
        <textarea id="address" name="address" autoComplete="street-address" minLength={5} maxLength={300} required aria-invalid={Boolean(state.fieldErrors?.address)} aria-describedby={state.fieldErrors?.address ? "address-error" : undefined} />
        {state.fieldErrors?.address && <p id="address-error" className="form-error" role="alert">{state.fieldErrors.address[0]}</p>}
        {state.fieldErrors?.items && <p className="form-error" role="alert">{state.fieldErrors.items[0]}</p>}
        <button className="primary-button" type="submit" disabled={pending || items.length === 0}>
          {pending ? "Placing order…" : `Place Order · ${total} ETB`}
        </button>
      </form>
      <p>Need to change your items? <Link href="/cart">Return to cart</Link>.</p>
    </>
  );
}
