import { findOwnedOrder } from "../../../../../lib/server/order-store";
import { getSession } from "../../../../../lib/server/session";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) return Response.json({ error: { code: "UNAUTHENTICATED", message: "Sign in required." } }, { status: 401 });
  const { id } = await params;
  const order = findOwnedOrder(id, session.userId);
  if (!order) return Response.json({ error: { code: "NOT_FOUND", message: "Order not found." } }, { status: 404 });

  const encoder = new TextEncoder();
  let interval;
  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        const latest = findOwnedOrder(id, session.userId);
        if (!latest) {
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message: "Order unavailable" })}\n\n`));
          clearInterval(interval);
          controller.close();
          return;
        }
        const payload = { id: latest.id, status: latest.status, createdAt: latest.createdAt, updatedAt: latest.cancelledAt || latest.createdAt };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        if (["cancelled", "delivered"].includes(latest.status)) {
          clearInterval(interval);
          controller.close();
        }
      };
      send();
      interval = setInterval(send, 3000);
    },
    cancel() { clearInterval(interval); },
  });
  request.signal.addEventListener("abort", () => clearInterval(interval), { once: true });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" } });
}
