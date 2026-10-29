import Link from "next/link";

export const metadata = { title: 'Page Not Found', description: 'The requested page could not be found. Return to the ADDIS EATS home page or browse the menu.' };

export default function NotFoundPage() {
  return (
    <section className="not-found-panel">
      <p className="eyebrow">404 — Page not found</p>
      <h1>We couldn't find that page.</h1>
      <p>The page or dish you requested doesn't exist.</p>
      <div className="dish-actions centered-actions">
        <Link href="/" className="primary-link">Return Home</Link>
        <Link href="/menu" className="secondary-link">Browse the Menu</Link>
      </div>
    </section>
  );
}
