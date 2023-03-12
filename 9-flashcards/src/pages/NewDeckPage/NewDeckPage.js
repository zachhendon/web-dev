import styles from "./NewDeckPage.module.css";
import Textbox from "../../components/Textbox/Textbox";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import EditFlashcard from "../../components/EditFlashcard/EditFlashcard";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useDispatch } from "react-redux";
import {
  createDeck,
  createFlashcard,
} from "../../features/flashcard/flashcardSlice";
import { useNavigate } from "react-router-dom";

function NewDeckPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState([{}, {}, {}]);
  const [group, setGroup] = useState("No group");
  const [titleFail, setTitleFail] = useState(false);
  const [groupFail, setGroupFail] = useState(false);
  const [descriptionFail, setDescriptionFail] = useState(false);
  const [flashcardsFail, setFlashcardsFail] = useState([false, false, false]);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const flashcardList = flashcards.map((flashcard, index) => {
    flashcard = (
      <EditFlashcard
        key={index}
        index={index}
        flashcards={flashcards}
        submitted={submitted}
        setFlashcards={setFlashcards}
        flashcardsFail={flashcardsFail}
        setFlashcardsFail={setFlashcardsFail}
      />
    );
    return flashcard;
  });

  useEffect(() => {
    if (!submitted) return;

    if (title === "") {
      setTitleFail(true);
    } else {
      setTitleFail(false);
    }

    if (description === "") {
      setDescriptionFail(true);
    } else {
      setDescriptionFail(false);
    }

    if (group === "No group") {
      setGroupFail(true);
    } else {
      setGroupFail(false);
    }
  }, [submitted, title, description, group]);

  function handleSubmit() {
    let fail = false;
    setSubmitted(true);

    if (title === "") {
      setTitleFail(true);
      fail = true;
    }
    if (group === "No group") {
      setGroupFail(true);
      fail = true;
    }
    if (description === "") {
      setDescriptionFail(true);
      fail = true;
    }
    if (flashcardsFail.some((bool) => bool)) {
      fail = true;
    }
    if (fail) {
      return;
    }

    alert("Created new deck: " + title);
    dispatch(
      createDeck({
        name: title,
        group: group,
        description: description,
      })
    );
    for (let i = 0; i < flashcards.length; i++) {
      dispatch(
        createFlashcard({
          deck: title,
          group: group,
          front: flashcards[i].front,
          back: flashcards[i].back,
        })
      );
    }

    navigate("/decks/" + group + "/" + title +  "/practice");
  }

  return (
    <main>
      <section className={"flex " + styles.createDeck}>
        <div className={"flex " + styles.create}>
          <h1>Create a new deck</h1>
          <PrimaryButton onClick={handleSubmit}>Create</PrimaryButton>
        </div>
        <div className={"flex " + styles.titleGroup}>
          <Textbox
            value={title}
            setValue={setTitle}
            label="Title"
            placeholder="Enter title here"
            error1={titleFail ? "*Please enter a title" : null}
          />
          <Dropdown
            className={styles.groupButtonContents}
            width="30rem"
            state={group}
            setState={setGroup}
            error={groupFail ? "*Please select a group" : null}
          />
        </div>
        <Textbox
          value={description}
          setValue={setDescription}
          className={styles.description}
          label="Description"
          placeholder="Enter description here"
          rows="3"
          error1={descriptionFail ? "*Please enter a description" : null}
        />
      </section>
      <section className={"flex " + styles.addFlashcards}>
        <div className={"flex " + styles.addFlashcardsTitle}>
          <h2>Add Flashcards</h2>
          {flashcardsFail.some((bool) => bool) && submitted ? (
            <p>*A minimum of 3 flashcards is required to create a deck</p>
          ) : null}
        </div>
        <div className={"flex " + styles.flashcardsButton}>
          <div className={"flex " + styles.flashcards}>{flashcardList}</div>
          <PrimaryButton
            className={styles.addButton}
            onClick={() => {
              setFlashcards([...flashcards, {}]);
            }}
          >
            <div className={"flex " + styles.addFlashcardButton}>
              <h3>Add card</h3>
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
          </PrimaryButton>
        </div>
      </section>
    </main>
  );
}

export default NewDeckPage;
