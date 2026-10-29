import { getSession } from "../../../../lib/server/session";
import { listOrders } from "../../../../lib/server/order-store";
import { etb, when } from "../../../../lib/format";

function csvCell(value) {
  // CSV RFC-style quoting: double embedded quotes and wrap cells containing commas, quotes, CR or LF.
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: { code: "UNAUTHENTICATED", message: "Sign in required." } }, { status: 401 });
  const rows = listOrders().filter((order) => order.ownerId === session.userId);
  const headers = ["Order ID", "Status", "Created at", "Total (ETB)", "Delivery address", "Items"];
  const lines = [headers, ...rows.map((order) => [order.id, order.status, when(order.createdAt), etb(order.total), order.address, (order.items || []).map((item) => `${item.quantity} x ${item.name}`).join("; ")])];
  const csv = "\uFEFF" + lines.map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="addis-eats-order-history.csv"', "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
}
