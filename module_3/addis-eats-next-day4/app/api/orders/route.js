import { NextResponse } from "next/server";
import { orderSchema } from "../../../lib/order-schema";
import { findDish } from "../../../lib/server/dishes";
import { createOrder } from "../../../lib/server/order-store";
import { getVerifiedSession } from "../../../lib/server/session";

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = orderSchema.validate(body);
    if (!validation.success) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Please correct the highlighted fields." }, fieldErrors: validation.fieldErrors }, { status: 422 });
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Your order must contain at least one dish." }, fieldErrors: { items: ["Add at least one dish."] } }, { status: 422 });
    }
    const orderItems = [];
    for (const item of body.items) {
      const dish = findDish(item?.id);
      const quantity = Number(item?.quantity);
      if (!dish || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "One or more order items are invalid." }, fieldErrors: { items: ["Choose valid dishes and quantities from 1 to 99."] } }, { status: 422 });
      }
      orderItems.push({ id: dish.id, name: dish.name, price: dish.price, quantity });
    }
    const session = await getVerifiedSession();
    const order = createOrder({ ...validation.data, items: orderItems, total: orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0), ownerId: session?.userId ?? null });
    return NextResponse.json({ data: { id: order.id, status: order.status, total: order.total } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: { code: "BAD_REQUEST", message: "Request body must be valid JSON and contain a valid order." } }, { status: 400 });
  }
}
