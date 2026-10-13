
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "../App";
import Dish from "./Dish";
import CategoryBar from "./CategoryBar";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const { cart } = useContext(CartContext);

  const category = searchParams.get("category") || "All";
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
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
        setDishes(data.item || []);
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

    fetchDishes();

    return () => controller.abort();
  }, []);

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <section>
      <h2>Our Dishes</h2>
      <p className="cart-total">Cart total: {total} ETB</p>

      <CategoryBar />

      {category !== "All" && (
        <p>
          Showing category: <strong>{category}</strong>
        </p>
      )}

      {loading && <p>Loading menu...</p>}

      {error && <p role="alert">Error loading menu: {error}</p>}

      {!loading && !error && (
        <>
          {filteredDishes.length > 0 ? (
            <div className="dish_container">
              {filteredDishes.map((dish) => (
                <Dish key={dish.id} {...dish} />
              ))}
            </div>
          ) : (
            <p>No dishes found in this category.</p>
          )}
        </>
      )}
    </section>
  );
}

export default Menu;
