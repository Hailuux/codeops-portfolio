
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <h2>404 — Page Not Found</h2>
      <p>The page you requested doesn't exist.</p>
      <Link to="/">Return Home</Link>
    </section>
  );
}

export default NotFound;
