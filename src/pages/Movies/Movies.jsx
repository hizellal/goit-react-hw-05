import { useEffect, useState } from "react";
import css from "./Movies.module.css";
import MoviesList from "../../components/MoviesList/MoviesList";
import { fetchMoviesByQuery } from "../../moviesApi";
import Loader from "../../components/Loader/Loader";
import MessageError from "../../components/MessageError/MessageError";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Formik, Form, Field } from "formik";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [debounceQuery] = useDebounce(query, 300);

  const changeSearchText = (values) => {
    const nextParams = new URLSearchParams(searchParams);

    if (values.query.trim() !== "") {
      nextParams.set("query", values.query);
    } else {
      nextParams.delete("query");
    }
    setSearchParams(nextParams);
  };


  useEffect(() => {
    if(!debounceQuery) return;
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMoviesByQuery(debounceQuery);
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [debounceQuery]);

  return (
    <div className={css.containerMovisPage}>
      <Formik
        className={css.formik}
        initialValues={{query}}
        enableReinitialize
        onSubmit={changeSearchText}
      >
        {({values, handleChange}) => (
          <Form>
            <Field
              className={css.input}
              type="text"
              name="query"
              autoComplete="on"
              autoFocus
              value={values.query}
              onChange={handleChange}
            />
            <button className={css.btn} type="submit">
              Search
            </button>
          </Form>
        )}
    </Formik>
      {isLoading && <Loader />}
      {error && <MessageError />}
      <MoviesList movies={movies} />
    </div>
  );
}