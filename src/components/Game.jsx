import { useState, useEffect } from "react";
import classNames from "classnames";

import Card from "./Card";
import ScoreBoard from "./ScoreBoard";
import useGame from "./useGame";

export default function Game() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    const scoreBoard = document.querySelector(".score-board");
    const topPosition = scoreBoard.getBoundingClientRect();
    if (topPosition.top <= 0) {
      setSticky({ sticky: !sticky });
    }
    console.log(window.innerHeight, topPosition.top);
  };
  //import game logic and data
  const [score, gameCards, play] = useGame();

  const card = Object.values(gameCards).map((card, index) => {
    return (
      <div className="memory-card" key={index} onClick={() => play(card.id)}>
        <Card cardData={card} onSelectedCard={play} />
      </div>
    );
  });

  const className = classNames("score-board", {
    sticky: sticky,
    noSticky: !sticky,
  });
  return (
    <>
      <h1>Memory Game</h1>
      <div className={className}>
        <ScoreBoard score={score.currentScore} bestScore={score.bestScore} />
      </div>
      <div className="game-board">{card}</div>
    </>
  );
}
