import Link from "next/link";
import { getDishes } from "./data";
import AddToCartButton from "./AddToCartButton";

// Async Server Component: data work happens on the server, not in a browser hook.
export default async function DishList() {
  const menuDishes = await getDishes();
  return (
    <div className="dish-grid">
      {menuDishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <div>
            <p className="eyebrow">{dish.category}</p>
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            {dish.isSpicy && <span className="spicy-label">Spicy</span>}
            <p className="dish-price">{dish.price} ETB</p>
          </div>
          <div className="dish-actions">
            <Link href={`/menu/${dish.id}`} className="secondary-link">View details</Link>
            <AddToCartButton dish={dish} />
          </div>
        </article>
      ))}
    </div>
  );
}
