import styles from "./GroupsPreview.module.css";
import DeckPreview from "../DeckPreview/DeckPreview";
import { useSelector } from "react-redux";

function GroupsPreview() {
  let groups = useSelector((state) => state.flashcard.groups);
  groups = groups.filter((group) => group.decks.length !== 0);
  groups = groups.slice(0, 2);
  groups = groups.map((group, index) => {
    let decks = group.decks.slice(0, 4).map((deck, index) => {
      return <DeckPreview key={index} text={deck.name} />;
    });

    return (
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
    );
  });

  if (groups.length === 0) return null;
  return (
    <div className={"flex " + styles.container}>
      <h2>Groups</h2>
      <div className={"flex " + styles.groups}>{groups}</div>
    </div>
  );
}

export default GroupsPreview;
