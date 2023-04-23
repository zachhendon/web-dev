import TestFlashcard from "../../components/TestFlashcard/TestFlashcard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/flashcard/testSlice";

function TestDeckPage() {
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
    dispatch(reset());
  }, [dispatch])

  return (
    <main>
      <TestFlashcard
        index={index}
        setIndex={setIndex}
        numCards={arr.length}
        front={arr[index][0]}
        back={arr[index][1]}
      />
    </main>
  );
}

export default TestDeckPage;
