import Link from "next/link";
import { notFound } from "next/navigation";
import dishes from "./dishes";
import CategoryBar from "./CategoryBar";
import DishCard from "./DishCard";

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "All";
  if (params?.error === "1") throw new Error("Deliberate menu error for testing.");
  if (!["All", "Vegan", "Main Dish", "Side Dish"].includes(category)) notFound();
  await new Promise(resolve => setTimeout(resolve, 1200));
  const filteredDishes = category === "All" ? dishes : dishes.filter(dish => dish.category === category);

  return <section>
    <div className="section-heading"><div><p className="eyebrow">Fresh from our kitchen</p><h1>Our Menu</h1></div>
      <Link href="/menu?error=1" className="secondary-link">Test menu error</Link>
    </div>
    <CategoryBar selected={category} />
    {filteredDishes.length === 0 ? <p>No dishes found in this category.</p> :
      <div className="dish-grid">{filteredDishes.map(dish => <DishCard key={dish.id} dish={dish} />)}</div>}
  </section>;
}
