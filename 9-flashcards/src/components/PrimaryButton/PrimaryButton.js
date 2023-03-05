import styles from "./PrimaryButton.module.css";
import Button from "../Button/Button";

function PrimaryButton(props) {
  return (
    <div className={styles.div} onClick={props.onClick}>
      <Button disabled={props.disabled}>{props.children}</Button>
    </div>
  );
}

export default PrimaryButton;
