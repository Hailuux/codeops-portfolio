import { useState } from "react";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import { searchMovies } from "./services/movieApi";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(query) {
    setLoading(true);
    setError("");

    try {
      const results = await searchMovies(query);

      setMovies(results);
    } catch (err) {
      setMovies([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Movie Finder</h1>

          <p>Find movies you want to watch.</p>

          <SearchBar
            onSearch={handleSearch}
            loading={loading}
          />
        </div>
      </header>

      <main className="container">
        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="message">
            Search for a movie to get started.
          </div>
        )}

        {loading && (
          <div className="message">
            Searching for movies...
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <section className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;