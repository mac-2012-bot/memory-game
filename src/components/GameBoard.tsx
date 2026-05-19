import React, { useState, useEffect } from 'react';
import { GameState, Player, Theme } from '../types';
import { initializeGame, flipCard, resetFlippedCards, checkGameOver } from '../utils';
import Card from './Card';
import '../styles/GameBoard.css';

interface GameBoardProps {
  players: Player[];
  theme: Theme;
  onGameOver: (winner: Player) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ players, theme, onGameOver }) => {
  const [gameState, setGameState] = useState<GameState>(
    initializeGame(players, theme)
  );

  // Resetar cartas viradas após 1 segundo
  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const timer = setTimeout(() => {
        setGameState((prev) => resetFlippedCards(prev));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.flippedCards]);

  // Verificar se o jogo acabou
  useEffect(() => {
    const updatedGameState = checkGameOver(gameState);
    if (updatedGameState.gameOver) {
      const winner = updatedGameState.players.reduce((prev, current) =>
        prev.score > current.score ? prev : current
      );
      onGameOver(winner);
    }
    setGameState(updatedGameState);
  }, [gameState.cards]);

  const handleCardClick = (cardId: string) => {
    // Só permite virar cartas se não houver 2 já viradas
    if (gameState.flippedCards.length < 2) {
      setGameState((prev) => flipCard(prev, cardId));
    }
  };

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  return (
    <div className="game-board">
      <div className="game-info">
        <h2>Tema: {gameState.theme.name}</h2>
        <h3>Vez de: {currentPlayer.name}</h3>
        <div className="scores">
          {gameState.players.map((player) => (
            <div key={player.id} className="player-score">
              <span>{player.name}: {player.score}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="cards-grid">
        {gameState.cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;