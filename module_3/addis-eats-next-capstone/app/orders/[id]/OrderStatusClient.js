"use client";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

export default function OrderStatusClient({ orderId, fallbackData }) {
  const { data, error, isLoading } = useSWR(`/api/orders/${encodeURIComponent(orderId)}`, fetcher, {
    fallbackData: { data: fallbackData },
    refreshInterval: 5000,
    revalidateOnFocus: true,
    keepPreviousData: true,
  });
  const order = data?.data;
  if (error && !order) return <p role="alert">Unable to load order status: {error.message}</p>;
  if (isLoading && !order) return <p>Loading order status…</p>;
  return <div className="status-panel"><p><strong>Order:</strong> {order?.id ?? orderId}</p><p><strong>Status:</strong> <span className="status-pill">{order?.status ?? "Unknown"}</span></p><p className="muted">Last checked automatically every five seconds. {error ? `Refresh failed: ${error.message}` : ""}</p></div>;
}
