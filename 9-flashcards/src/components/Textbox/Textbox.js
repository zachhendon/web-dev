import styles from "./Textbox.module.css";

function Textbox(props) {
  function handleInput(event) {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  const rows = props.rows ? props.rows : 1;

  return (
    <form className={styles.form}>
      <label htmlFor="text-area">
        <p>{props.label}</p>
      </label>
      <textarea
        type="text"
        name="textbox"
        placeholder={props.placeholder}
        className={styles.textbox}
        spellCheck="false"
        rows={rows}
        value={props.value}
        onChange={(event) => {
          props.setValue(event.target.value);
        }}
        onInput={handleInput}
      />
    </form>
  );
}

export default Textbox;
