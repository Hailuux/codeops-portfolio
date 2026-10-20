"use client";

export default function AddToCartButton({ dish }) {
  function addToCart() {
    try {
      const existing = JSON.parse(localStorage.getItem("addis-eats-cart") || "[]");
      const found = existing.find(item => item.id === dish.id);
      const updated = found
        ? existing.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...existing, { ...dish, quantity: 1 }];
      localStorage.setItem("addis-eats-cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));
      alert(`${dish.name} added to cart.`);
    } catch {
      alert("Unable to update your cart. Please try again.");
    }
  }
  return <button type="button" className="primary-button" onClick={addToCart}>Add to Cart</button>;
}
