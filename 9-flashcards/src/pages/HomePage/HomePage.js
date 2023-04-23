import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import FavoriteDecks from "../../components/FavoriteDecks/FavoriteDecks";
import GroupsPreview from "../../components/GroupsPreview/GroupsPreview";

function HomePage() {
  return (
    <>
      <main>
        <section className={styles.welcome}>
          <h1>Welcome!</h1>
          <p>
            Create a new group, make some changes to a deck, or get straight to
            learning!
          </p>
        </section>
        <section className={styles.cta}>
          <Link to="/new" style={{ textDecoration: "none" }}>
            <Button className={styles.ctaBut}>
              <div className={"flex " + styles.ctaButton}>
                <p>Create a new deck</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M256 112v288M400 256H112"
                  />
                </svg>
              </div>
            </Button>
          </Link>
        </section>
        <section className={styles.favorites}>
          <FavoriteDecks />
        </section>
        <section className={styles.groups}>
          <GroupsPreview />
        </section>
      </main>
    </>
  );
}

export default HomePage;
