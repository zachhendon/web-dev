import styles from "./Filter.module.css";
import FilterIcon from "../../../../app/common/assets/Filter";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort, searchPosts } from "../../../../features/posts/postsSlice";

function Filter(props) {
  const [active, setActive] = useState(false);
  const query = useSelector((state) => state.posts.query);
  const sort = useSelector((state) => state.posts.sort);
  const dispatch = useDispatch();

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

  const handleClick = async (newSort) => {
    await dispatch(setSort(newSort));
    if (query !== "" && newSort !== sort) {
      dispatch(searchPosts({ limit: 10, sort: null }));
    }
  };

  return (
    <div className={styles.dropdown}>
      <button className={"flex " + styles.dropdownButton}>
        <h4>{sort}</h4>
        {FilterIcon}
      </button>
      <div className={styles.dropdownContent}>
        <span className={styles.arrow}></span>
        <div className={"flex " + styles.content}>
          {["best", "hot", "new", "top", "rising"].map((sort, index) => (
            <p
              key={index}
              onClick={() => handleClick(sort)}
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
