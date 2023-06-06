import styles from "./NavBar.module.css";
import LogoBar from "../../../../app/common/components/LogoBar/LogoBar";
import SearchBar from "../../../../app/common/components/SearchBar/SearchBar";
import Filter from "../Filter/Filter";

function NavBar(props) {
  return (
    <header>
      <LogoBar />
      <div className={"main flex " + styles.navBar}>
        <SearchBar
          value={props.value}
          setValue={props.setValue}
          handleSubmit={props.handleSubmit}
        />
        <Filter sort={props.sort} submitQuery={props.submitQuery} />
      </div>
    </header>
  );
}

export default NavBar;
