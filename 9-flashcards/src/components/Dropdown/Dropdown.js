import styles from "./Dropdown.module.css";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import { useSelector } from "react-redux";

function Dropdown(props) {
  const sideSvg = (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.sideSvg}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      ></path>
    </svg>
  );
  const downSvg = (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.downSvg}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      ></path>
    </svg>
  );

  const groups = useSelector((state) => state.flashcard.groups);
  const names = groups.map((group, index) => (
    <p key={index} onClick={() => props.setState(group.name)}>
      {group.name}
    </p>
  ));

  return (
    <div className={styles.dropdown} style={{ width: props.width, marginTop: props.error === null ? "3rem" : null }}>
      <p className={styles.error}>{props.error}</p>
      <SecondaryButton error={props.error !== null}>
        <div className={"flex " + styles.button}>
          <p>{props.state}</p>
          {sideSvg}
          {downSvg}
        </div>
      </SecondaryButton>
      <div className={styles.dropdownContent}>{names}</div>
    </div>
  );
}

export default Dropdown;
