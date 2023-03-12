import styles from "./GroupsPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import DeckPreview from "../../components/DeckPreview/DeckPreview";
import { Link } from "react-router-dom";
import AddDeckButton from "../../components/AddDeckButton/AddDeckButton";
import { useEffect, useState } from "react";
import Textbox from "../../components/Textbox/Textbox";
import { useNavigate } from "react-router-dom";
import { createGroup } from "../../features/flashcard/flashcardSlice";

function GroupsPage() {
  const [isViewAll, setIsViewAll] = useState([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupError, setGroupError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  let groupsState = useSelector((state) => state.flashcard.groups);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chevronDown = (
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
  );
  const chevronUp = (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
  const plus = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svg}
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M256 112v288M400 256H112"
      />
    </svg>
  );

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < groupsState.length; i++) {
      arr.push(false);
    }
    setIsViewAll(arr);
  }, [groupsState]);

  useEffect(() => {
    if (groupTitle === "" && submitted) {
      setGroupError("*Enter a title to create a group");
    } else if (groupsState.some((group) => group.name === groupTitle)) {
      setGroupError("*A group with this name already exists");
    } else {
      setGroupError("");
    } 
  }, [groupTitle, submitted, groupsState])

  const columns = 3;

  function handleClick(i) {
    const arr = [...isViewAll];
    arr[i] = !arr[i];
    setIsViewAll(arr);
  }

  function handleSubmit() {
    console.log(groupTitle);
    console.log(groupsState);
    groupsState.forEach((group) => console.log(group.name === groupTitle));
    setSubmitted(true);
    if (groupTitle === "") {
      setGroupError("*Enter a title to create a group");
      return;
    } else if (groupsState.some((group) => group.name === groupTitle)) {
      setGroupError("*A group with this name already exists");
      return; 
    }
    setGroupTitle("")
    setSubmitted(false)
    dispatch(createGroup(groupTitle));
  }

  const groups = groupsState.map((group, i) => {
    let deckList = [];

    if (!isViewAll[i]) {
      for (let j = 0; j < columns; j++) {
        const deck = group.decks[j];
        if (deck !== undefined && j !== 2) {
          deckList.push(
            <Link
              to={"/decks/" + deck.group + "/" + deck.name +  "/practice"}
              style={{ textDecoration: "none" }}
              key={j}
            >
              <DeckPreview text={deck.name} />
            </Link>
          );
        } else {
          deckList.push(
            <Link to="/new" key={deckList.length}>
              <AddDeckButton />
            </Link>
          );
        }
      }
    } else {
      const rows = Math.floor(group.decks.length / columns) + 1;
      const numDecks = rows * columns;

      for (let j = 0; j < numDecks; j++) {
        const deck = group.decks[j];
        if (deck !== undefined) {
          deckList.push(
            <Link
              to={"/deck/" + deck.name + "/practice"}
              style={{ textDecoration: "none" }}
              key={j}
            >
              <DeckPreview text={deck.name} />
            </Link>
          );
        } else {
          deckList.push(
            <Link to="/new" key={deckList.length}>
              <AddDeckButton />
            </Link>
          );
        }
      }
    }

    return (
      <div className={"flex " + styles.group} key={i}>
        <h2>{group.name}</h2>
        <div
          className={"grid " + styles.groupDecks}
          style={{ gridTemplateColumns: "1fr ".repeat(columns) }}
        >
          {deckList}
        </div>
        {group.decks.length >= 3 && (
          <div style={{ width: "100%" }} onClick={() => handleClick(i)}>
            <button className={"flex " + styles.viewAllButton}>
              <p>{isViewAll[i] ? "View Less" : "View All"}</p>
              {isViewAll[i] ? chevronUp : chevronDown}
            </button>
          </div>
        )}
      </div>
    );
  });

  return (
    <main>
      <section className={"flex " + styles.newGroup}>
        <h2>Create a New Group</h2>
        <div className={"flex " + styles.newGroupButton}>
          <Textbox
            placeholder="Group Name"
            value={groupTitle}
            setValue={setGroupTitle}
            error2={groupError !== "" && groupError}
          >
            <div className={styles.button} onClick={handleSubmit}>{plus}</div>
          </Textbox>
        </div>
      </section>
      <section className={"flex " + styles.groups}>{groups}</section>
    </main>
  );
}

export default GroupsPage;
