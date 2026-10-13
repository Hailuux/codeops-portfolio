
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-page">
      <h2>Welcome to ADDIS EATS</h2>
      <p>
        Discover Ethiopian favorites, explore the menu, and build your
        next meal.
      </p>
      <Link to="/menu" className="primary-link">
        Explore Our Menu
      </Link>
    </section>
  );
}

export default Home;
