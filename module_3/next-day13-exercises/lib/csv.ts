import type { Order } from './orders';
export function csvCell(value: unknown): string {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
export function ordersToCsv(rows: Order[]): string {
  const headers = ['Order ID', 'Customer', 'Neighbourhood', 'Date', 'Total (ETB)', 'Status'];
  return [headers, ...rows.map(o => [o.id, o.customer, o.neighbourhood, o.date, o.total, o.status])].map(row => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}
