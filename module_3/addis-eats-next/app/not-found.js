import Link from "next/link";

export default function NotFoundPage() {
  return <section className="not-found-panel">
    <p className="eyebrow">404 — Page not found</p><h1>We couldn't find that page.</h1>
    <p>The page or dish you requested doesn't exist.</p>
    <div className="dish-actions" style={{ justifyContent: "center" }}>
      <Link href="/" className="primary-link">Return Home</Link>
      <Link href="/menu" className="secondary-link">Browse the Menu</Link>
    </div>
  </section>;
}
