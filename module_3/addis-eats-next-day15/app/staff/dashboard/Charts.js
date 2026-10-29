"use client";

function money(value) {
  return new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 0 }).format(value);
}

export function RevenueByNeighbourhood({ rows }) {
  const max = Math.max(1, ...rows.map((row) => row.revenue));
  return <section className="analytics-panel" aria-labelledby="revenue-heading">
    <h2 id="revenue-heading">Revenue by neighbourhood</h2><p className="chart-unit">Unit: Ethiopian birr (ETB)</p>
    <div className="chart-fixed-height" role="img" aria-label={`Bar chart of revenue by neighbourhood. ${rows.map((r) => `${r.neighbourhood}: ${money(r.revenue)}`).join("; ")}`}>
      {rows.length ? rows.map((row) => <div className="bar-row" key={row.neighbourhood}><span className="bar-label">{row.neighbourhood}</span><div className="bar-track"><div className="bar-fill" style={{ width: `${Math.max(1, row.revenue / max * 100)}%` }} /></div><strong>{money(row.revenue)}</strong></div>) : <p>No revenue data yet.</p>}
    </div>
    <table className="analytics-table"><caption>Revenue by neighbourhood (ETB)</caption><thead><tr><th scope="col">Neighbourhood</th><th scope="col">Orders</th><th scope="col">Revenue (ETB)</th></tr></thead><tbody>{rows.map((r) => <tr key={r.neighbourhood}><th scope="row">{r.neighbourhood}</th><td>{r.orders}</td><td>{money(r.revenue)}</td></tr>)}</tbody></table>
  </section>;
}

export function OrdersOverTime({ rows }) {
  const width = 640, height = 220, pad = 36;
  const max = Math.max(1, ...rows.map((r) => r.orders));
  const points = rows.map((r, i) => ({ ...r, x: rows.length <= 1 ? width / 2 : pad + i * (width - 2 * pad) / (rows.length - 1), y: height - pad - r.orders / max * (height - 2 * pad) }));
  const path = points.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  return <section className="analytics-panel" aria-labelledby="orders-heading">
    <h2 id="orders-heading">Orders over time</h2><p className="chart-unit">Unit: number of orders</p>
    <div className="chart-fixed-height"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Line chart showing order counts. ${rows.map((r) => `${r.date}: ${r.orders} orders`).join("; ")}`} className="line-chart"><line x1={pad} y1={height-pad} x2={width-pad} y2={height-pad} stroke="currentColor" strokeWidth="1"/><path d={path} fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="9 4"/>{points.map((p) => <g key={p.date}><circle cx={p.x} cy={p.y} r="5" fill="white" stroke="currentColor" strokeWidth="3"/><text x={p.x} y={p.y-12} textAnchor="middle" fontSize="12">{p.orders}</text><text x={p.x} y={height-10} textAnchor="middle" fontSize="11">{p.date.slice(5)}</text></g>)}</svg></div>
    <table className="analytics-table"><caption>Orders over time</caption><thead><tr><th scope="col">Date</th><th scope="col">Orders</th><th scope="col">Revenue (ETB)</th></tr></thead><tbody>{rows.map((r) => <tr key={r.date}><th scope="row">{r.date}</th><td>{r.orders}</td><td>{money(r.revenue)}</td></tr>)}</tbody></table>
  </section>;
}
