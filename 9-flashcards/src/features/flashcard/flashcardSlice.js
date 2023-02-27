import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  favoriteDecks: [],
};

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    createGroup(state, action) {
      if (!state.groups.some((group) => group.name === action.payload)) {
        state.groups.push({
          name: action.payload,
          decks: [],
        });
      }
    },
    updateGroup(state, action) {},
    deleteGroup(state, action) {},
    createDeck(state, action) {
      const newDeck = action.payload;
      const group = state.groups.find((group) => group.name === newDeck.group);
      if (group === undefined) return;
      const isDuplicate = group.decks.some(
        (deck) => deck.name === newDeck.name
      );
      if (group !== undefined && !isDuplicate) {
        group.decks.push({
          ...newDeck,
          numPracticed: 0,
          flashcards: [],
        });
      }
    },
    updateDeck(state, action) {},
    deleteDeck(state, action) {},
    practiceDeck(state, action) {
      const group = state.groups.find(
        (group) => group.name === action.payload.group
      );
      if (group === undefined) return;
      const deck = group.decks.find(
        (deck) => deck.name === action.payload.deck
      );
      if (deck !== undefined) deck.numPracticed++;
    },
    updateFavorites(state, action) {
      let decks = [];
      for (const group of state.groups) {
        for (const deck of group.decks) {
          decks.push(deck);
        }
      }
      let favorites = decks.sort((a, b) => b.numPracticed - a.numPracticed);
      state.favoriteDecks = favorites.slice(0, action.payload);
    },
    stopPracticingDeck(state) {},
    testDeck(state, action) {},
    stopTestingDeck(state) {},
    createFlashcard(state, action) {
      const flashcard = action.payload;
      const group = state.groups.find(
        (group) => group.name === flashcard.group
      );
      if (group === undefined) return;
      const deck = group.decks.find((deck) => deck.name === flashcard.deck);
      if (deck === undefined) return;
      deck.flashcards.push({
        id: deck.flashcards.length,
        ...flashcard,
      });
    },
    updateFlashcard(state, action) {},
    removeFlashcard(state, action) {},
    flipFlashcard(state) {},
    nextFlashcard(state) {},
  },
});

export const {
  createGroup,
  updateGroup,
  deleteGroup,
  createDeck,
  updateDeck,
  deleteDeck,
  updateFavorites,
  practiceDeck,
  stopPracticingDeck,
  testDeck,
  stopTestingDeck,
  createFlashcard,
  updateFlashcard,
  removeFlashcard,
  flipFlashcard,
  nextFlashcard,
} = flashcardSlice.actions;
export default flashcardSlice.reducer;
