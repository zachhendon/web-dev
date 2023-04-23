import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

function Header() {
  return (
    <header>
      <nav className={"flex " + styles.nav}>
        <div className={"flex " + styles.links}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            <p className={styles.linkText}>Home</p>
          </NavLink>
          <NavLink
            to="/groups"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            <p className={styles.linkText}>Groups</p>
          </NavLink>
          <NavLink
            to="/new"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            <div
              className={"flex " + styles.newDeck}
              style={{ color: "white" }}
            >
              <p className={styles.linkText}>New Deck</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
          </NavLink>
        </div>
        <div className={"flex " + styles.user}>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
            style={{ textDecoration: "none" }}
          >
            <div className={"flex " + styles.logoutButton}>
              <SecondaryButton className={styles.logout}>
                <div className={"flex " + styles.buttonContent}>
                  <p>Logout</p>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </SecondaryButton>
            </div>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
            style={{ textDecoration: "none", padding: "0"}}
          >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className={styles.linkText + " " + styles.profileIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
