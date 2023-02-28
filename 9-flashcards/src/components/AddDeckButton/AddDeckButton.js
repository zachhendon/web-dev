import styles from "./AddDeckButton.module.css";
import { Link } from "react-router-dom";

function AddDeckButton() {
  return (
    <Link to="/new">
      <button className={styles.button}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M256 112v288M400 256H112"
          />
        </svg>
      </button>
    </Link>
  );
}

export default AddDeckButton;
