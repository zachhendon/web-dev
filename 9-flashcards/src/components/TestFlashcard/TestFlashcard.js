import styles from "./TestFlashcard.module.css";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import Textbox from "../Textbox/Textbox";
import chevronRight from "../../assets/chevronRight";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCorrect, addIncorrect } from "../../features/flashcard/testSlice";

function TestFlashcard(props) {
  const [deg, setDeg] = useState(0);
  const [value, setValue] = useState("");
  const front = props.front;
  const back = props.back;
  const index = props.index;
  const setIndex = props.setIndex;
  const numCards = props.numCards;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isCorrect = () => {
    return value.toLowerCase().trim() === back.toLowerCase().trim();
  };

  const createContent = (text, isFront) => {
    const sideStyle = isFront ? styles.front : styles.back;

    return (
      <div className={sideStyle + " " + styles.content + " flex"}>
        <p className={styles.cardNumber}>{`${index + 1}/${numCards}`}</p>
        <div className={styles.text + " flex"}>
          {!isFront &&
            (isCorrect() ? (
              <div
                className="flex"
                style={{
                  textAlign: "center",
                  flexDirection: "column",
                  gap: "2.4rem",
                }}
              >
                <p style={{ color: "#0F8A61" }}>Correct!</p>
                <p>
                  <i>{back}</i>
                </p>
              </div>
            ) : (
              <div
                className="flex"
                style={{
                  textAlign: "center",
                  flexDirection: "column",
                  gap: "2.4rem",
                }}
              >
                <p style={{ color: "#E51A1A" }}>Incorrect</p>
                <p>
                  <b>Correct answer: </b>
                  {back}
                </p>
                <p>
                  You answered: <i>{text}</i>
                </p>
              </div>
            ))}
          {isFront && <p>{text}</p>}
        </div>
      </div>
    );
  };

  const handleSumbit = () => {
    if (deg % 360 === 0) {
      setDeg(deg + 180);
    }
  };

  const handleNext = () => {
    const card = { front: front, back: back };
    dispatch(isCorrect() ? addCorrect(card) : addIncorrect(card));

    setValue("");
    setDeg(deg + 180);

    if (index === numCards - 1) {
      navigate("results");
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <>
      <div className={styles.cardButton + " flex"}>
        <div className={styles.card}>
          <div
            className={styles.inner}
            style={{
              transform: `rotateX(${deg}deg)`,
              transition:
                deg % 360 === 0
                  ? "transform 0s ease-in-out"
                  : "transform 0.25s ease-in-out",
            }}
          >
            {createContent(front, true)}
            {createContent(value, false)}
          </div>
        </div>
      </div>
      <div
        className={styles.buttons + " flex"}
        style={{ justifyContent: isCorrect() ? "flex-end" : "space-between" }}
      >
        {deg % 360 === 0 ? (
          <>
            <Textbox placeholder="Response" value={value} setValue={setValue} />
            <PrimaryButton onClick={handleSumbit}>
              <p>Submit</p>
            </PrimaryButton>
          </>
        ) : (
          <>
            {!isCorrect() && (
              <SecondaryButton onClick={() => setValue(back)}>
                Error: I was correct
              </SecondaryButton>
            )}

            <PrimaryButton className={styles.next} onClick={handleNext}>
              {chevronRight}
            </PrimaryButton>
          </>
        )}
      </div>
    </>
  );
}

export default TestFlashcard;
