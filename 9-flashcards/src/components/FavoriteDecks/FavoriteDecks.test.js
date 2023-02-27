import { render, screen } from "@testing-library/react";
import FavoriteDecks from "./FavoriteDecks";
import { Provider } from "react-redux";
import {
  createGroup,
  createDeck,
  updateFavorites,
} from "../../features/flashcard/flashcardSlice";
import { createStore } from "../../app/store";

let store;
describe("FavoriteDecks", () => {
  beforeEach(() => {
    store = createStore();
  });
  it("renders the FavoriteDecks component if there is 1 favoriteDeck in state", () => {
    store.dispatch(createGroup("Group 1"));
    store.dispatch(createDeck({ name: "Deck 1", group: "Group 1" }));
    store.dispatch(updateFavorites(1));
    render(
      <Provider store={store}>
        <FavoriteDecks />
      </Provider>
    );
    expect(screen.getByText(/favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 1/i)).toBeInTheDocument();
  });
  it("renders the FavoriteDecks component if there are 3 favoriteDecks in state", () => {
    store.dispatch(createGroup("Group 1"));
    store.dispatch(createDeck({ name: "Deck 1", group: "Group 1" }));
    store.dispatch(createDeck({ name: "Deck 2", group: "Group 1" }));
    store.dispatch(createDeck({ name: "Deck 3", group: "Group 1" }));
    store.dispatch(updateFavorites(3));
    render(
      <Provider store={store}>
        <FavoriteDecks />
      </Provider>
    );
    expect(screen.getByText(/favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 1/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 2/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 3/i)).toBeInTheDocument();
  });
  it("only renders 2 favoriteDecks if there are 3 favoriteDecks in state but only 2 in favorites", () => {
    store.dispatch(createGroup("Group 1"));
    store.dispatch(createDeck({ name: "Deck 1", group: "Group 1" }));
    store.dispatch(createDeck({ name: "Deck 2", group: "Group 1" }));
    store.dispatch(createDeck({ name: "Deck 3", group: "Group 1" }));
    store.dispatch(updateFavorites(2));
    render(
      <Provider store={store}>
        <FavoriteDecks />
      </Provider>
    );
    expect(screen.getByText(/favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 1/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/deck 3/i)).not.toBeInTheDocument();
  });
  it("does not render the FavoriteDecks component if there are no favoriteDecks in state", () => {
    store.dispatch(createGroup("Group 1"));
    store.dispatch(createDeck({ name: "Deck 1", group: "Group 1" }));
    store.dispatch(createDeck({ name: "Deck 2", group: "Group 1" }));
    store.dispatch(updateFavorites(0));
    render(
      <Provider store={store}>
        <FavoriteDecks />
      </Provider>
    );
    expect(screen.queryByText(/favorites/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/deck 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/deck 2/i)).not.toBeInTheDocument();
  });
  it("does not render the component if there are no decks in state but updateFavorites(1) is run", () => {
    store.dispatch(updateFavorites(1));
    render(
      <Provider store={store}>
        <FavoriteDecks />
      </Provider>
    );
    expect(screen.queryByText(/favorites/i)).not.toBeInTheDocument();
  });
});
