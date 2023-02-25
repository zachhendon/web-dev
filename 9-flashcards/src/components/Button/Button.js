import styles from "./Button.module.css";
import React from "react";

function PrimaryButton(props) {
  let disabled = props.disabled === true ? true : false;

  let children = props.children;
  if (
    typeof children !== "string" &&
    typeof children !== "number" &&
    React.isValidElement(children) === false
  ) {
    if (typeof children === "boolean") {
      children = children.toString();
    } else if (typeof children === "undefined") {
      children = "";
    } else {
      children = "Error";
      disabled = true;
    }
  }

  return (
    <button className={styles.button} disabled={disabled}>
      <p>{children}</p>
    </button>
  );
}

export default PrimaryButton;
