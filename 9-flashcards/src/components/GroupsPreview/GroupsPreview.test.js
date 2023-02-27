import { render, screen } from "@testing-library/react";
import GroupsPreview from "./GroupsPreview";
import { Provider } from "react-redux";
import { createStore } from "../../app/store";
import {
  createGroup,
  createDeck,
} from "../../features/flashcard/flashcardSlice";

let store;
describe("GroupsPreview", () => {
  beforeEach(() => {
    store = createStore();
  });
  it("renders the GroupsPreview component if there is 1 group with a deck", () => {
    store.dispatch(createGroup("Group 1"));
    store.dispatch(createDeck({ name: "Deck 1", group: "Group 1" }));
    render(
      <Provider store={store}>
        <GroupsPreview />
      </Provider>
    );
    expect(screen.getByText(/groups/i)).toBeInTheDocument();
    expect(screen.getByText(/group 1/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 1/i)).toBeInTheDocument();
  });
  it("renders 2 GroupsPreview component if there are 3 groups in state each with a deck", () => {
    store.dispatch(createGroup("Group 1"));
    store.dispatch(createDeck({ name: "Deck 1", group: "Group 1" }));
    store.dispatch(createGroup("Group 2"));
    store.dispatch(createDeck({ name: "Deck 2", group: "Group 2" }));
    store.dispatch(createGroup("Group 3"));
    store.dispatch(createDeck({ name: "Deck 3", group: "Group 3" }));
    render(
      <Provider store={store}>
        <GroupsPreview />
      </Provider>
    );
    expect(screen.getByText(/groups/i)).toBeInTheDocument();
    expect(screen.getByText(/group 1/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 1/i)).toBeInTheDocument();
    expect(screen.getByText(/group 2/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/group 3/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/deck 3/i)).not.toBeInTheDocument();
  });
  it("renders 1 GroupsPreview component if there are 3 groups in state but only 1 has a deck", () => {
    store.dispatch(createGroup("Group 1"));
    store.dispatch(createDeck({ name: "Deck 1", group: "Group 1" }));
    store.dispatch(createGroup("Group 2"));
    store.dispatch(createGroup("Group 3"));
    render(
      <Provider store={store}>
        <GroupsPreview />
      </Provider>
    );
    expect(screen.getByText(/groups/i)).toBeInTheDocument();
    expect(screen.getByText(/group 1/i)).toBeInTheDocument();
    expect(screen.getByText(/deck 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/group 2/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/group 3/i)).not.toBeInTheDocument();
  });
  it("does not render the GroupsPreview component if there are no groups in state", () => {
    render(
      <Provider store={store}>
        <GroupsPreview />
      </Provider>
    );
    expect(screen.queryByText(/groups/i)).not.toBeInTheDocument();
  });
  it("does not render the GroupsPreview component if there is 1 group but it has no deck", () => {
    store.dispatch(createGroup("Group 1"));
    render(
      <Provider store={store}>
        <GroupsPreview />
      </Provider>
    );
    expect(screen.queryByText(/groups/i)).not.toBeInTheDocument();
  });
});
