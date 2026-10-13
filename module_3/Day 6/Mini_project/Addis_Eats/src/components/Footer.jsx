
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../App";

function Footer() {
  const { cart, dispatch } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <footer className="footer">
      <section className="footer-cart">
        <h3>Your Cart ({cart.length})</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} — {item.price} ETB
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "Remove from Cart",
                        payload: { id: item.id },
                      })
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <p>Total: {total} ETB</p>
            <Link to="/checkout">Proceed to Checkout</Link>
          </>
        )}
      </section>

      <div className="footer-contact">
        <p>Contact: ADDIS EATS</p>
        <p>Phone: +251 911 234 567</p>
        <p>Address: Addis Ababa, Ethiopia</p>
        <p>&copy; {new Date().getFullYear()} ADDIS EATS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
