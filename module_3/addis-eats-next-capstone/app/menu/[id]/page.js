import Link from "next/link";
import { notFound } from "next/navigation";
import dishes from "../dishes";
import { getDishById } from "../data";
import AddToCartButton from "../AddToCartButton";
import { absoluteUrl } from "../../../lib/site";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}


export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);
  if (!dish) return { title: "Dish Not Found", description: "This dish could not be found in the ADDIS EATS menu." };
  const title = `${dish.name} — Ethiopian ${dish.category}`;
  const description = `${dish.description} Order ${dish.name} from ADDIS EATS for ${dish.price} ETB.`;
  const url = absoluteUrl(`/menu/${dish.id}`);
  return {
    title, description, alternates: { canonical: url },
    openGraph: { type: "article", title, description, url, images: [{ url: `/menu/${dish.id}/opengraph-image`, width: 1200, height: 630, alt: `${dish.name} — ADDIS EATS` }] },
    twitter: { card: "summary_large_image", title, description, images: [`/menu/${dish.id}/opengraph-image`] },
  };
}

export default async function DishDetailsPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);
  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: { "@type": "Offer", price: String(dish.price), priceCurrency: "ETB", availability: "https://schema.org/InStock", url: absoluteUrl(`/menu/${dish.id}`) },
    suitableForDiet: dish.category === "Vegan" ? "https://schema.org/VegetarianDiet" : undefined,
  };

  return (
    <section className="details-card">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
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
