import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  query: "",
  limit: 5,
  sort: "hot",
  after: "",
  error: "",
};

const getPosts = async (query, limit, sort, thunkAPI) => {
  const response = await axios.get("https://www.reddit.com/search.json", {
    params: {
      q: query,
      limit: limit,
      sort: sort,
      after: thunkAPI.getState().posts.after,
    },
  });
  const data = response.data.data;

  if (data.children.length === 0) {
    thunkAPI.dispatch("searchPosts/rejected");
  }
  return data;
};

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState().posts;
    const dispatch = thunkAPI.dispatch;
    const query = params.query || state.query;
    const limit = params.limit || state.limit;
    const limitDiff = limit - state.limit;
    const sort = params.sort || state.sort;

    if (params.query !== state.query || params.sort !== state.sort) {
      // query changed
      dispatch(resetPosts());
      dispatch(setParams({ query, limit, sort }));
      return await getPosts(query, limit, sort, thunkAPI);
    } else if (limitDiff === 0) {
      // same query, same posts
      dispatch(statusSucceeded());
      return;
    } else if (limitDiff > 0) {
      // same query, more posts
      dispatch(setParams(params));
      return await getPosts(query, limitDiff, sort, thunkAPI);
    } else {
      // same query, less posts
      dispatch(setParams(params));
      dispatch(removePosts(-1 * limitDiff));
      dispatch(statusSucceeded());
    }
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
    removePosts: (state, action) => {
      state.posts = state.posts.slice(0, state.posts.length - action.payload);
    },
    setParams: (state, action) => {
      state.query = action.payload.query;
      state.limit = parseInt(action.payload.limit);
      state.sort = action.payload.sort;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
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
        const newPosts = action.payload.children;
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
  addPosts,
  removePosts,
  setParams,
  setSort,
  resetPosts,
  statusSucceeded,
  collapseComment,
  expandComment,
} = postsSlice.actions;

export default postsSlice.reducer;
