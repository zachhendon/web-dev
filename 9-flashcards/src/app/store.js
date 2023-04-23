import { combineReducers, configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "../features/flashcard/flashcardSlice";
import testReducer from "../features/flashcard/testSlice";

const rootReducer = combineReducers({
  flashcard: flashcardReducer,
  test: testReducer,
});

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
  });

const store = createStore();

export default store;
