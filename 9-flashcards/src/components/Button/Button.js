import styles from "./Button.module.css";
import React from "react";

function Button(props) {
  let disabled = props.disabled === true ? true : false;

  let children = props.children;
  if (typeof children === "string" || typeof children == "number") {
    children = <p>{children}</p>;
  } else if (typeof children === "boolean") {
    children = <p>{Boolean(children).toString()}</p>;
  } else if (typeof children === "undefined") {
    children = <p>{""}</p>;
  } else if (React.isValidElement(children) === false) {
    children = <p>Error</p>;
    disabled = true;
  }

  return (
    <button
      style={{ width: "100%", borderColor: props.error ? "#E34850" : null}}
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
