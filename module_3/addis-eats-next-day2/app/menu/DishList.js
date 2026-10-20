import Link from "next/link";
import dishes from "./dishes";
import AddToCartButton from "./AddToCartButton";

async function getDishes() {
  // Simulates a slow data source so the Suspense fallback can be observed.
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return dishes;
}

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
            <Link href={`/menu/${dish.id}`} className="secondary-link">
              View details
            </Link>
            <AddToCartButton dish={dish} />
          </div>
        </article>
      ))}
    </div>
  );
}
