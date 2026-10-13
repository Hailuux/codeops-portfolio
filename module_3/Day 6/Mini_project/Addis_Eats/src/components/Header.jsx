
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../App";

function Header() {
  const { cart } = useContext(CartContext);

  const navClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        ADDIS EATS
      </Link>

      <nav aria-label="Main navigation">
        <ul className="nav-list">
          <li>
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className={navClass}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/checkout" className={navClass}>
              Checkout
            </NavLink>
          </li>
          <li>
            <NavLink to="/signin" className={navClass}>
              Sign in
            </NavLink>
          </li>
        </ul>
      </nav>

      <Link to="/checkout" className="cart-link">
        Cart ({cart.length})
      </Link>
    </header>
  );
}

export default Header;
