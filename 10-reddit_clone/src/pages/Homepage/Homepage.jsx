import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <Link to="/post/1" style={{textDecoration: "none"}}>
      <h1>Homepage</h1>
    </Link>
  );
}
