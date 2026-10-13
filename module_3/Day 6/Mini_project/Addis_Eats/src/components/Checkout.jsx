
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../App";
import { useAuth } from "./AuthContext";

function Checkout() {
  const { cart, dispatch } = useContext(CartContext);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) return;

    setSubmitted(true);
    dispatch({ type: "Clear Cart" });
  }

  function handleSignOut() {
    signOut();
    navigate("/signin", { replace: true });
  }

  if (submitted) {
    return (
      <section>
        <h2>Order Submitted</h2>
        <p>Thank you, {user.name}! Your demo order has been submitted.</p>
        <Link to="/menu">Return to Menu</Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>
      <p>Signed in as {user.name} ({user.email})</p>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>

      <h3>Your Order</h3>

      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/menu">Browse the menu</Link>
        </p>
      ) : (
        <>
          <ul className="checkout-list">
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

          <h3>Total: {total} ETB</h3>

          <form onSubmit={handleSubmit}>
            <button type="submit">Submit Order</button>
          </form>
        </>
      )}
    </section>
  );
}

export default Checkout;
