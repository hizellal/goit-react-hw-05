import { Link, useLocation } from "react-router-dom";
import css from "./MoviesList.module.css";

export default function MovieList({ movies }) {
  const locations = useLocation();

  if (!movies || movies.length === 0) {
    return <p>No movies available at the moment.</p>;
  }

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: locations }} className={css.linkMovies}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}