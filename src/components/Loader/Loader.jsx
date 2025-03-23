import css from "./Loader.module.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loader({ loading }) {
  return (
    <div className={css.roundLoading}>
      <ClipLoader color="#36d7b7" loading={loading} size={150} />
    </div>
  );
}