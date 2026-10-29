'use client';
import { useEffect, useState } from 'react';
import { relative, when } from '@/lib/format';
type Status = { id: string; status: string; updatedAt: string };
export default function OrderStatusStream({ orderId, initialStatus, initialUpdatedAt }: { orderId: string; initialStatus: string; initialUpdatedAt: string }) {
  const [data, setData] = useState<Status>({ id: orderId, status: initialStatus, updatedAt: initialUpdatedAt });
  const [connection, setConnection] = useState('Connecting');
  useEffect(() => {
    if (initialStatus === 'Delivered') { setConnection('Closed — delivered'); return; }
    const source = new EventSource(`/api/orders/${encodeURIComponent(orderId)}/stream`);
    setConnection('Connecting');
    source.onopen = () => setConnection('Connected');
    source.addEventListener('order-status', (event) => {
      const next = JSON.parse((event as MessageEvent<string>).data) as Status;
      setData(next);
      if (next.status === 'Delivered') { source.close(); setConnection('Closed — delivered'); }
    });
    source.onerror = () => { if (source.readyState === EventSource.CLOSED) setConnection('Disconnected'); else setConnection('Reconnecting'); };
    return () => source.close();
  }, [orderId, initialStatus]);
  return <section className="panel" aria-labelledby="tracking-title"><h2 id="tracking-title">Live order status</h2><p><strong>Order:</strong> {orderId}</p><p><strong>Status:</strong> {data.status}</p><p><strong>Stream:</strong> <span className="connection" role="status">{connection}</span></p><p><strong>Last update:</strong> {when(data.updatedAt)} ({relative(data.updatedAt)})</p></section>;
}
