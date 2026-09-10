function MovieCard({ movie }) {
  const hasPoster = movie.Poster;

  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="movie-poster"
          />
        ) : (
          <div className="poster-placeholder">
            No poster
          </div>
        )}
      </div>

      <div className="movie-info">
        <h2>{movie.Title}</h2>

        <p>
          {movie.Year}
          <span> · </span>
          {movie.Type}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;