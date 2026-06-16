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
  level: number; // Nível atual (1, 2, 3, ...)
  movesInLevel: number; // Jogadas feitas no nível atual
  flipDelayMs: number; // Tempo que as cartas ficam viradas (ms) — baixa com o nível
};

// Cores de fundo por nível (passa a cor de fundo do tabuleiro)
export const LEVEL_BACKGROUNDS: string[] = [
  '#fef3c7', // 1 — amarelo claro
  '#dbeafe', // 2 — azul claro
  '#dcfce7', // 3 — verde claro
  '#fce7f3', // 4 — rosa claro
  '#ede9fe', // 5 — lilás claro
  '#ffe4c4', // 6 — bege
  '#cffafe', // 7 — ciano claro
  '#fee2e2', // 8 — vermelho claro
  '#f0fdf4', // 9 — verde menta
  '#fafafa', // 10 — neutro
];

export const MOVES_PER_LEVEL = 5;
