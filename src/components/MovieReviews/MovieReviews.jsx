import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css";
import { fetchMoviesReviews } from "../../moviesApi";
import Loader from "../Loader/Loader";
import MessageError from "../MessageError/MessageError";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [feedbacks, setfeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getFeedbacks() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMoviesReviews(movieId);
        setfeedbacks(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getFeedbacks();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <MessageError />}
      <div className={css.listReviews}>
        {feedbacks.length ? (
          feedbacks.map((review) => (
            <div key={review.id} className={css.itemReviews}>
              <h3 className={css.subtitleReviews}>{review.author}</h3>
              <p className={css.textReviews}>{review.content}</p>
            </div>
          ))
        ) : (
          <p>We don't have any feedbacks for this movie</p>
        )}
      </div>
    </>
  );
}