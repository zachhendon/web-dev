import styles from "./PracticeFlashcard.module.css";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import chevronRight from "../../assets/chevronRight";
import chevronLeft from "../../assets/chevronLeft";

function PracticeFlashcard(props) {
  const [deg, setDeg] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const front = props.front;
  const back = props.back;
  const index = props.index;
  const setIndex = props.setIndex;
  const numCards = props.numCards;

  function createContent(text, isFront) {
    const sideStyle = isFront ? styles.front : styles.back;

    return (
      <div
        className={sideStyle + " " + styles.content + " flex"}
        onClick={() => {
          setIsChanging(false);
          setDeg(deg + 180)}
        }
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
            style={{
              transform: `rotateX(${deg}deg)`,
              transition:
                isChanging
                  ? "transform 0s ease-in-out"
                  : "transform 0.25s ease-in-out",
            }}
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
              setIsChanging(true);
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
              setIsChanging(true);
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
