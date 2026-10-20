"use client";

import { useEffect, useState } from "react";
import { when, relative } from "../../../../lib/format";

export default function TrackingLiveStatus({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [connection, setConnection] = useState("Connecting to live updates…");
  useEffect(() => {
    const source = new EventSource(`/api/orders/${encodeURIComponent(orderId)}/stream`);
    source.onopen = () => setConnection("Live updates connected");
    source.onmessage = (event) => {
      try {
        const next = JSON.parse(event.data);
        setStatus((previous) => ({ ...previous, ...next }));
        setConnection("Live updates connected");
      } catch {
        setConnection("Received an unreadable update");
      }
    };
    source.onerror = () => setConnection("Connection interrupted; retrying automatically");
    return () => source.close();
  }, [orderId]);
  return <section className="status-panel" aria-live="polite">
    <p><strong>Current status:</strong> <span className="status-pill">{status.status}</span></p>
    <p><strong>Last updated:</strong> {when(status.updatedAt || status.createdAt)} ({relative(status.updatedAt || status.createdAt)})</p>
    <p className="muted" role="status">{connection}</p>
  </section>;
}
