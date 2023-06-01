import styles from "./PostUps.module.css";
import ArrowUp from "../../assets/ArrowUp";
import ArrowDown from "../../assets/ArrowDown";

function PostUps(props) {
  const ups = props.ups;

  return (
    <div className={"flex " + styles.ups}>
      {ArrowUp}
      <h4>{ups}</h4>
      {ArrowDown}
    </div>
  );
}

export default PostUps;
