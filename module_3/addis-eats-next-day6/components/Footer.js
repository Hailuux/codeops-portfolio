import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <section className="footer-section">
          <h2>ADDIS EATS</h2>
          <p>Discover the flavors of Ethiopia, one dish at a time.</p>
        </section>
        <section className="footer-section">
          <h2>Explore</h2>
          <p><Link href="/menu">Menu</Link></p>
          <p><Link href="/cart">Cart</Link></p>
          <p><Link href="/checkout">Checkout</Link></p>
        </section>
      </div>
      <p className="footer-bottom">© {new Date().getFullYear()} ADDIS EATS</p>
    </footer>
  );
}
