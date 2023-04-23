import styles from "./TestResultsPage.module.css";
import { useSelector } from "react-redux";
import check from "../../assets/check.js";
import xMark from "../../assets/xMark.js";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton.js";
import { Link } from "react-router-dom";

function TestResultsPage() {
  const test = useSelector((state) => state.test);
  const correct = test.correct;
  const incorrect = test.incorrect;
  const numCorrect = correct.length;
  const numIncorrect = incorrect.length;
  const numTotal = test.numCards;
  const greenRatio = 40 * Math.PI * (numCorrect / numTotal);
  const redRatio = 40 * Math.PI * (numIncorrect / numTotal);

  const home = "/";
  const currPath = window.location.pathname.split("/");
  const practice = currPath.slice(0, 4).concat("practice").join("/");
  const testAgain = currPath.slice(0, 4).concat("test").join("/");

  const pie = (
    <svg width="100" height="100" viewBox="0 0 50 50">
      <circle
        class="donut-ring"
        cx="25"
        cy="25"
        r="20"
        fill="transparent"
        stroke="#E51A1A"
        strokeWidth="10"
      ></circle>
      {numCorrect > 0 && (
        <circle
          class="donut-segment"
          cx="25"
          cy="25"
          r="20"
          fill="transparent"
          stroke="#1AE5A1"
          strokeWidth="10"
          strokeDasharray={greenRatio + " " + redRatio}
        ></circle>
      )}
    </svg>
  );

  const results = [];
  for (let i = 0; i < numTotal; i++) {
    const isCorrect = correct.some((card) => card.cardNumber === i + 1);

    results.push(
      <div
        className={styles.result + " flex"}
        style={{ color: isCorrect ? "#1AE5A1" : "#E51A1A" }}
      >
        <h4>{`${i + 1}. `}</h4>
        {isCorrect ? check : xMark}
      </div>
    );
  }

  return (
    <main>
      <div className={styles.score + " flex"}>
        {pie}
        <h2>{`${numCorrect}/${numTotal}`}</h2>
      </div>
      <div className={styles.resultsText + " flex"}>
        <div
          className={styles.results + " grid"}
          style={{
            gridTemplateColumns: "6.4rem ".repeat(
              Math.min(4, Math.ceil(numTotal / 10))
            ),
          }}
        >
          {results}
        </div>
        <div className={styles.bye + " flex"}>
          <h1>Great Job!</h1>
          <div className={styles.buttons + " grid"}>
            <Link to={home} style={{ textDecoration: "none" }}>
              <PrimaryButton>Home</PrimaryButton>
            </Link>
            <Link to={practice} style={{ textDecoration: "none" }}>
              <PrimaryButton>Practice</PrimaryButton>
            </Link>
            <Link to={testAgain} style={{ textDecoration: "none" }}>
              <PrimaryButton>Test Again</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TestResultsPage;
