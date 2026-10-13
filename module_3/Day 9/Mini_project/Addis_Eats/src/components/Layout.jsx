import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import CartPanel from "./CartPanel";
import ErrorBoundary from "./ErrorBoundary";

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <aside className="cart-region" aria-label="Shopping cart">
        <ErrorBoundary
          name="Cart"
          title="Your cart could not be displayed"
          message="The cart section failed, but you can continue browsing the menu."
        >
          <CartPanel />
        </ErrorBoundary>
      </aside>

      <Footer />
    </div>
  );
}