import styles from "./FavoriteDecks.module.css";
import DeckPreview from "../DeckPreview/DeckPreview";
import React from "react";
import { useSelector } from "react-redux";

function FavoriteDecks() {
  let favoriteDecks = useSelector((state) => state.flashcard.favoriteDecks)
  favoriteDecks = favoriteDecks.map((deck, index) => <DeckPreview key={index} text={deck.name} />)

  if (favoriteDecks.length === 0) return null;
  return (
    <div className={"flex " + styles.container}>
      <h2>Favorites</h2>
      <div className={"flex " + styles.deckContainer}>
        {favoriteDecks}
      </div>
    </div>
  );
}


export default FavoriteDecks;