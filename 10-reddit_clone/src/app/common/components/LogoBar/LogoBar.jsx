import styles from "./LogoBar.module.css";
import pic from "./RedditLogo.png";
import { Link } from "react-router-dom";

function LogoBar() {
  console.log(pic);
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div className={"flex " + styles.logoBar}>
        <img src={pic} alt="Reddit logo" className={styles.redditLogo} />
        <h1>Reddit Clone</h1>
      </div>
    </Link>
  );
}

export default LogoBar;
