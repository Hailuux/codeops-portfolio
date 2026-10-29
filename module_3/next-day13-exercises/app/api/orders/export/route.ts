import { NextResponse } from 'next/server';
import { orders } from '@/lib/orders';
import { ordersToCsv } from '@/lib/csv';
export async function GET() {
  const sample = [...orders, { id: 'AE-CSV-1', customer: 'Tesfaye, Hana', neighbourhood: 'Bole', date: '2026-10-26', total: 1234, status: 'Delivered' as const }, { id: 'AE-CSV-2', customer: 'Abebe "Buna" Kebede', neighbourhood: 'Piassa', date: '2026-10-26', total: 875, status: 'Preparing' as const }];
  const csv = '\uFEFF' + ordersToCsv(sample);
  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="addis-eats-orders.csv"', 'Cache-Control': 'no-store' } });
}
