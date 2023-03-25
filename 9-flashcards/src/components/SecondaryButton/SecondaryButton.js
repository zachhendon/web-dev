import styles from "./SecondaryButton.module.css";
import Button from "../Button/Button";

function SecondaryButton(props) {
  return (
    <div className={"flex " + styles.div} onClick={props.onClick}>
      <Button disabled={props.disabled} error={props.error}>{props.children}</Button>
    </div>
  );
}

export default SecondaryButton;
