import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
  sortedPosts: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost: (state, action) => {},
    searchPosts: (state, action) => {},
    filterPosts: (state, action) => {},
    collapseComment: (state, action) => {},
    expandComment: (state, action) => {},
  },
});

export const {
  addPost,
  searchPosts,
  filterPosts,
  collapseComment,
  expandComment,
} = postsSlice.actions;

export default postsSlice.reducer;
