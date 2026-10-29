"use client";

import { useCart } from "../../components/cart/CartContext";

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart();
  return (
    <button type="button" className="primary-button" onClick={() => addItem(dish)}>
      Add to Cart
    </button>
  );
}
