import css from "./Home.module.css";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../moviesApi";
import Loader from "../../components/Loader/Loader";
import MessageError from "../../components/MessageError/MessageError";
import MoviesList from "../../components/MoviesList/MoviesList";


export default function Home() {
  const [movies, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setMovie(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div className={css.containerMovie}>
      <h1 className={css.titleMovie}>Trending Today</h1>
      {isLoading && <Loader />}
      {error && <MessageError />}
      <MoviesList movies={movies} />
    </div>
  );
}