import { useState } from "react";

function Post(props) {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [subreddit, setSubreddit] = useState("");
  const [ups, setUps] = useState(0);
  const [media, setMedia] = useState(null);
  if (props.post !== undefined && thumbnail !== props.post.data.thumbnail) {
    setThumbnail(props.post.data.thumbnail);
    setTitle(props.post.data.title);
    setSubreddit(props.post.data.subreddit);
    setUps(props.post.data.ups);
  }

  return (
    <>
      <p>{title}</p>
      <p>{subreddit}</p>
      <p>{ups}</p>
      {thumbnail && ["jpg", "jpeg", "tiff", "png", "gif", "bmp"].indexOf(
        thumbnail.slice(-3)
      ) !== -1 && <img src={thumbnail} width="200px" alt="description"></img>}
      <p>
        ---------------------------------------------------------------------------------------------------------------------------------
      </p>
    </>
  );
}

export default Post;
