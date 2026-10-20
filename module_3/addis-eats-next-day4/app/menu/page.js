import { Suspense } from "react";
import DishList from "./DishList";

export const revalidate = 60;

function DishListFallback() {
  return (
    <div className="dish-grid" role="status" aria-live="polite">
      {[1, 2, 3].map((item) => (
        <div className="dish-card skeleton-card" key={item}>
          <div className="skeleton-line skeleton-short" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-medium" />
          <p>Loading dish...</p>
        </div>
      ))}
    </div>
  );
}

export default async function MenuPage() {
  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Fresh from our kitchen</p>
          <h1>Our Menu</h1>
          <p className="muted">Dish data is loaded on the server; only interactive leaves are sent as client JavaScript.</p>
        </div>
      </div>
      <Suspense fallback={<DishListFallback />}>
        <DishList />
      </Suspense>
    </section>
  );
}
