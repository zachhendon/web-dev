import styles from "./Comment.module.css";
import { useSelector } from "react-redux";

function Comment(props) {
  const comments = useSelector(
    (state) => state.posts.posts[props.postIndex].comments
  );
  const author = comments[0].author;
  const body = comments[0].body;

  return (
    <div>
      <h4>{author}</h4>
      <p>{body}</p>
    </div>
  );
}

export default Comment;
