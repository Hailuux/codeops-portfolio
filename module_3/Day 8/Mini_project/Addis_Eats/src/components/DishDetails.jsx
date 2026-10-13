
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

function DishDetails() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isInCart = useCartStore((state) =>
    state.items.some((item) => String(item.id) === String(id))
  );
  const addItem = useCartStore((state) => state.addItem);
  const remove = useCartStore((state) => state.remove);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDish() {
      try {
        setLoading(true);
        setError("");
        setDish(null);

        const response = await fetch("/dishes.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load dish details.");
        }

        const data = await response.json();

        if (!Array.isArray(data.item)) {
          throw new Error("The menu data has an unexpected format.");
        }

        const selectedDish = data.item.find(
          (item) => String(item.id) === String(id)
        );

        if (!selectedDish) {
          throw new Error("The requested dish was not found.");
        }

        setDish(selectedDish);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load dish details.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadDish();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading dish details...</p>;
  }

  if (error || !dish) {
    return (
      <section className="content-card" role="alert">
        <h1>Dish unavailable</h1>
        <p>{error || "The requested dish could not be found."}</p>
        <Link to="/menu">Return to menu</Link>
      </section>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(Number(dish.price) || 0);

  return (
    <section className="content-card">
      <p className="muted">Menu / Dish details</p>
      <h1>{dish.name}</h1>

      <p className="dish-price">{formattedPrice}</p>

      {dish.category && <p>Category: {dish.category}</p>}

      {dish.isSpicy && <span className="spicy-label">Spicy</span>}

      <div className="dish-actions">
        {isInCart ? (
          <button
            type="button"
            className="secondary-button"
            onClick={() => remove(dish.id)}
          >
            Remove from cart
          </button>
        ) : (
          <button type="button" onClick={() => addItem(dish)}>
            Add to cart
          </button>
        )}

        <Link className="primary-button" to="/checkout">
          Go to checkout
        </Link>

        <Link className="secondary-button" to="/menu">
          Back to menu
        </Link>
      </div>
    </section>
  );
}

export default DishDetails;
