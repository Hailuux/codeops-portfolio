import { NextResponse } from "next/server";
import { findOwnedOrder } from "../../../../lib/server/order-store";
import { getSession } from "../../../../lib/server/session";

export async function GET(_request, { params }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: { code: "UNAUTHENTICATED", message: "Sign in required." } }, { status: 401 });
    const { id } = await params;
    const order = findOwnedOrder(id, session.userId);
    if (!order) return NextResponse.json({ error: { code: "NOT_FOUND", message: "Order not found." } }, { status: 404 });
    return NextResponse.json({ data: { id: order.id, status: order.status, createdAt: order.createdAt } }, { status: 200 });
  } catch {
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load order status." } }, { status: 500 });
  }
}
