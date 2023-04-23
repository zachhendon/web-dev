import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numCards: 0,
  correct: [],
  incorrect: [],
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    addCorrect(state, action) {
      state.numCards++;
      state.correct.push({ cardNumber: state.numCards, card: action.payload });
    },
    addIncorrect(state, action) {
      state.numCards++;
      state.incorrect.push({ cardNumber: state.numCards, card: action.payload });
    },
    reset(state) {
      return initialState;
    }
  },
});

export const { addCorrect, addIncorrect, reset } = testSlice.actions;
export default testSlice.reducer;
