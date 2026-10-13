
import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useTheme } from "./ThemeContext";

function Header() {
  const cartItems = useCartStore((state) => state.items);
  const { theme, toggleTheme } = useTheme();

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
              Sign In
            </NavLink>
          </li>
        </ul>
      </nav>

      <Link to="/checkout" className="cart-link">
        Cart ({cartItems.length})
      </Link>

      <button type="button" onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} theme
      </button>
    </header>
  );
}

export default Header;
