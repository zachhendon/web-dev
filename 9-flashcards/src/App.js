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

function App() {
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
