import Link from "next/link";

export default function HomePage() {
  return <section className="hero">
    <p className="eyebrow">A taste of Ethiopia</p>
    <h1>Welcome to ADDIS EATS</h1>
    <p>Discover Ethiopian favorites, explore traditional dishes, and build your next meal.</p>
    <Link href="/menu" className="primary-link">Explore Our Menu</Link>
  </section>;
}
