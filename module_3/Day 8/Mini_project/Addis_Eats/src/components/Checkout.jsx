
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuth } from "./AuthContext";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Enter your full name.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Your name must contain at least 2 characters.";
  }

  if (!form.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address, such as name@example.com.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Enter your phone number.";
  } else if (!/^(?:\+251|0)9\d{8}$/.test(form.phone.trim())) {
    errors.phone =
      "Enter a valid Ethiopian mobile number, such as 0912345678 or +251912345678.";
  }

  if (!form.address.trim()) {
    errors.address = "Enter your delivery address.";
  } else if (form.address.trim().length < 3) {
    errors.address = "Your delivery address must contain at least 3 characters.";
  }

  return errors;
}

function Checkout() {
  const { user } = useAuth();

  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const [form, setForm] = useState(() => ({
    ...initialForm,
    name: user?.name || "",
    email: user?.email || "",
  }));

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const submissionLock = useRef(false);
  const fieldRefs = useRef({});
  const submitErrorRef = useRef(null);

  // Validation is pure and derived from the current form on every render.
  const validationErrors = validate(form);
  const errors = { ...validationErrors, ...serverErrors };

  const hasErrors = Object.keys(errors).length > 0;

  const cartTotal = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + (Number(item.price) || 0),
      0
    )
  );

  const formatETB = (amount) =>
    new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setServerErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });

    setSubmitError("");
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  }

  function focusFirstInvalidField(currentErrors) {
    const fieldOrder = ["name", "email", "phone", "address"];
    const firstInvalidField = fieldOrder.find(
      (field) => currentErrors[field]
    );

    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
      return true;
    }

    return false;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // The ref blocks duplicate submissions before React rerenders.
    if (submissionLock.current || submitting) {
      return;
    }

    setSubmitError("");
    setServerErrors({});
    setSubmitSuccess(false);

    const currentErrors = validate(form);

    setTouched({
      name: true,
      email: true,
      phone: true,
      address: true,
    });

    if (items.length === 0) {
      setSubmitError("Your cart is empty. Add a dish before placing an order.");
      submitErrorRef.current?.focus();
      return;
    }

    if (Object.keys(currentErrors).length > 0) {
      focusFirstInvalidField(currentErrors);
      return;
    }

    submissionLock.current = true;
    setSubmitting(true);

    try {
      const order = {
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price) || 0,
        })),
        total: cartTotal,
        currency: "ETB",
      };

      // This endpoint requires a real backend to be implemented.
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(order),
      });

      let result = {};

      try {
        result = await response.json();
      } catch {
        // The server may return an empty or non-JSON response.
      }

      if (!response.ok) {
        if (
          response.status === 400 &&
          result.errors &&
          typeof result.errors === "object"
        ) {
          const allowedFields = ["name", "email", "phone", "address"];
          const returnedErrors = {};

          for (const field of allowedFields) {
            if (typeof result.errors[field] === "string") {
              returnedErrors[field] = result.errors[field];
            }
          }

          if (Object.keys(returnedErrors).length > 0) {
            setServerErrors(returnedErrors);
            setTouched((currentTouched) => ({
              ...currentTouched,
              name: true,
              email: true,
              phone: true,
              address: true,
            }));

            setSubmitError(
              "Please correct the highlighted fields and try again."
            );

            requestAnimationFrame(() => {
              focusFirstInvalidField(returnedErrors);
            });

            return;
          }
        }

        throw new Error(
          result.message ||
            `Your order could not be submitted (HTTP ${response.status}).`
        );
      }

      // Only clear the cart after the server confirms success.
      clear();
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof TypeError
          ? "We couldn't reach the order service. Check your connection and try again. Your details and cart have been preserved."
          : `${error.message} Your details and cart have been preserved.`
      );

      // A network failure has no invalid field to focus.
      // Move focus to the announced submission error instead.
      requestAnimationFrame(() => {
        submitErrorRef.current?.focus();
      });
    } finally {
      submissionLock.current = false;
      setSubmitting(false);
    }
  }

  if (submitSuccess) {
    return (
      <section className="content-card" aria-labelledby="success-heading">
        <h1 id="success-heading">Order submitted</h1>
        <p className="form-success" role="status">
          The order service confirmed that your order was submitted.
        </p>
        <p>Thank you, {form.name.trim()}.</p>
        <p>Delivery address: {form.address.trim()}</p>
        <p>Total: {formatETB(cartTotal)}</p>
        <Link className="primary-button" to="/menu">
          Return to menu
        </Link>
      </section>
    );
  }

  if (submitting) {
    // The form remains rendered during submission so its values stay intact.
  }

  const fieldDefinitions = [
    {
      name: "name",
      label: "Full name",
      type: "text",
      autoComplete: "name",
      placeholder: "Enter your full name",
      help: "Enter the name for the order.",
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      autoComplete: "email",
      placeholder: "you@example.com",
      help: "Enter an email address where order updates can be sent.",
    },
    {
      name: "phone",
      label: "Phone number",
      type: "tel",
      autoComplete: "tel",
      placeholder: "0912345678",
      help: "Use 09XXXXXXXX or +2519XXXXXXXX.",
    },
    {
      name: "address",
      label: "Delivery address",
      type: "text",
      autoComplete: "street-address",
      placeholder: "Enter your area and delivery details",
      help: "For example, Bole, near your building or landmark.",
    },
  ];

  return (
    <section>
      <header className="page-heading">
        <h1>Checkout</h1>
        <p>Review your order and provide your delivery details.</p>
      </header>

      <section className="cart-card" aria-labelledby="order-heading">
        <h2 id="order-heading">Your order</h2>

        {items.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <Link to="/menu">Browse the menu</Link>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{formatETB(item.price)}</p>
                  </div>

                  <button
                    type="button"
                    className="secondary-button"
                    disabled={submitting}
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name} from your order`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <p className="cart-summary">
              Total: {formatETB(cartTotal)}
            </p>
          </>
        )}
      </section>

      {submitError && (
        <div
          ref={submitErrorRef}
          className="form-error submission-error"
          role="alert"
          tabIndex={-1}
        >
          {submitError}
        </div>
      )}

      <form
        className="form-card"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={submitting}
      >
        <h2>Delivery details</h2>

        {fieldDefinitions.map((field) => {
          const fieldError = touched[field.name] ? errors[field.name] : "";
          const helpId = `${field.name}-help`;
          const errorId = `${field.name}-error`;

          return (
            <div className="form-group" key={field.name}>
              <label htmlFor={`checkout-${field.name}`}>
                {field.label}
              </label>

              <input
                ref={(element) => {
                  fieldRefs.current[field.name] = element;
                }}
                id={`checkout-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={submitting}
                required
                aria-invalid={Boolean(fieldError)}
                aria-describedby={
                  fieldError ? `${helpId} ${errorId}` : helpId
                }
              />

              <small id={helpId} className="muted">
                {field.help}
              </small>

              {fieldError && (
                <p id={errorId} className="form-error" role="alert">
                  {fieldError}
                </p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={submitting || items.length === 0}
        >
          {submitting
            ? `Submitting order — ${formatETB(cartTotal)}`
            : `Place order — ${formatETB(cartTotal)}`}
        </button>

        {submitting && (
          <p role="status" aria-live="polite">
            Submitting your order. Please wait.
          </p>
        )}
      </form>
    </section>
  );
}

export default Checkout;
