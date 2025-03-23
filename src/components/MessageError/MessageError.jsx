import css from "./MessageError.module.css";

export default function MessageError() {
  return (
    <>
      <p className={css.errorText}>
        Connection problem, reload the page or try again later...
      </p>
    </>
  );
}