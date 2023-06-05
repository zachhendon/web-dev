import styles from "./NavBar.module.css";
import LogoBar from "../../../../app/common/components/LogoBar/LogoBar";
import SearchBar from "../../../../app/common/components/SearchBar/SearchBar";
import Filter from "../../../../app/common/assets/Filter";

function NavBar(props) {
  const handleClick = () => {
    alert("filtering...")
  }

  return (
    <header>
      <LogoBar />
      <div className={"main flex " + styles.navBar}>
        <SearchBar
          value={props.value}
          setValue={props.setValue}
          handleSubmit={props.handleSubmit}
        />
        <div className={"flex " + styles.filter} onClick={handleClick}>
          <h4>Filter</h4>
          {Filter}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
