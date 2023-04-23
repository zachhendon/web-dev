import styles from "./DeckPreview.module.css";

function DeckPreview(props) {
  const text =
    !props.text || props.text === null || props.text === ""
      ? "Unnamed"
      : props.text;

  return (
    <button className={styles.button}>
      <h3 className={styles.h3}>{text}</h3>
    </button>
  );
}

export default DeckPreview;
