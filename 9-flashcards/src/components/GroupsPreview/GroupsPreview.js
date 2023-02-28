import styles from "./GroupsPreview.module.css";
import DeckPreview from "../DeckPreview/DeckPreview";
import { useSelector } from "react-redux";
import AddDeckButton from "../AddDeckButton/AddDeckButton";
import { Link } from "react-router-dom";

function GroupsPreview() {
  let key = 0;
  let groups = useSelector((state) => state.flashcard.groups);
  groups = groups.filter((group) => group.decks.length !== 0);

  let groupsSlice = groups.slice(0, 2);
  groupsSlice = groupsSlice.map((group, index) => {
    let decks = group.decks.slice(0, 4).map((deck) => {
      key++;
      return (
        <Link
          to={"/deck/" + deck.name + "/practice"}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <DeckPreview key={key} text={deck.name} />
        </Link>
      );
    });

    for (let i = 4 - decks.length; i > 0; i--) {
      key++;
      decks.push(<AddDeckButton key={key} />);
    }

    return (
      <Link
        to={"/groups/" + group.name}
        style={{ textDecoration: "none", width: "100%" }}
      >
        <div key={index} className={"flex " + styles.group}>
          <h3
            style={{
              color: "white",
              fontWeight: "400",
              fontFamily: "Montserrat, sans-serrif",
            }}
          >
            {group.name}
          </h3>
          <div className="grid">{decks}</div>
        </div>
      </Link>
    );
  });

  let groupsButton = null;
  if (groups.length >= 3) {
    groupsButton = (
      <Link to="/groups" style={{ textDecoration: "none" }}>
        <button className={"flex " + styles.viewAllButton}>
          <p>View All</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M112 184l144 144 144-144"
            />
          </svg>
        </button>
      </Link>
    );
  }

  if (groupsSlice.length === 0) return null;
  return (
    <div className={"flex " + styles.container}>
      <h2>Groups</h2>
      <div className={"flex " + styles.groups}>{groupsSlice}</div>
      {groupsButton}
    </div>
  );
}

export default GroupsPreview;
