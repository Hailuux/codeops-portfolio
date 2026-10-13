
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useCartStore } from "../store/useCartStore";
import DishModal from "./DishModal";

export default function Dish({ dish }) {
  const [modalOpen, setModalOpen] = useState(false);
  const quickViewRef = useRef(null);

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const remove = useCartStore((state) => state.remove);

  const inCart = items.some((item) => item.id === dish.id);

  function toggleCart() {
    if (inCart) {
      remove(dish.id);
    } else {
      addItem(dish);
    }
  }

  return (
    <article className="dish-card">
      <div className="dish-card-content">
        <h2>{dish.name}</h2>

        <p className="dish-category">{dish.category}</p>

        <p className="dish-price">
          {Number(dish.price).toFixed(2)} ETB
        </p>

        {dish.isSpicy && (
          <p className="spicy-label">Spicy</p>
        )}

        <div className="dish-actions">
          <button
            ref={quickViewRef}
            type="button"
            onClick={() => setModalOpen(true)}
          >
            Quick view
          </button>

          <Link to={`/menu/${dish.id}`}>Full details</Link>

          <button type="button" onClick={toggleCart}>
            {inCart ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <DishModal
          dish={dish}
          onClose={() => setModalOpen(false)}
          returnFocusRef={quickViewRef}
        />
      )}
    </article>
  );
}
