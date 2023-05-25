import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../../features/posts/postsSlice";
import { useState, useEffect } from "react";

export default function Homepage() {
  const [value, setValue] = useState("");
  const [displayPosts, setDisplayPosts] = useState("");
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (value !== "") {
      dispatch(searchPosts(value));
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    switch (status) {
      case "loading":
        setDisplayPosts(<p>Loading...</p>);
        break;
      case "succeeded":
        setDisplayPosts(posts.map((post, index) => <p key={index}>{"- " + post}</p>));
        break;
      case "failed":
        setDisplayPosts(<p>Failed to load posts</p>);
        break;
      default:
        setDisplayPosts(<p>Search for posts</p>);
        break;
    }
  }, [status, posts]);

  return (
    <>
      <Link to="/post/1" style={{ textDecoration: "none" }}>
        <h1 className={styles.test}>Homepage</h1>
      </Link>

      <main>
        <button onClick={handleClick}>Search</button>
        <form onSubmit={handleClick}>
          <input
            type="text"
            value={value}
            placeholder="search"
            onInput={handleInput}
          />
        </form>
        {displayPosts}
      </main>
    </>
  );
}
