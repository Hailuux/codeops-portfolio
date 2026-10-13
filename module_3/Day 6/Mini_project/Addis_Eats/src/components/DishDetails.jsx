
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../App";

function DishDetails() {
  const { id } = useParams();
  const { cart, dispatch } = useContext(CartContext);
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDish() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/dishes.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load dish details.");
        }

        const data = await response.json();
        const selectedDish = (data.item || []).find(
          (item) => String(item.id) === id
        );

        if (!selectedDish) {
          setError("Dish not found.");
          return;
        }

        setDish(selectedDish);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "An unexpected error occurred.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDish();

    return () => controller.abort();
  }, [id]);

  const isInCart = dish && cart.some((item) => item.id === dish.id);

  function handleCartAction() {
    if (isInCart) {
      dispatch({
        type: "Remove from Cart",
        payload: { id: dish.id },
      });
    } else {
      dispatch({
        type: "Add to Cart",
        payload: dish,
      });
    }
  }

  if (loading) return <p>Loading dish...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section className="dish-details">
      <h2>{dish.name}</h2>
      <p>Price: {dish.price} ETB</p>
      <p>Category: {dish.category}</p>
      <p>{dish.isSpicy ? "🌶️ Spicy" : "Not spicy"}</p>

      <button type="button" onClick={handleCartAction}>
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>

      <p>
        <Link to="/menu">Back to Menu</Link>
      </p>
    </section>
  );
}

export default DishDetails;
