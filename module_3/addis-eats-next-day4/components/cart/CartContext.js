"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "addis-eats-cart";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  const readCart = useCallback(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      setItems(Array.isArray(stored) ? stored : []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    readCart();
    setReady(true);
    const sync = () => readCart();
    window.addEventListener("cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, [readCart]);

  const save = useCallback((nextItems) => {
    setItems(nextItems);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      // Keep in-memory state usable if storage is unavailable.
    }
  }, []);

  const addItem = useCallback((dish) => {
    const existing = items.find((item) => item.id === dish.id);
    const next = existing
      ? items.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { ...dish, quantity: 1 }];
    save(next);
  }, [items, save]);

  const removeItem = useCallback((id) => save(items.filter((item) => item.id !== id)), [items, save]);
  const updateQuantity = useCallback((id, quantity) => save(items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, Number(quantity) || 1) } : item)), [items, save]);
  const clearCart = useCallback(() => save([]), [save]);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(() => ({ items, ready, total, addItem, removeItem, updateQuantity, clearCart }), [items, ready, total, addItem, removeItem, updateQuantity, clearCart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside Providers/CartProvider.");
  return context;
}
