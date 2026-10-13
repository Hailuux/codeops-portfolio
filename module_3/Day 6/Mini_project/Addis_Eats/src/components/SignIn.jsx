
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function SignIn() {
  const { user, loading, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const destination = location.state?.from;
  const redirectTo = destination
    ? `${destination.pathname}${destination.search || ""}${destination.hash || ""}`
    : "/checkout";

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter your name and a valid email address.");
      return;
    }

    setError("");
    signIn(name.trim(), email.trim());
    navigate(redirectTo, { replace: true });
  }

  return (
    <section className="auth-page">
      <h2>Sign In</h2>
      <p>Sign in to continue to checkout.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="signin-name">Name</label>
        <input
          id="signin-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="signin-email">Email</label>
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit">Sign In</button>
      </form>

      <p className="form-note">
        Demo sign-in only. Connect a real authentication service before
        using this for production.
      </p>
    </section>
  );
}

export default SignIn;
