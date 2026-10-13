
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import Dish from "./Dish";
import { useCartStore } from "../store/useCartStore";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";

  const cartTotal = useCartStore((state) =>
    state.items.reduce((total, item) => {
      return total + (Number(item.price) || 0);
    }, 0)
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadDishes() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/dishes.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load the menu.");
        }

        const data = await response.json();

        if (!Array.isArray(data.item)) {
          throw new Error("The menu data has an unexpected format.");
        }

        setDishes(data.item);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong while loading the menu.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadDishes();

    return () => controller.abort();
  }, []);

  const filteredDishes = useMemo(() => {
    if (selectedCategory === "All") {
      return dishes;
    }

    return dishes.filter(
      (dish) =>
        String(dish.category).toLowerCase() ===
        selectedCategory.toLowerCase()
    );
  }, [dishes, selectedCategory]);

  if (loading) {
    return <p className="status-message">Loading menu...</p>;
  }

  if (error) {
    return (
      <section className="status-message" role="alert">
        <p>{error}</p>
        <button type="button" onClick={() => window.location.reload()}>
          Try again
        </button>
      </section>
    );
  }

  return (
    <section>
      <header className="page-heading">
        <h1>Our Menu</h1>
        <p>Discover Ethiopian dishes, sides, and beverages.</p>
        <p>
          <strong>Cart total:</strong>{" "}
          {new Intl.NumberFormat("en-ET", {
            style: "currency",
            currency: "ETB",
            maximumFractionDigits: 2,
          }).format(cartTotal)}
        </p>
      </header>

      <CategoryBar />

      {filteredDishes.length === 0 ? (
        <p className="empty-state">
          No dishes found in this category.
        </p>
      ) : (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <Dish
              key={dish.id}
              id={dish.id}
              name={dish.name}
              price={dish.price}
              category={dish.category}
              isSpicy={dish.isSpicy}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;
