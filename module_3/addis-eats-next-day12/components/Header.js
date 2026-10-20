import Link from "next/link";
import AuthControls from "./AuthControls";
import CartCount from "./cart/CartCount";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">ADDIS EATS</Link>
      <nav className="nav-list" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart <CartCount /></Link>
        <Link href="/checkout">Checkout</Link>
        <AuthControls />
      </nav>
    </header>
  );
}
