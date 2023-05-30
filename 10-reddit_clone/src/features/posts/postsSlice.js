import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  query: "",
  limit: 0,
  sort: "relevance",
  after: "",
  error: "",
};

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (params, thunkAPI) => {
    let state = thunkAPI.getState().posts;
    let limit = params.limit;
    const sort = params.sort || "relevance";

    if (
      params.limit >= state.limit &&
      state.after !== "" &&
      params.query === state.query &&
      params.sort === state.sort
    ) {
      limit = params.limit - state.limit;
      if (limit === 0) {
        thunkAPI.dispatch(statusSucceeded());
        return;
      }
    } else {
      console.log(false);
      thunkAPI.dispatch(resetPosts());
    }

    const response = await axios.get("https://www.reddit.com/search.json", {
      params: {
        q: params.query,
        limit,
        sort,
        after: thunkAPI.getState().posts.after,
      },
    });
    if (response.data.data.children.length === 0) {
      thunkAPI.dispatch("searchPosts/rejected");
    }
    thunkAPI.dispatch(setParams(params));
    return response.data.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPosts: (state, action) => {
      let posts = action.payload;
      if (Array.isArray(action.payload)) {
        posts = [action.payload];
      }
      for (const post of posts) {
        state.posts.push(post);
      }
    },
    setParams: (state, action) => {
      state.query = action.payload.query;
      state.limit = parseInt(action.payload.limit);
      state.sort = action.payload.sort;
    },
    resetPosts: (state) => {
      state.posts = [];
      state.after = "";
    },
    statusSucceeded: (state) => {
      state.status = "succeeded";
    },
    collapseComment: (state, action) => {},
    expandComment: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        if (action.payload === undefined || action.payload === null) {
          return;
        }

        state.status = "succeeded";
        const newPosts = action.payload.children.map((post) => post.data.title);
        for (const post of newPosts) {
          state.posts.push(post);
        }
        state.after = action.payload.after;
        state.error = "";
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addPost,
  setParams,
  resetPosts,
  statusSucceeded,
  collapseComment,
  expandComment,
} = postsSlice.actions;

export default postsSlice.reducer;
