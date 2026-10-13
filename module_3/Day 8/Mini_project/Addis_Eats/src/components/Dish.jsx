
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

function Dish({
  id,
  name,
  price,
  category,
  isSpicy = false,
  currency = "ETB",
}) {
  const isInCart = useCartStore((state) =>
    state.items.some((item) => item.id === id)
  );
  const addItem = useCartStore((state) => state.addItem);
  const remove = useCartStore((state) => state.remove);

  const formattedPrice = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(price) || 0);

  const dish = { id, name, price, category, isSpicy };

  return (
    <article className="dish-card">
      <h2>{name}</h2>

      <p className="dish-price">{formattedPrice}</p>

      {category && <p className="muted">Category: {category}</p>}

      {isSpicy && <span className="spicy-label">Spicy</span>}

      <div className="dish-actions">
        <Link className="primary-button" to={`/menu/${id}`}>
          View details
        </Link>

        {isInCart ? (
          <button
            type="button"
            className="secondary-button"
            onClick={() => remove(id)}
          >
            Remove from cart
          </button>
        ) : (
          <button type="button" onClick={() => addItem(dish)}>
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}

export default Dish;
