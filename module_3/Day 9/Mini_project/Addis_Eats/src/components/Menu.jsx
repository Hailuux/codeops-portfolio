
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dish from "./Dish";

export default function Menu() {
  const location = useLocation();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "All";
  const testError = params.get("testMenuError");

  useEffect(() => {
    const controller = new AbortController();

    async function loadDishes() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/dishes.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Could not load dishes: HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.item)) {
          throw new Error("The dishes file must contain an item array.");
        }

        setDishes(data.item);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("We couldn't load the menu. Please try again.");
          console.error("Menu loading failed:", err);
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

  if (import.meta.env.DEV && testError === "1") {
    throw new Error("Deliberate menu error for Day 9 testing");
  }

  const categories = [
    "All",
    "Main dish",
    "Side dish",
    "Beverages",
  ];

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  function categoryUrl(value) {
    if (value === "All") {
      return "/menu";
    }

    return `/menu?category=${encodeURIComponent(value)}`;
  }

  return (
    <section className="menu-page">
      <header className="menu-heading">
        <h1>Our Menu</h1>
        <p>Discover Ethiopian favorites at ADDIS EATS.</p>
      </header>

      <nav className="category-bar" aria-label="Filter dishes by category">
        {categories.map((value) => (
          <Link
            key={value}
            to={categoryUrl(value)}
            className={
              category === value
                ? "category-link category-link-active"
                : "category-link"
            }
            aria-current={category === value ? "page" : undefined}
          >
            {value}
          </Link>
        ))}
      </nav>

      {loading && <p role="status">Loading menu…</p>}

      {!loading && error && (
        <div className="menu-error" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Reload menu
          </button>
        </div>
      )}

      {!loading && !error && filteredDishes.length === 0 && (
        <p>No dishes were found in this category.</p>
      )}

      {!loading && !error && filteredDishes.length > 0 && (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </section>
  );
}
