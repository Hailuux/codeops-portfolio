import { NextResponse } from "next/server";
import { findOrder } from "../../../../lib/server/order-store";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const order = findOrder(id);
    if (!order) return NextResponse.json({ error: { code: "NOT_FOUND", message: "Order not found." } }, { status: 404 });
    return NextResponse.json({ data: { id: order.id, status: order.status, createdAt: order.createdAt } }, { status: 200 });
  } catch {
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load order status." } }, { status: 500 });
  }
}
