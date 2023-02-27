import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "../features/flashcard/flashcardSlice";

export const createStore = () =>
  configureStore({
    reducer: {
      flashcard: flashcardReducer,
    },
  });

const store = createStore();

export default store;
