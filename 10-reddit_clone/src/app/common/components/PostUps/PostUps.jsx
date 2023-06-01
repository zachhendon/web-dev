import { useState } from "react";
import styles from "./PostUps.module.css";
import ArrowUp from "../../assets/ArrowUp";
import ArrowDown from "../../assets/ArrowDown";
import React from "react";

function PostUps(props) {
  const [ups, setUps] = useState(props.ups);

  const handleClick = (direction) => {
    const upsDiv = document.getElementById(styles.ups + props.postIndex);
    const upSvgPath = upsDiv.children[0].children[0].children[0];
    const downSvgPath = upsDiv.children[2].children[0].children[0];
    const upvoteStatus = ups - props.ups;

    if (direction === 1) {
      upSvgPath.style.stroke = "#ff4500";
    } else {
      downSvgPath.style.stroke = "#00b38f";
    }

    if (ups === props.ups) {
      setUps(ups + direction);
    } else if (upvoteStatus === direction) {
      upSvgPath.style.stroke = "#373231";
      downSvgPath.style.stroke = "#373231";
      setUps(props.ups);
    } else if (upvoteStatus === -direction) {
      setUps(ups + 2 * direction);
      if (direction === 1) {
        downSvgPath.style.stroke = "#373231";
      } else {
        upSvgPath.style.stroke = "#373231";
      }
    }
  };

  return (
    <div
      style={{ color: "red" }}
      id={styles.ups + props.postIndex}
      className={"flex " + styles.ups}
    >
      <div className={styles.up} onClick={() => handleClick(1)}>
        {ArrowUp}
      </div>
      <h4 style={{ userSelect: "none" }}>{ups}</h4>
      <div className={styles.down} onClick={() => handleClick(-1)}>
        {ArrowDown}
      </div>
    </div>
  );
}

export default PostUps;
