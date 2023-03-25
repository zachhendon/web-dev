import styles from "./PracticeFlashcard.module.css";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function PracticeFlashcard(props) {
  const [deg, setDeg] = useState(0);
  const front = props.front;
  const back = props.back;
  const index = props.index;
  const setIndex = props.setIndex;
  const numCards = props.numCards;

  const chevronRight = (
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
  );
  const chevronLeft = (
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
        d="M15.75 19.5L8.25 12l7.5-7.5"
      ></path>
    </svg>
  );

  function createContent(text, isFront) {
    const sideStyle = isFront ? styles.front : styles.back;

    return (
      <div
        className={sideStyle + " " + styles.content + " flex"}
        onClick={() => setDeg(deg + 180)}
      >
        <p className={styles.cardNumber}>{`${index + 1}/${numCards}`}</p>
        <div className={styles.text + " flex"}>
          <p>{text}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.cardButton + " flex"}>
        <div className={styles.card}>
          <div
            className={styles.inner}
            style={{ transform: `rotateX(${deg}deg)` }}
          >
            {createContent(front, true)}
            {createContent(back, false)}
          </div>
        </div>
      </div>
      <div className={styles.buttons + " flex"}>
        <PrimaryButton
          onClick={() => {
            if (index > 0) {
              setIndex(index - 1);
              if (deg % 360 === 180) {
                setDeg(deg + 180);
              }
            }
          }}
        >
          {chevronLeft}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {
            if (index < numCards - 1) {
              setIndex(index + 1);
              if (deg % 360 === 180) {
                setDeg(deg + 180);
              }
            }
          }}
        >
          {chevronRight}
        </PrimaryButton>
      </div>
    </>
  );
}

export default PracticeFlashcard;
