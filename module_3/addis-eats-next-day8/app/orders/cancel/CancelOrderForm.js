"use client";
import { useActionState } from "react";
import { cancelOrder } from "../../checkout/actions";
const initialState = { status: "idle", message: "" };
export default function CancelOrderForm() {
  const [state, action, pending] = useActionState(cancelOrder, initialState);
  return <form className="checkout-form" action={action}>
    <label htmlFor="orderId">Order ID</label>
    <input id="orderId" name="orderId" required />
    <button className="secondary-button" disabled={pending}>{pending ? "Checking…" : "Cancel my order"}</button>
    {state.message && <p role="alert" className={state.status === "error" ? "form-error" : "muted"}>{state.message}</p>}
  </form>;
}
