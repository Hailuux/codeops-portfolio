
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function DishModal({
  dish,
  onClose,
  returnFocusRef,
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;

    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusableElements = dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      const focusable = Array.from(focusableElements).filter(
        (element) => element.getAttribute("aria-hidden") !== "true"
      );

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      } else if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      const target = returnFocusRef?.current;

      if (target?.isConnected) {
        target.focus();
      } else if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, [onClose, returnFocusRef]);

  if (!dish) {
    return null;
  }

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="dish-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        aria-describedby="dish-modal-description"
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close dish details"
        >
          ×
        </button>

        <h2 id="dish-modal-title">{dish.name}</h2>

        <p id="dish-modal-description">
          {dish.description || `Enjoy ${dish.name}, one of our menu selections.`}
        </p>

        <p className="modal-price">
          {Number(dish.price).toFixed(2)} ETB
        </p>

        {dish.isSpicy && (
          <p className="spicy-label">Spicy</p>
        )}
      </section>
    </div>,
    document.body
  );
}
