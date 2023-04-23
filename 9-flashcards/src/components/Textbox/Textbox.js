import styles from "./Textbox.module.css";

function Textbox(props) {
  function handleInput(event) {
    props.setValue(event.target.value);

    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  const rows = props.rows ? props.rows : 1;

  return (
    <form className={styles.form}>
      <label htmlFor="text-area">
        <div className={"flex " + styles.label}>
          <p>{props.label}</p>
          <p className={styles.error1}>{props.error1}</p>
        </div>
      </label>
      <div style={{position: "relative"}}>
        <textarea
          type="text"
          name="textbox"
          placeholder={props.placeholder}
          className={styles.textbox}
          id={props.id}
          spellCheck="false"
          rows={rows}
          value={props.value}
          onInput={handleInput}
          style={
            props.error1 || props.error2 ? { borderColor: "#E34850" } : null
          }
        />
        {props.children}
      </div>
      <p className={styles.error2}>{props.error2}</p>
    </form>
  );
}

export default Textbox;
