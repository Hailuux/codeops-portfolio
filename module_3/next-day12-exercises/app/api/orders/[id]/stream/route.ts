export const dynamic = 'force-dynamic';
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const encoder = new TextEncoder();
  let step = 0;
  let timer: ReturnType<typeof setInterval> | undefined;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (status: string) => controller.enqueue(encoder.encode(`event: order-status\ndata: ${JSON.stringify({ id, status, updatedAt: new Date().toISOString() })}\n\n`));
      send('Preparing');
      timer = setInterval(() => {
        step += 1;
        if (step === 1) send('Picked up');
        else { send('Delivered'); if (timer) clearInterval(timer); controller.close(); }
      }, 4000);
    },
    cancel() { if (timer) clearInterval(timer); }
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache, no-transform', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' } });
}
