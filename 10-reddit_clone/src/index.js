import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import CommentView from "./pages/CommentView/CommentView"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      <Route path="/post/:postId" element={<CommentView />} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
