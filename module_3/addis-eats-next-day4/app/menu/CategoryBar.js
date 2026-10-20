import Link from "next/link";
const categories = ["All", "Vegan", "Main Dish", "Side Dish"];

export default function CategoryBar({ selected = "All" }) {
  return <nav className="category-bar" aria-label="Dish categories">
    {categories.map(category => {
      const href = category === "All" ? "/menu" : `/menu?category=${encodeURIComponent(category)}`;
      return <Link key={category} href={href} className={selected === category ? "category-link category-link-active" : "category-link"}>{category}</Link>;
    })}
  </nav>;
}
