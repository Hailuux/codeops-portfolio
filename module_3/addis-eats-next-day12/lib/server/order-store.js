// Educational in-memory store. Replace with a durable database before deployment.
const orders = globalThis.__addisEatsOrders ?? new Map();
if (!globalThis.__addisEatsOrders) globalThis.__addisEatsOrders = orders;

export function createOrder(order) {
  const id = crypto.randomUUID();
  const record = { id, status: "placed", createdAt: new Date().toISOString(), ...order };
  orders.set(id, record);
  return record;
}

export function findOrder(id) {
  return orders.get(String(id)) ?? null;
}

export function cancelOwnedOrder(id, ownerId) {
  const order = findOrder(id);
  if (!order || order.ownerId !== ownerId) return null;
  const updated = { ...order, status: "cancelled", cancelledAt: new Date().toISOString() };
  orders.set(String(id), updated);
  return updated;
}

export function findOwnedOrder(id, ownerId) {
  const order = findOrder(id);
  return order && order.ownerId === ownerId ? order : null;
}

export function listOrders() {
  return Array.from(orders.values());
}
