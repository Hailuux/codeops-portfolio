import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../../lib/server/session";
import { listOrders } from "../../../lib/server/order-store";
import { RevenueByNeighbourhood, OrdersOverTime } from "./Charts";

export const dynamic = "force-dynamic";
export const metadata = { title: "Staff Analytics", description: "Staff-only ADDIS EATS order analytics, neighbourhood revenue, and accessible order records." };
const PAGE_SIZE = 5;
const validSorts = new Set(["createdAt", "total", "status", "name"]);
const money = (value) => new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 0 }).format(value);

function buildAggregates(orders) {
  const neighbourhoods = new Map();
  const dates = new Map();
  for (const order of orders) {
    const raw = String(order.address || "");
    const known = ["Bole", "Piassa", "Kazanchis", "Lideta", "Arat Kilo"].find((name) => raw.toLowerCase().includes(name.toLowerCase()));
    const neighbourhood = known || "Other / not specified";
    const revenue = Number(order.total) || 0;
    const n = neighbourhoods.get(neighbourhood) || { neighbourhood, orders: 0, revenue: 0 };
    n.orders += 1; n.revenue += revenue; neighbourhoods.set(neighbourhood, n);
    const date = String(order.createdAt || new Date().toISOString()).slice(0, 10);
    const d = dates.get(date) || { date, orders: 0, revenue: 0 };
    d.orders += 1; d.revenue += revenue; dates.set(date, d);
  }
  return {
    neighbourhoodRows: [...neighbourhoods.values()].sort((a,b) => b.revenue-a.revenue),
    dateRows: [...dates.values()].sort((a,b) => a.date.localeCompare(b.date)).slice(-7),
  };
}
function href(params) { const query = new URLSearchParams(); for (const [k,v] of Object.entries(params)) if (v !== undefined && v !== null && v !== "") query.set(k, String(v)); return `/staff/dashboard?${query.toString()}`; }

export default async function StaffDashboardPage({ searchParams }) {
  const session = await getSession();
  if (!session) redirect("/signin?next=%2Fstaff%2Fdashboard");
  if (session.role !== "staff") return <section className="analytics-page"><h1>Access denied</h1><p>This dashboard is available to staff accounts only.</p></section>;
  const params = await searchParams;
  const demoState = ["loading", "empty", "error"].includes(params?.state) ? params.state : "success";
  if (demoState === "loading") return <section className="analytics-page"><p className="eyebrow">State demonstration</p><h1>Staff analytics</h1><div className="analytics-skeleton" role="status" aria-live="polite">Loading analytics…</div><p><Link href="/staff/dashboard">Show live dashboard</Link></p></section>;
  if (demoState === "error") return <section className="analytics-page"><p className="eyebrow">State demonstration</p><h1>Staff analytics</h1><div className="analytics-error" role="alert"><h2>Analytics could not be loaded</h2><p>This is a deliberate demo error state. No order data was changed.</p><Link href="/staff/dashboard">Try again</Link></div></section>;
  const allOrders = demoState === "empty" ? [] : listOrders();
  const { neighbourhoodRows, dateRows } = buildAggregates(allOrders);
  const sort = validSorts.has(params?.sort) ? params.sort : "createdAt";
  const dir = params?.dir === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number.parseInt(params?.page || "1", 10) || 1);
  const sorted = [...allOrders].sort((a,b) => {
    const av = a[sort] ?? "", bv = b[sort] ?? "";
    const cmp = sort === "total" ? Number(av)-Number(bv) : String(av).localeCompare(String(bv));
    return dir === "asc" ? cmp : -cmp;
  });
  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageOrders = sorted.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE);
  const headers = [{key:"createdAt",label:"Placed"},{key:"name",label:"Customer"},{key:"status",label:"Status"},{key:"total",label:"Total (ETB)"}];
  const nextDir = (key) => sort === key && dir === "asc" ? "desc" : "asc";

  return <section className="analytics-page">
    <p className="eyebrow">Staff workspace</p><h1>Orders and revenue</h1><p>Aggregations are calculated on the server; only summary rows are passed to the chart components.</p>
    <div className="state-demo-links" aria-label="Dashboard state demonstrations"><strong>Demonstrate states:</strong> <Link href={href({state:"loading"})}>Loading</Link><Link href={href({state:"empty"})}>Empty</Link><Link href={href({state:"error"})}>Error</Link><Link href="/staff/dashboard">Live dashboard</Link></div>
    {allOrders.length === 0 ? <div className="analytics-empty"><h2>No orders yet</h2><p>Place an order while signed in, then return here. Analytics will appear when order records exist.</p></div> : <>
      <div className="analytics-grid"><RevenueByNeighbourhood rows={neighbourhoodRows}/><OrdersOverTime rows={dateRows}/></div>
      <section className="analytics-panel orders-panel"><h2>Orders</h2><p>Sort and pagination are encoded in the URL so the view can be bookmarked and shared with authorised staff.</p>
        <div className="table-scroll"><table className="analytics-table orders-table"><caption>Orders, page {currentPage} of {pageCount}</caption><thead><tr>{headers.map((h) => <th key={h.key} scope="col"><Link href={href({sort:h.key,dir:nextDir(h.key),page:1})}>{h.label} {sort===h.key ? (dir==="asc" ? "↑" : "↓") : "↕"}</Link></th>)}</tr></thead><tbody>{pageOrders.map((order) => <tr key={order.id}><td>{new Date(order.createdAt).toLocaleString("en-ET", {dateStyle:"medium",timeStyle:"short",timeZone:"Africa/Addis_Ababa"})}</td><td>{order.name || "—"}</td><td>{order.status}</td><td>{money(Number(order.total)||0)}</td></tr>)}</tbody></table></div>
        <nav className="pagination" aria-label="Order table pages"><span>Page {currentPage} of {pageCount}</span>{currentPage > 1 ? <Link href={href({sort,dir,page:currentPage-1})}>Previous</Link> : <span aria-disabled="true">Previous</span>}{currentPage < pageCount ? <Link href={href({sort,dir,page:currentPage+1})}>Next</Link> : <span aria-disabled="true">Next</span>}</nav>
      </section>
    </>}
  </section>;
}
