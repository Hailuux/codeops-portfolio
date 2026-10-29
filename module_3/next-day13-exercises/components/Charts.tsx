'use client';

import { useId } from 'react';

type RevenueRow = { neighbourhood: string; revenue: number };
type DayRow = { date: string; orders: number };
const etb = (value: number) => new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB', maximumFractionDigits: 0 }).format(value);

export function RevenueChart({ rows }: { rows: RevenueRow[] }) {
  const id = useId();
  const max = Math.max(1, ...rows.map(r => r.revenue));
  const width = 640, height = 260, left = 130, right = 20, top = 20, bottom = 25;
  const plotWidth = width-left-right;
  return <section className="panel" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>Revenue by neighbourhood</h2><p className="unit">Unit: Ethiopian birr (ETB)</p>
    <div className="chart-frame" role="img" aria-label={`Horizontal bar chart of revenue by neighbourhood. ${rows.map(r=>`${r.neighbourhood}: ${etb(r.revenue)}`).join('; ')}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" aria-hidden="true">
        {[0, .25, .5, .75, 1].map(t => <g key={t}><line x1={left+plotWidth*t} y1={top} x2={left+plotWidth*t} y2={height-bottom} className="grid-line"/><text x={left+plotWidth*t} y={height-5} textAnchor="middle" className="axis-label">{Math.round(max*t/1000)}k</text></g>)}
        {rows.map((r,i) => { const y = top + i*46; const w = plotWidth*r.revenue/max; return <g key={r.neighbourhood}><text x={left-10} y={y+19} textAnchor="end" className="axis-label">{r.neighbourhood}</text><rect x={left} y={y} width={w} height="25" className="bar"/><text x={Math.min(left+w+6,width-4)} y={y+17} className="value-label">{etb(r.revenue)}</text></g>; })}
      </svg>
    </div>
    <table className="data-table"><caption>Revenue by neighbourhood — same values as the chart</caption><thead><tr><th scope="col">Neighbourhood</th><th scope="col" className="numeric">Revenue (ETB)</th></tr></thead><tbody>{rows.map(r=><tr key={r.neighbourhood}><th scope="row">{r.neighbourhood}</th><td className="numeric">{etb(r.revenue)}</td></tr>)}</tbody></table>
  </section>;
}

export function OrdersLineChart({ rows }: { rows: DayRow[] }) {
  const id = useId();
  const max = Math.max(1, ...rows.map(r=>r.orders));
  const width=640, height=240, left=45, right=20, top=20, bottom=45;
  const pw=width-left-right, ph=height-top-bottom;
  const points=rows.map((r,i)=>({x:left+(rows.length<=1?pw/2:i*pw/(rows.length-1)), y:top+ph-(r.orders/max)*ph, ...r}));
  const line=points.map(p=>`${p.x},${p.y}`).join(' ');
  return <section className="panel" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>Orders per day — 20–25 October 2026</h2><p className="unit">Unit: number of non-cancelled orders per day</p>
    <div className="chart-frame line-frame" role="img" aria-label={`Line chart of daily orders. ${rows.map(r=>`${r.date}: ${r.orders} orders`).join('; ')}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" aria-hidden="true">
        {[0,.25,.5,.75,1].map(t=><g key={t}><line x1={left} y1={top+ph*(1-t)} x2={width-right} y2={top+ph*(1-t)} className="grid-line"/><text x={left-10} y={top+ph*(1-t)+4} textAnchor="end" className="axis-label">{Math.round(max*t)}</text></g>)}
        <polyline points={line} className="line" fill="none"/>
        {points.map(p=><g key={p.date}><circle cx={p.x} cy={p.y} r="5" className="point"/><text x={p.x} y={p.y-10} textAnchor="middle" className="value-label">{p.orders}</text><text x={p.x} y={height-15} textAnchor="middle" className="axis-label">{p.date.slice(8)}</text></g>)}
      </svg>
    </div>
    <table className="data-table"><caption>Orders per day, 20–25 October 2026 — same values as the chart</caption><thead><tr><th scope="col">Date</th><th scope="col" className="numeric">Orders</th></tr></thead><tbody>{rows.map(r=><tr key={r.date}><th scope="row">{r.date}</th><td className="numeric">{r.orders}</td></tr>)}</tbody></table>
  </section>;
}
