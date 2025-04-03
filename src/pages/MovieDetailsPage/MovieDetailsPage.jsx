import { Outlet, useLocation, useParams, NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { useEffect, useRef, useState } from "react";
import { fetchMoviesById } from "../../moviesApi";
import Loader from "../../components/Loader/Loader";
import MessageError from "../../components/MessageError/MessageError";
import { Suspense } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const locations = useLocation();
  const backLinkHref = useRef(locations.state?. from ?? '/');

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMoviesById(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <MessageError />;
  if (!movie) return <p>Movie details not available.</p>;

  return (
    <div className={css.movieDetails}>
        <NavLink to={backLinkHref.current} className={css.backLinkHref}>
            ← Go back
        </NavLink>

        <div className={css.movieContent}>
            <img
            className={css.movieListImg}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            />

            <div className={css.movieInfo}>
            <h1 className={css.detailsTitle}>{movie.original_title} ({movie.release_date.slice(0, 4)})</h1>

            <div className={css.movieListItemTitle}>
                <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
            </div>

            <div className={css.movieListItemOverview}>
                <h3>Overview:</h3>
                <p>{movie.overview}</p>
            </div>

            <div className={css.movieListItemGenre}>
                <h3>Genres:</h3>
                <p>{movie.genres.map((g) => g.name).join(" ")}</p>
            </div>
            </div>
        </div>

        <hr className={css.hrDetails}/>

        <div>
            <h3>Additional information</h3>
            <ul>
            <li>
                <NavLink to={`/movies/${movie.id}/cast`} state={locations} className={css.listLink}>
                Cast
                </NavLink>
            </li>
            <li>
                <NavLink to={`/movies/${movie.id}/feedback`} state={locations} className={css.listLink}>
                Reviews
                </NavLink>
            </li>
            </ul>
        </div>

        <hr className={css.hrDetails}/>

        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    </div>
  );
}