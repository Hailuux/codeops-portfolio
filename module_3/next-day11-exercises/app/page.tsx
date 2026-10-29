import Link from 'next/link';
import { OrdersLineChart, RevenueChart } from '@/components/Charts';
import { aggregateOrdersByDay, aggregateRevenueByNeighbourhood, orders } from '@/lib/orders';
import './styles.css';

type Search = { sort?: string; dir?: string; page?: string; state?: string };
type Props = { searchParams: Promise<Search> };
const etb = (value: number) => new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB', maximumFractionDigits: 0 }).format(value);
const pageSize = 5;
const columns = ['id', 'customer', 'neighbourhood', 'date', 'total', 'status'] as const;
type SortKey = typeof columns[number];
function href(params: Search, updates: Partial<Search>) {
  const next = { ...params, ...updates };
  const query = new URLSearchParams();
  for (const [key,value] of Object.entries(next)) if (value) query.set(key,value);
  const str=query.toString(); return str ? `/?${str}` : '/';
}
function StateMessage({ state }: { state: string }) {
  if (state==='loading') return <div className="state" role="status"><h2>Loading analytics…</h2><p>This demo state represents a request in progress.</p></div>;
  if (state==='empty') return <div className="state"><h2>No orders yet</h2><p>When orders arrive, revenue and daily order charts will appear here.</p></div>;
  if (state==='error') return <div className="state error" role="alert"><h2>Analytics could not be loaded</h2><p>Demo error state. Check the data source and try again.</p><Link href="/">Try again</Link></div>;
  return <div className="state success"><h2>Analytics loaded</h2><p>Showing aggregated sample order data.</p></div>;
}
export default async function Home({ searchParams }: Props) {
  const params=await searchParams;
  const state=['loading','empty','error'].includes(params.state ?? '') ? params.state! : 'success';
  const requestedSort=(columns as readonly string[]).includes(params.sort ?? '') ? params.sort as SortKey : 'date';
  const dir=params.dir==='asc'?'asc':'desc';
  const page=Math.max(1, Number.parseInt(params.page ?? '1',10)||1);
  const rows=state==='empty'?[]:orders;
  const revenue=aggregateRevenueByNeighbourhood(rows);
  const daily=aggregateOrdersByDay(rows);
  const sorted=[...rows].sort((a,b)=>{ const av=a[requestedSort], bv=b[requestedSort]; const cmp=typeof av==='number'&&typeof bv==='number'?av-bv:String(av).localeCompare(String(bv)); return dir==='asc'?cmp:-cmp; });
  const pageCount=Math.max(1,Math.ceil(sorted.length/pageSize));
  const currentPage=Math.min(page,pageCount);
  const visible=sorted.slice((currentPage-1)*pageSize,currentPage*pageSize);
  const headers: {key:SortKey; label:string}[]=[{key:'id',label:'Order ID'},{key:'customer',label:'Customer'},{key:'neighbourhood',label:'Neighbourhood'},{key:'date',label:'Date'},{key:'total',label:'Total (ETB)'},{key:'status',label:'Status'}];
  return <main className="container">
    <header className="hero"><p className="eyebrow">ADDIS EATS · DAY 11 EXERCISES</p><h1>Orders analytics dashboard</h1><p>Server-aggregated summaries, accessible charts, and URL-driven order browsing.</p></header>
    <nav className="state-nav" aria-label="Demonstrate dashboard states"><span>Show state:</span>{['success','loading','empty','error'].map(s=><Link key={s} aria-current={state===s?'page':undefined} href={href(params,{state:s,page:'1'})}>{s[0].toUpperCase()+s.slice(1)}</Link>)}</nav>
    <StateMessage state={state}/>
    {state!=='error' && state!=='loading' && <>
      {state==='empty' ? <section className="panel"><h2>Revenue by neighbourhood</h2><p>No revenue data available.</p></section> : <><RevenueChart rows={revenue}/><OrdersLineChart rows={daily}/></>}
      <section className="panel" aria-labelledby="orders-heading"><div className="table-heading"><div><h2 id="orders-heading">Orders</h2><p>Sort using a column heading; page changes are stored in the URL.</p></div><p className="count">{sorted.length} orders</p></div>
        <div className="table-scroll"><table className="data-table orders-table"><caption>Orders list, sorted by {requestedSort} ({dir === 'asc'?'ascending':'descending'}), page {currentPage} of {pageCount}</caption><thead><tr>{headers.map(h=>{const active=requestedSort===h.key;const nextDir=active&&dir==='asc'?'desc':'asc';return <th scope="col" key={h.key} aria-sort={active?(dir==='asc'?'ascending':'descending'):'none'} className={h.key==='total'?'numeric':''}><Link href={href(params,{sort:h.key,dir:nextDir,page:'1'})}>{h.label}{active?` ${dir==='asc'?'↑':'↓'}`:''}</Link></th>;})}</tr></thead><tbody>{visible.map(order=><tr key={order.id}><th scope="row">{order.id}</th><td>{order.customer}</td><td>{order.neighbourhood}</td><td>{order.date}</td><td className="numeric">{etb(order.total)}</td><td><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></td></tr>)}</tbody></table></div>
        {visible.length===0&&<p className="empty-row">No orders match this view.</p>}
        <nav className="pagination" aria-label="Order table pages"><span>Page {currentPage} of {pageCount}</span><div><Link aria-disabled={currentPage<=1} tabIndex={currentPage<=1?-1:0} href={href(params,{page:String(Math.max(1,currentPage-1))})}>Previous</Link><Link aria-disabled={currentPage>=pageCount} tabIndex={currentPage>=pageCount?-1:0} href={href(params,{page:String(Math.min(pageCount,currentPage+1))})}>Next</Link></div></nav>
      </section>
    </>}
    <footer><p>Sample data for learning purposes. Cancelled orders are excluded from revenue and daily order aggregates.</p></footer>
  </main>;
}
