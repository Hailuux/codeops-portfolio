
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../App";

function Dish({
  id,
  name,
  price,
  category,
  isSpicy,
  currency = "ETB",
}) {
  const { cart, dispatch } = useContext(CartContext);
  const isInCart = cart.some((item) => item.id === id);

  function addToCart() {
    dispatch({
      type: "Add to Cart",
      payload: { id, name, price, category, isSpicy },
    });
  }

  function removeFromCart() {
    dispatch({
      type: "Remove from Cart",
      payload: { id },
    });
  }

  return (
    <article className="dish">
      <h3>
        <Link to={`/menu/${id}`}>{name}</Link>
      </h3>

      <p>
        {price} {currency}
      </p>
      <p>{category}</p>

      {isSpicy && <p>🌶️ Spicy</p>}

      <Link to={`/menu/${id}`}>View details</Link>

      {isInCart ? (
        <button type="button" onClick={removeFromCart}>
          Remove from Cart
        </button>
      ) : (
        <button type="button" onClick={addToCart}>
          Add to Cart
        </button>
      )}
    </article>
  );
}

export default Dish;
