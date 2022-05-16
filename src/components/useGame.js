import { useState, useEffect } from "react";
import update from "immutability-helper";
import axios from "axios";

import MemoryCard from "../MemoryCard";

export default function useGame() {
  const [gameCards, setGameCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://vertskater.github.io/json-files/data.json"
      );
      saveCards(data);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  /* useEffect(() => {
    if (
      score.currentScore > 0 &&
      score.cards.length > 0 &&
      (score.bestScore === 0 || score.bestScore > 0)
    ) {
      let memoryCards = gameCards;
      rearrangeCards(memoryCards);
    }
  }, [score.currentScore, score.cards, score.bestScore, gameCards]); */

  const rearrangeCards = (memoryCards) => {
    memoryCards.sort(() => {
      return Math.random() > 0.5 ? 1 : -1;
    });
    console.log(memoryCards);
    setGameCards(update(gameCards, { $set: memoryCards }));
  };

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
    let memoryCards = gameCards;
    rearrangeCards(memoryCards);
  }
  return [score, gameCards, play];
}
