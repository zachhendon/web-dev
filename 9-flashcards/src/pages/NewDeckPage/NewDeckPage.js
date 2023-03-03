import styles from "./NewDeckPage.module.css";
import Textbox from "../../components/Textbox/Textbox";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { useState } from "react";

function NewDeckPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <main>
      <section className={"flex " + styles.createDeck}>
        <div className={"flex " + styles.create}>
          <h1>Create a new deck</h1>
          <PrimaryButton>Create</PrimaryButton>
        </div>
        <div className={"flex " + styles.titleGroup}>
          <Textbox
            value={title}
            setValue={setTitle}
            label="Title"
            placeholder="Enter title here"
          />
          <SecondaryButton>
            <div className={"flex " + styles.groupButtonContents}>
              <p>No group</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M112 184l144 144 144-144"
                />
              </svg>
            </div>
          </SecondaryButton>
        </div>
        <Textbox
          value={description}
          setValue={setDescription}
          className={styles.description}
          label="Description"
          placeholder="Enter description here"
          rows="3"
        />
      </section>
    </main>
  );
}

export default NewDeckPage;
