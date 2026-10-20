"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "../../lib/order-schema";
import { findDish } from "../../lib/server/dishes";
import { cancelOwnedOrder, createOrder } from "../../lib/server/order-store";
import { getVerifiedSession } from "../../lib/server/session";

export async function placeOrder(_previousState, formData) {
  const validation = orderSchema.validate({
    name: formData.get("name"),
    email: formData.get("email"),
    address: formData.get("address"),
  });
  let items;
  try {
    items = JSON.parse(String(formData.get("items") || "[]"));
  } catch {
    return { status: "error", message: "The cart data is invalid.", fieldErrors: { items: ["Please return to your cart and try again."] } };
  }
  if (!validation.success) return { status: "error", message: "Please correct the highlighted fields.", fieldErrors: validation.fieldErrors };
  if (!Array.isArray(items) || items.length === 0) return { status: "error", message: "Your cart is empty.", fieldErrors: { items: ["Add at least one dish before placing an order."] } };

  const trustedItems = [];
  for (const item of items) {
    const dish = findDish(item?.id);
    const quantity = Number(item?.quantity);
    if (!dish || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return { status: "error", message: "Your cart contains an invalid item.", fieldErrors: { items: ["Review your cart and try again."] } };
    }
    trustedItems.push({ id: dish.id, name: dish.name, price: dish.price, quantity });
  }
  const session = await getVerifiedSession();
  const order = createOrder({ ...validation.data, items: trustedItems, total: trustedItems.reduce((sum, item) => sum + item.price * item.quantity, 0), ownerId: session?.userId ?? null });
  revalidatePath("/menu");
  revalidatePath("/cart");
  revalidatePath("/checkout");
  return { status: "success", message: "Order placed successfully.", orderId: order.id };
}

export async function cancelOrder(_previousState, formData) {
  const orderId = String(formData.get("orderId") || "");
  const session = await getVerifiedSession();
  if (!session) return { status: "error", message: "Sign in with a valid session before cancelling an order." };
  const order = cancelOwnedOrder(orderId, session.userId);
  if (!order) return { status: "error", message: "Order not found or you are not authorised to cancel it." };
  revalidatePath("/orders");
  revalidatePath(`/orders/${orderId}`);
  return { status: "success", message: `Order ${orderId} was cancelled.` };
}
