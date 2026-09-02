export const totalByType = (txns, type) =>
  txns
    .filter(t => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);


// Build formatted receipt strings
export const formatReceipts = txns =>
  txns.map(({ customer, amount }) =>
    `${customer}: ${amount} ETB`
  );