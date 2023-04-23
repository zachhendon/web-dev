import styles from "./PracticeDeckPage.module.css";
import PracticeFlashcard from "../../components/PracticeFlashcard/PracticeFlashcard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { Link } from "react-router-dom";
import { practiceDeck, updateFavorites } from "../../features/flashcard/flashcardSlice";

function PracticeDeckPage() {
  const [index, setIndex] = useState(0);

  const path = window.location.pathname.replace(/%20/g, " ").split("/");
  const groupPath = path[2];
  const deckPath = path[3];

  const groups = useSelector((state) => state.flashcard.groups);
  const group = groups.find((group) => group.name === groupPath);
  const deck = group.decks.find((deck) => deck.name === deckPath);

  const arr = deck.flashcards.map((card) => [card.front, card.back]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(practiceDeck({ group: groupPath, deck: deckPath }));
    dispatch(updateFavorites(3));
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.cardInfo + " flex"}>
        <h1>{group.name}</h1>
        <div className={styles.buttons + " flex"}>
          <Link
            to={path.slice(0, 4).concat("edit").join("/")}
            style={{ textDecoration: "none" }}
          >
            <SecondaryButton>Edit</SecondaryButton>
          </Link>
          <Link
            to={path.slice(0, 4).concat("test").join("/")}
            style={{ textDecoration: "none" }}
          >
            <PrimaryButton>Test Yourself</PrimaryButton>
          </Link>
        </div>
      </div>
      <PracticeFlashcard
        index={index}
        setIndex={setIndex}
        numCards={arr.length}
        front={arr[index][0]}
        back={arr[index][1]}
      />
    </main>
  );
}

export default PracticeDeckPage;
