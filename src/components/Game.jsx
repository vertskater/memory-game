import { useState, useEffect } from "react";

import Card from "./Card";
import ScoreBoard from "./ScoreBoard";
import useGame from "./useGame";

export default function Game() {
  const [score, gameCards, play] = useGame();

  const card = Object.values(gameCards).map((card, index) => {
    return (
      <div className="memory-card" key={index} onClick={() => play(card.id)}>
        <Card cardData={card} onSelectedCard={play} />
      </div>
    );
  });

  return (
    <>
      <h1>Memory Game</h1>
      <div className="score-board">
        <ScoreBoard score={score.currentScore} bestScore={score.bestScore} />
      </div>
      <div className="game-board">{card}</div>
    </>
  );
}
