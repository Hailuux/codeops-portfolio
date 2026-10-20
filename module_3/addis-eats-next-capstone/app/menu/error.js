"use client";

export const metadata = { title: 'Menu Error', description: 'The ADDIS EATS menu could not be loaded. Try again or return to the menu page.' };

export default function MenuError({ error, reset }) {
  return <section className="error-panel" role="alert">
    <h1>We couldn't load the menu</h1><p>Please try again.</p>
    <button className="primary-button" onClick={reset}>Try again</button>
    {process.env.NODE_ENV === "development" && <p className="error-detail">{error.message}</p>}
  </section>;
}
