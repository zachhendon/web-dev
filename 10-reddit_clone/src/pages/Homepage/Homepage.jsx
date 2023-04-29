import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <>
      <Link to="/post/1" style={{ textDecoration: "none" }}>
        <h1 className={styles.test}>Homepage</h1>
      </Link>
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit illo
          accusantium error dolores veniam tempore, fugiat ut dignissimos ea qui
          eius inventore excepturi expedita optio quasi? Iste enim consequatur
          voluptates architecto. Reprehenderit molestias perspiciatis, ad ex
          tempore quasi recusandae consequuntur ullam. Nihil, ipsa quae rerum
          provident eveniet quibusdam expedita voluptas commodi tempore
          blanditiis. Blanditiis iusto dicta quas quae ipsa nobis pariatur
          quibusdam nostrum tenetur modi repudiandae iure eius molestias
          repellat at hic, distinctio molestiae, corrupti suscipit laudantium
          veniam provident vitae? Sequi distinctio quam eaque sed vero
          provident, possimus quis culpa explicabo repellat rerum neque
          similique iste dicta sapiente. Ea dicta ipsam, modi sed at voluptatum
          quam tempora similique ipsa, officiis labore recusandae ab fuga vel
          cumque incidunt quia. Dolor, cum?
        </p>
      </main>
    </>
  );
}
