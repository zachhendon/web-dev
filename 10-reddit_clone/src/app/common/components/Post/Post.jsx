import { useSelector } from "react-redux";
import styles from "./Post.module.css";

function Post(props) {
  const posts = useSelector((state) => state.posts.posts);
  if (posts.length <= props.postIndex) {
    return;
  }
  const post = posts[props.postIndex];
  const title = post.data.title;
  const media = post.data.is_video ? (
    <video
      style={{ alignSelf: "center", width: "36rem", height: "auto" }}
      alt="desc"
      onclick="this.play()"
      controls
    >
      <source
        src={post.data.media.reddit_video.fallback_url}
        type="video/mp4"
      ></source>
    </video>
  ) : ["jpg", "jpeg", "tiff", "png", "gif", "bmp"].indexOf(
      post.data.url.slice(-3)
    ) === -1 ? (
    <img
      src={post.data.thumbnail}
      style={{ alignSelf: "center", width: "36rem", height: "auto" }}
      alt="desc"
    ></img>
  ) : (
    <img
      src={post.data.url}
      style={{ alignSelf: "center", width: "36rem", height: "auto" }}
      alt="desc"
    ></img>
  );
  const subreddit = post.data.subreddit;
  const ups = post.data.ups;

  return (
    <>
      {/* <p>{title}</p>
      <p>{subreddit}</p>
      <p>{ups}</p>
      {thumbnail &&
        ["jpg", "jpeg", "tiff", "png", "gif", "bmp"].indexOf(
          thumbnail.slice(-3)
        ) !== -1 && <embed src={thumbnail} width="200px" alt="description"></embed>} */}
      <div className={"grid " + styles.postComments}>
        <div className={"flex " + styles.postContent}>
          <p>{ups}</p>
          <div className={"flex " + styles.postTitle}>
            <p>{title}</p>
            {media}
          </div>
        </div>
        <p>Comments</p>
      </div>
      <p>
        ---------------------------------------------------------------------------------------------------------------------------------
      </p>
    </>
  );
}

export default Post;
