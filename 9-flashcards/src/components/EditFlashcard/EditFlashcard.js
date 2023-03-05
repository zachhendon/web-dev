import styles from "./EditFlashcard.module.css";
import Textbox from "../Textbox/Textbox";
import { useEffect } from "react";

function EditFlashcard(props) {
  const menu = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={styles.menu}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M80 160h352M80 256h352M80 352h352"
      />
    </svg>
  );
  const trash = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.trash}
      onClick={() => {
        props.setFlashcards(
          props.flashcards
            .slice(0, index)
            .concat(props.flashcards.slice(index + 1))
        );
        console.log(props.flashcardsFail);
      }}
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  const flashcards = props.flashcards;
  const setFlashcards = props.setFlashcards;
  const index = props.index;

  function isFrontError(flashcardInput) {
    const flashcard = flashcardInput ? flashcardInput : flashcards[index];
    return index <= 2 &&
      (flashcard.front === undefined || flashcard.front === "")
      ? true
      : false;
  }
  function isBackError(flashcardInput) {
    const flashcard = flashcardInput ? flashcardInput : flashcards[index];
    return index <= 2 && (flashcard.back === undefined || flashcard.back === "")
      ? true
      : false;
  }

  function updateError(flashcard) {
    const newFlashcardsFail = [];

    for (let i = 0; i < 3; i++) {
      if (flashcards[i] === undefined) {
        newFlashcardsFail.push(true);
      } else if (i === index) {
        newFlashcardsFail.push(
          isFrontError(flashcard) || isBackError(flashcard)
        );
      } else {
        newFlashcardsFail.push(
          isFrontError(flashcards[i]) || isBackError(flashcards[i])
        );
      }
    }
    props.setFlashcardsFail(newFlashcardsFail);
  }

  useEffect(() => {
    updateError();
  }, [flashcards]);

  function setFront(value) {
    const flashcard = { ...flashcards[index], front: value };
    setFlashcards(
      flashcards
        .slice(0, index)
        .concat(flashcard)
        .concat(flashcards.slice(index + 1, flashcards.length))
    );
    updateError(flashcard);
  }
  function setBack(value) {
    const flashcard = { ...flashcards[index], back: value };
    setFlashcards(
      flashcards
        .slice(0, index)
        .concat(flashcard)
        .concat(flashcards.slice(index + 1, flashcards.length))
    );
    updateError(flashcard);
  }

  return (
    <div className={"flex " + styles.editFlashcard}>
      <div className={"flex " + styles.flashcardData}>
        <p>{index + 1}</p>
        <div className={"flex " + styles.icons}>
          {menu}
          <div>{trash}</div>
        </div>
      </div>
      <div className={"flex " + styles.inputs}>
        <Textbox
          label="Front"
          value={flashcards[index].front}
          setValue={setFront}
          id={"front" + index}
          error1={
            isFrontError() && props.submitted
              ? "*Please complete the front"
              : null
          }
        />
        <Textbox
          label="Back"
          value={flashcards[index].back}
          setValue={setBack}
          id={"back" + index}
          error1={
            isBackError() && props.submitted
              ? "*Please complete the back"
              : null
          }
        />
      </div>
    </div>
  );
}

export default EditFlashcard;
