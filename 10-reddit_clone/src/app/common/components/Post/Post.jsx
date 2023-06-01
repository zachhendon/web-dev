import { useSelector } from "react-redux";
import styles from "./Post.module.css";
import PostUps from "../PostUps/PostUps";

function Post(props) {
  const error = (
    <>
      <p>Sorry, there was an error loading this post</p>
      <p>
        ---------------------------------------------------------------------------------------------------------------------------------
      </p>
    </>
  );

  const posts = useSelector((state) => state.posts.posts);
  if (posts.length <= props.postIndex) {
    return error;
  }
  const post = posts[props.postIndex];
  const title = post.data.title;

  const isValidMedia = (url) => {
    return (
      ["jpg", "jpeg", "tiff", "png", "gif", "bmp"].indexOf(url.slice(-3)) !== -1
    );
  };
  let media;
  if (post.data.is_video) {
    if (!post.data.media) {
      return error;
    }
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
    let imgUrl;
    if (post.data.url && isValidMedia(post.data.url)) {
      imgUrl = post.data.url;
    } else if (post.data.thumbnail && isValidMedia(post.data.thumbnail)) {
      imgUrl = post.data.thumbnail;
    } else {
      return error;
    }
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
  const ups = <PostUps ups={post.data.ups} postIndex={props.postIndex} />;

  return (
    <>
      <div className={"grid " + styles.postComments}>
        <div className={"flex " + styles.postSubreddit}>
          <h5>{"r/" + subreddit}</h5>
          <div className={"flex " + styles.postContent}>
            {ups}
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
