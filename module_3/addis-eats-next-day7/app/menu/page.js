import { Suspense } from "react";
import LiveDishExplorer from "./LiveDishExplorer";
import { listDishes } from "../../lib/server/dishes";

export const revalidate = 60;
const PAGE_SIZE = 3;

async function getInitialPageData() {
  const all = listDishes();
  return { data: all.slice(0, PAGE_SIZE), pagination: { page: 1, pageSize: PAGE_SIZE, total: all.length, pages: Math.max(1, Math.ceil(all.length / PAGE_SIZE)) }, query: "" };
}

function ExplorerFallback() {
  return <div className="dish-grid" role="status"><p>Preparing menu…</p></div>;
}

export default async function MenuPage() {
  const initialPageData = await getInitialPageData();
  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Fresh from our kitchen</p><h1>Our Menu</h1><p className="muted">Search is debounced; pagination is reflected in the URL so each page can be shared.</p></div></div>
      <Suspense fallback={<ExplorerFallback />}><LiveDishExplorer initialPageData={initialPageData} /></Suspense>
    </section>
  );
}
