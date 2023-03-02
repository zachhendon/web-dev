import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NewDeckPage from "./pages/NewDeckPage/NewDeckPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import GroupPage from "./pages/GroupPage/GroupPage";
import EditDeckPage from "./pages/EditDeckPage/EditDeckPage";
import PracticeDeckPage from "./pages/PracticeDeckPage/PracticeDeckPage";
import TestDeckPage from "./pages/TestDeckPage/TestDeckPage";
import TestResultsPage from "./pages/TestResultsPage/TestResultsPage";
import Header from "./layouts/Header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  createGroup,
  createDeck,
  createFlashcard,
  updateFavorites,
  practiceDeck,
} from "./features/flashcard/flashcardSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createGroup("Group 1"));
    dispatch(createGroup("Group 2"));
    dispatch(createGroup("Group 3"));
    dispatch(
      createDeck({
        name: "Deck 1",
        group: "Group 1",
        description: "This is deck 1 and it is in Group 1",
      })
    );
    dispatch(
      createDeck({
        name: "Deck 2",
        group: "Group 1",
        description: "This is deck 1 and it is in Group 1",
      })
    );
    dispatch(
      createDeck({
        name: "Deck 3",
        group: "Group 1",
        description: "This is deck 1 and it is in Group 1",
      })
    );
    dispatch(
      createDeck({
        name: "Deck 4",
        group: "Group 1",
        description: "This is deck 1 and it is in Group 1",
      })
    );
    dispatch(
      createDeck({
        name: "Deck 5",
        group: "Group 2",
        description: "This is deck 1 and it is in Group 1",
      })
    );
    dispatch(
      createDeck({
        name: "Deck 6",
        group: "Group 3",
        description: "This is deck 1 and it is in Group 1",
      })
    );
    dispatch(
      createFlashcard({
        group: "Group 1",
        deck: "Deck 1",
        front: "Front of card",
        back: "Back of card",
      })
    );
    dispatch(
      practiceDeck({
        group: "Group 2",
        deck: "Deck 5",
      })
    );
    dispatch(updateFavorites(3));
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewDeckPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:groupId" element={<GroupPage />} />
        <Route path="/decks/:deckId/edit" element={<EditDeckPage />} />
        <Route path="/decks/:deckId/practice" element={<PracticeDeckPage />} />
        <Route path="/decks/:deckId/test" element={<TestDeckPage />} />
        <Route
          path="/decks/:deckId/test/results"
          element={<TestResultsPage />}
        />
      </Routes>
    </>
  );
}

export default App;
