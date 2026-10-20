import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <div><p className="eyebrow">{dish.category}</p><h2>{dish.name}</h2><p>{dish.description}</p>{dish.isSpicy && <span className="spicy-label">Spicy</span>}<p className="dish-price">{dish.price} ETB</p></div>
      <div className="dish-actions"><Link href={`/menu/${dish.id}`} className="secondary-link">View details</Link><AddToCartButton dish={dish} /></div>
    </article>
  );
}
