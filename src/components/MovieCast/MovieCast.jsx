import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";
import { fetchMoviesCast } from "../../moviesApi";
import Loader from "../Loader/Loader";
import MessageError from "../MessageError/MessageError";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();

  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMoviesCast(movieId);
        setCasts(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <div className={css.containerCast}>
      {isLoading && <Loader />}
      {error && <MessageError />}
      <ul className={css.listCast}>
        {casts.map((cast) => (
          <li key={cast.id} className={css.itemCast}>
            <img
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt={cast.name}
              className={css.imgCast}
            />
            <p className={css.textCast}>
              {cast.name}
            </p>
            <p className={css.textCast}>
              Character: {cast.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}