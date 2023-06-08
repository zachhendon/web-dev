import styles from "./Comment.module.css";
import { useSelector } from "react-redux";

function Comment(props) {
  const comments = useSelector(
    (state) => state.posts.posts[props.postIndex].comments
  );
  const height = useSelector(
    (state) => state.posts.posts[props.postIndex].height
  );

  const formatComment = (comment, i, limit) => {
    if (i === limit) return;
    return (
      <>
        <div className={"flex " + styles.profile}>
          
          <h6>{comment.author}</h6>
        </div>
        {comment.replies.length !== 0 && (
          <div className={styles.indent}>
            {comment.replies.map((reply) => formatComment(reply, i + 1, limit))}
          </div>
        )}
      </>
    );
  };

  const getDisplayComments = (displayComments, comments, limit) => {
    for (const comment of comments) {
      displayComments.push(<div>{formatComment(comment, 0, limit)}</div>);
    }
  };

  const displayComments = [];
  getDisplayComments(displayComments, comments, 2);

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
