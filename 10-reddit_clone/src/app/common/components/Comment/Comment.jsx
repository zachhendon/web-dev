import styles from "./Comment.module.css";
import { useSelector } from "react-redux";

function Comment(props) {
  const comments = useSelector(
    (state) => state.posts.posts[props.postIndex].comments
  );
  const height = useSelector(
    (state) => state.posts.posts[props.postIndex].height
  );

  const formatComment = (comment, i, limit, count) => {
    if (i === limit) return;

    return (
      <div key={count}>
        <div className={"flex " + styles.profile}>
          <img
            style={{ width: "3.2rem", height: "3.2rem", borderRadius: "50%" }}
            src={comment.userProfile}
            alt="profile"
          ></img>
          <h6>{comment.author}</h6>
        </div>
        {comment.replies.length !== 0 && (
          <div className={styles.indent}>
            {comment.replies.map((reply, count) =>
              formatComment(reply, i + 1, limit, count)
            )}
          </div>
        )}
      </div>
    );
  };

  const getDisplayComments = (displayComments, comments, limit) => {
    for (let i = 0; i < comments.length; i++) {
      displayComments.push(
        <div
          style={{ marginBottom: i !== comments.length - 1 ? "1.2rem" : "0" }}
          key={i}
        >
          {formatComment(comments[i], 0, limit)}
        </div>
      );
    }
  };

  const displayComments = [];
  getDisplayComments(displayComments, comments, 3);

  return (
    <div>
      <div
        style={{ height: `${height / 10 - 3.2}rem` }}
        className={styles.comments}
      >
        {displayComments}
      </div>
      <h5>View All Comments</h5>
    </div>
  );
}

export default Comment;
