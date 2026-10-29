export type Order = { id: string; customer: string; neighbourhood: string; date: string; total: number; status: 'Delivered' | 'Preparing' | 'Cancelled' };

// Sample records for the exercise. Replace this module with a database query in a real app.
export const orders: Order[] = [
  { id: 'AE-1041', customer: 'Mimi Bekele', neighbourhood: 'Bole', date: '2026-10-20', total: 1250, status: 'Delivered' },
  { id: 'AE-1042', customer: 'Dawit Alemu', neighbourhood: 'Kazanchis', date: '2026-10-20', total: 850, status: 'Preparing' },
  { id: 'AE-1043', customer: 'Sara Tadesse', neighbourhood: 'Piassa', date: '2026-10-21', total: 1720, status: 'Delivered' },
  { id: 'AE-1044', customer: 'Nahom Girma', neighbourhood: 'Bole', date: '2026-10-21', total: 990, status: 'Delivered' },
  { id: 'AE-1045', customer: 'Hana Tesfaye', neighbourhood: 'Megenagna', date: '2026-10-22', total: 2130, status: 'Preparing' },
  { id: 'AE-1046', customer: 'Yonas Kebede', neighbourhood: 'Kazanchis', date: '2026-10-22', total: 670, status: 'Delivered' },
  { id: 'AE-1047', customer: 'Liya Worku', neighbourhood: 'Piassa', date: '2026-10-23', total: 1450, status: 'Cancelled' },
  { id: 'AE-1048', customer: 'Abel Fikru', neighbourhood: 'Bole', date: '2026-10-23', total: 1860, status: 'Delivered' },
  { id: 'AE-1049', customer: 'Martha Solomon', neighbourhood: 'Megenagna', date: '2026-10-24', total: 1120, status: 'Delivered' },
  { id: 'AE-1050', customer: 'Biruk Hailu', neighbourhood: 'Kazanchis', date: '2026-10-24', total: 940, status: 'Preparing' },
  { id: 'AE-1051', customer: 'Eden Daniel', neighbourhood: 'Piassa', date: '2026-10-25', total: 760, status: 'Delivered' },
  { id: 'AE-1052', customer: 'Samuel Kassa', neighbourhood: 'Bole', date: '2026-10-25', total: 1580, status: 'Delivered' }
];

export function aggregateRevenueByNeighbourhood(rows: Order[]) {
  const totals = new Map<string, number>();
  for (const order of rows) if (order.status !== 'Cancelled') totals.set(order.neighbourhood, (totals.get(order.neighbourhood) ?? 0) + order.total);
  return [...totals.entries()].map(([neighbourhood, revenue]) => ({ neighbourhood, revenue })).sort((a,b) => a.neighbourhood.localeCompare(b.neighbourhood));
}

export function aggregateOrdersByDay(rows: Order[]) {
  const counts = new Map<string, number>();
  for (const order of rows) if (order.status !== 'Cancelled') counts.set(order.date, (counts.get(order.date) ?? 0) + 1);
  return [...counts.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([date, orders]) => ({ date, orders }));
}
