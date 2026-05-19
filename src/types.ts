export type CardType = {
  id: string;
  pairId: string; // Identificador do par
  image: string; // URL ou símbolo
  isFlipped: boolean;
  isMatched: boolean;
};

export type Player = {
  id: number;
  name: string;
  score: number;
};

export type Theme = {
  name: string;
  cards: string[]; // Array de imagens/símbolos
};

export type GameState = {
  cards: CardType[];
  players: Player[];
  currentPlayerIndex: number;
  flippedCards: CardType[];
  gameOver: boolean;
  theme: Theme;
};