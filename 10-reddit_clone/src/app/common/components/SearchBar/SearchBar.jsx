import styles from "./SearchBar.module.css";
import Search from "../../assets/Search.jsx";

function SearchBar(props) {
  const handleInput = (e) => {
    props.setValue(e.target.value);
  };

  return (
    <div className={"flex " + styles.searchBar}>
      {Search}
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={props.value}
          onInput={handleInput}
        />
      </form>
    </div>
  );
}

export default SearchBar;
