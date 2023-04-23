import styles from "./GroupsPreview.module.css";
import DeckPreview from "../DeckPreview/DeckPreview";
import { useSelector } from "react-redux";
import AddDeckButton from "../AddDeckButton/AddDeckButton";
import { Link } from "react-router-dom";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

function GroupsPreview(props) {
  let rows = props.rows ? props.rows : 2;
  let columns = props.columns ? props.columns : 2;
  const numDecks = rows * columns;

  let key = 0;
  let groups = useSelector((state) => state.flashcard.groups);
  groups = groups.filter((group) => group.decks.length !== 0);

  let groupsSlice = groups.slice(0, 2);
  groupsSlice = groupsSlice.map((group, index) => {
    let decks = group.decks.slice(0, numDecks).map((deck) => {
      key++;
      return (
        <Link
          to={"/decks/" + deck.group + "/" + deck.name +  "/practice"}
          style={{ textDecoration: "none", width: "100%" }}
          key={key}
        >
          <DeckPreview text={deck.name} />
        </Link>
      );
    });

    for (let i = numDecks - decks.length; i > 0; i--) {
      key++;
      decks.push(
        <Link to="/new" key={key}>
          <AddDeckButton />
        </Link>
      );
    }

    return (
      <div className={"flex " + styles.group} key={index}>
        <div className={"flex " + styles.groupEdit}>
          <h3
            style={{
              color: "white",
              fontWeight: "400",
              fontFamily: "Montserrat, sans-serrif",
            }}
          >
            {group.name}
          </h3>
          <Link to={"/groups/" + group.name} style={{ textDecoration: "none" }}>
            <SecondaryButton>View</SecondaryButton>
          </Link>
        </div>
        <div
          className={"grid " + styles.deckGrid}
          style={{
            gridTemplateColumns: "1fr ".repeat(columns),
            gridTemplateRows: "1fr ".repeat(rows),
          }}
        >
          {decks}
        </div>
      </div>
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
      <div
        className={"flex " + styles.groups}
        style={{ flexDirection: props.column ? "column" : "row" }}
      >
        {groupsSlice}
      </div>
      {groupsButton}
    </div>
  );
}

export default GroupsPreview;
