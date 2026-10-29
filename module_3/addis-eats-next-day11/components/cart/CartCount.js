"use client";

import { useCart } from "./CartContext";

export default function CartCount() {
  const { items, ready } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return <span aria-label={`${count} items in cart`}>{ready ? `(${count})` : ""}</span>;
}
