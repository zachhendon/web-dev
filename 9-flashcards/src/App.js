import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NewDeckPage from "./pages/NewDeckPage/NewDeckPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import GroupPage from "./pages/GroupPage/GroupPage";
import EditDeckPage from "./pages/EditDeckPage/EditDeckPage";
import PracticeDeckPage from "./pages/PracticeDeckPage/PracticeDeckPage";
import TestDeckPage from "./pages/TestDeckPage/TestDeckPage";
import TestResultsPage from "./pages/TestResultsPage/TestResultsPage";
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
        group: "Group 1",
        description: "This is deck 1 and it is in Group 1",
      })
    );
    dispatch(
      createDeck({
        name: "Deck 6",
        group: "Group 1",
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
        group: "Group 1",
        deck: "Deck 5",
      })
    );
    dispatch(updateFavorites(3));
  }, [dispatch]);
  return (
    <>
      <header>
        <nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Home</p>
          </Link>
        </nav>
      </header>
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
