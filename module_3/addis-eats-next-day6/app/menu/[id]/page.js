import Link from "next/link";
import { notFound } from "next/navigation";
import dishes from "../dishes";
import { getDishById } from "../data";
import AddToCartButton from "../AddToCartButton";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishDetailsPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);
  if (!dish) notFound();

  return (
    <section className="details-card">
      <p className="eyebrow">{dish.category}</p>
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p>Spicy: <strong>{dish.isSpicy ? "Yes" : "No"}</strong></p>
      <p className="dish-price">{dish.price} ETB</p>
      <div className="dish-actions">
        <AddToCartButton dish={dish} />
        <Link href="/menu" className="secondary-link">Back to menu</Link>
      </div>
    </section>
  );
}
