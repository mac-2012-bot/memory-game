import type { CardType, Theme, GameState, Player } from './types';
import { MOVES_PER_LEVEL } from './types';
import { v4 as uuidv4 } from 'uuid';

// Baralhar array (Fisher-Yates)
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Criar cartas a partir de um tema
export const createCards = (theme: Theme): CardType[] => {
  const cards: CardType[] = [];
  theme.cards.forEach((image) => {
    const pairId = uuidv4();
    cards.push(
      { id: uuidv4(), pairId, image, isFlipped: false, isMatched: false },
      { id: uuidv4(), pairId, image, isFlipped: false, isMatched: false }
    );
  });
  return shuffleArray(cards);
};

// Velocidade progressiva — começa devagar, acelera com o nível
// Nível 1: 2000ms, Nível 2: 1800ms, ... mínimo 400ms
export const flipDelayForLevel = (level: number): number => {
  const base = 2000;
  const decay = 200 * (level - 1);
  return Math.max(400, base - decay);
};

// Inicializar estado do jogo
export const initializeGame = (players: Player[], theme: Theme): GameState => {
  return {
    cards: createCards(theme),
    players,
    currentPlayerIndex: 0,
    flippedCards: [],
    gameOver: false,
    theme,
    level: 1,
    movesInLevel: 0,
    flipDelayMs: flipDelayForLevel(1),
  };
};

// Virar uma carta
export const flipCard = (gameState: GameState, cardId: string): GameState => {
  const { cards, flippedCards, currentPlayerIndex, players } = gameState;
  const newCards = cards.map((card) =>
    card.id === cardId ? { ...card, isFlipped: true } : card
  );
  const flippedCard = newCards.find((card) => card.id === cardId);
  if (!flippedCard || flippedCards.length >= 2) return gameState;

  const newFlippedCards = [...flippedCards, flippedCard];

  // Se já virou 2 cartas, verifica se são par
  if (newFlippedCards.length === 2) {
    const [firstCard, secondCard] = newFlippedCards;
    if (firstCard.pairId === secondCard.pairId) {
      // Par encontrado!
      const updatedCards = newCards.map((card) =>
        card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card
      );
      const updatedPlayers = players.map((player, index) =>
        index === currentPlayerIndex ? { ...player, score: player.score + 1 } : player
      );
      return {
        ...gameState,
        cards: updatedCards,
        players: updatedPlayers,
        flippedCards: [],
        movesInLevel: gameState.movesInLevel + 1,
      };
    } else {
      // Não é par, passa a vez
      return {
        ...gameState,
        cards: newCards,
        flippedCards: newFlippedCards,
        currentPlayerIndex: (currentPlayerIndex + 1) % players.length,
        movesInLevel: gameState.movesInLevel + 1,
      };
    }
  }

  return { ...gameState, cards: newCards, flippedCards: newFlippedCards };
};

// Resetar cartas viradas (após o delay do nível)
export const resetFlippedCards = (gameState: GameState): GameState => {
  const { cards, flippedCards, movesInLevel, level } = gameState;
  if (flippedCards.length !== 2) return gameState;

  const updatedCards = cards.map((card) =>
    flippedCards.some((flipped) => flipped.id === card.id && !card.isMatched)
      ? { ...card, isFlipped: false }
      : card
  );

  // Verifica se passámos de nível (a cada MOVES_PER_LEVEL jogadas)
  const didLevelUp = movesInLevel >= MOVES_PER_LEVEL;
  const newLevel = didLevelUp ? level + 1 : level;
  const newMoves = didLevelUp ? 0 : movesInLevel;

  return {
    ...gameState,
    cards: updatedCards,
    flippedCards: [],
    level: newLevel,
    movesInLevel: newMoves,
    flipDelayMs: flipDelayForLevel(newLevel),
  };
};

// Verificar se o jogo acabou
export const checkGameOver = (gameState: GameState): GameState => {
  const allMatched = gameState.cards.every((card) => card.isMatched);
  return { ...gameState, gameOver: allMatched };
};
