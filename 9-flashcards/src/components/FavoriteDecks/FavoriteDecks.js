import styles from "./FavoriteDecks.module.css";
import DeckPreview from "../DeckPreview/DeckPreview";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function FavoriteDecks() {
  let favoriteDecks = useSelector((state) => state.flashcard.favoriteDecks);
  favoriteDecks = favoriteDecks.map((deck, index) => (
    <Link to={"/deck/" + deck.name + "/practice"} style={{ textDecoration: "none", width: "100%" }}>
      <DeckPreview key={index} text={deck.name} />
    </Link>
  ));

  if (favoriteDecks.length === 0) return null;
  return (
    <div className={"flex " + styles.container}>
      <h2>Favorites</h2>
      <div className={"flex " + styles.deckContainer}>{favoriteDecks}</div>
    </div>
  );
}

export default FavoriteDecks;
