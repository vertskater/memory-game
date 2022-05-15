import { useState, useEffect } from "react";
import axios from "axios";
import update from "immutability-helper";

import MemoryCard from "../MemoryCard";
import Card from "./Card";
import ScoreBoard from "./ScoreBoard";

export default function Game() {
  const [gameCards, setGameCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://vertskater.github.io/json-files/data.json"
      );
      saveCards(data);
    };
    fetchData();
  }, []);

  function saveCards(cards) {
    const memoryCards = [];
    cards.card.forEach((card) => {
      const memoryCard = new MemoryCard(card.id, card.name, card.img);
      memoryCards.push(memoryCard);
    });
    setGameCards(update(gameCards, { $set: memoryCards }));
  }

  const [score, setScore] = useState({
    currentScore: 0,
    bestScore: 0,
    cards: [],
  });
  function play(id) {
    let clickedCards = score.cards;
    let bestScore = score.bestScore;
    let currentScore = score.currentScore;
    let clickedAgain = false;

    if (clickedCards.length > 0) {
      clickedCards.forEach((item) => {
        if (id === item) {
          clickedAgain = true;
        }
      });
    }

    if (clickedAgain) {
      clickedCards = [];
      if (currentScore > bestScore) {
        bestScore = currentScore;
        currentScore = 0;
      } else {
        currentScore = 0;
      }
      clickedAgain = false;
    } else {
      clickedCards.push(id);
      currentScore++;
    }

    setScore(
      update(score, {
        currentScore: { $set: currentScore },
        bestScore: { $set: bestScore },
        cards: { $set: clickedCards },
      })
    );
  }

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
