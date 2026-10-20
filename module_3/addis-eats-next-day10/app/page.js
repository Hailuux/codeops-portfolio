import Link from "next/link";

export const metadata = {
  title: "Ethiopian Food and Traditional Favorites",
  description: "Discover Ethiopian food favorites, learn about traditional dishes, and explore the ADDIS EATS menu.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <section className="hero">
    <p className="eyebrow">A taste of Ethiopia</p>
    <h1>Welcome to ADDIS EATS</h1>
    <p>Discover Ethiopian favorites, explore traditional dishes, and build your next meal.</p>
    <Link href="/menu" className="primary-link">Explore Our Menu</Link>
  </section>;
}
