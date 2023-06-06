import styles from "./Filter.module.css";
import FilterIcon from "../../../../app/common/assets/Filter";
import { useState } from "react";

function Filter(props) {
  const [active, setActive] = useState(false);

  window.addEventListener("click", (e) => {
    const dropdown = document.getElementsByClassName(styles.dropdown)[0];
    // if dropdown is clicked, toggle dropdown
    if (e.target.closest("." + styles.dropdown)) {
      if (active) {
        dropdown.classList.remove(styles.dropdownActive);
      } else {
        dropdown.classList.add(styles.dropdownActive);
      }
      setActive(!active);
      // hide dropdown if clicked elsewhere
    } else if (active) {
      dropdown.classList.remove(styles.dropdownActive);
      setActive(false);
    }
  });

  return (
    <div className={styles.dropdown}>
      <button className={"flex " + styles.dropdownButton}>
        <h4>{props.sort}</h4>
        {FilterIcon}
      </button>
      <div className={styles.dropdownContent}>
        <span className={styles.arrow}></span>
        <div className={"flex " + styles.content}>
          {["best", "hot", "new", "top", "rising"].map((sort, index) => (
            <p
              key={index}
              onClick={() => props.setSort(sort)}
              style={{ textTransform: "capitalize" }}
            >
              {sort}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
