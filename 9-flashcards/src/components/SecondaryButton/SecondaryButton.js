import styles from "./SecondaryButton.module.css";
import Button from "../Button/Button";

function SecondaryButton(props) {
  return (
    <div className={styles.div}>
      <Button disabled={props.disabled}>{props.children}</Button>
    </div>
  );
}

export default SecondaryButton;
