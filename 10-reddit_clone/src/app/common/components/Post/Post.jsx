import { useSelector } from "react-redux";

function Post(props) {
  const posts = useSelector((state) => state.posts.posts);
  if (posts.length <= props.postIndex) {
    return;
  }
  const post = posts[props.postIndex];
  const title = post.data.title;
  const thumbnail = post.data.thumbnail;
  const subreddit = post.data.subreddit;
  const ups = post.data.ups;

  return (
    <>
      <p>{title}</p>
      <p>{subreddit}</p>
      <p>{ups}</p>
      {thumbnail &&
        ["jpg", "jpeg", "tiff", "png", "gif", "bmp"].indexOf(
          thumbnail.slice(-3)
        ) !== -1 && <img src={thumbnail} width="200px" alt="description"></img>}
      <p>
        ---------------------------------------------------------------------------------------------------------------------------------
      </p>
    </>
  );
}

export default Post;
