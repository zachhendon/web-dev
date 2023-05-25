import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  sortedPosts: {},
  status: "idele",
};

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (query) => {
    const response = await axios.get("https://www.reddit.com/search.json", {
      params: { q: query, limit: "10"},
    });
    return response.data.data.children.map((post) => post.data.title);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost: (state, action) => {},
    filterPosts: (state, action) => {},
    collapseComment: (state, action) => {},
    expandComment: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addPost, filterPosts, collapseComment, expandComment } =
  postsSlice.actions;

export default postsSlice.reducer;
