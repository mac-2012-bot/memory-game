export interface CardType {
  id: string;
  pairId: string; // Identificador do par
  image: string; // URL ou símbolo
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface Theme {
  name: string;
  cards: string[]; // Array de imagens/símbolos
}

export interface GameState {
  cards: CardType[];
  players: Player[];
  currentPlayerIndex: number;
  flippedCards: CardType[];
  gameOver: boolean;
  theme: Theme;
}