import { useSelector } from "react-redux";
import styles from "./Post.module.css";

function Post(props) {
  const posts = useSelector((state) => state.posts.posts);
  if (posts.length <= props.postIndex) {
    return;
  }
  const post = posts[props.postIndex];
  const title = post.data.title;
  let media;
  if (post.data.is_video) {
    // video
    media = (
      <video
        style={{ alignSelf: "center", maxWidth: "100%", height: "36rem" }}
        alt="desc"
        controls
      >
        <source
          src={post.data.media.reddit_video.fallback_url}
          type="video/mp4"
        ></source>
      </video>
    );
  } else {
    // image
    const extension = post.data.url.slice(-3);
    const imgUrl =
      ["jpg", "jpeg", "tiff", "png", "gif", "bmp"].indexOf(extension) === -1
        ? post.data.thumbnail
        : post.data.url;
    media = (
      <img
        src={imgUrl}
        style={{
          alignSelf: "center",
          maxWidth: "100%",
          height: "36rem",
          objectFit: "cover",
        }}
        alt="desc"
      ></img>
    );
  }
  const subreddit = post.data.subreddit;
  const ups = post.data.ups;

  return (
    <>
      <div className={"grid " + styles.postComments}>
        <div className={"flex " + styles.postSubreddit}>
          <h5>{"r/" + subreddit}</h5>
          <div className={"flex " + styles.postContent}>
            <p>{ups}</p>
            <div className={"flex " + styles.postTitle}>
              <p>{title}</p>
              {media}
            </div>
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
