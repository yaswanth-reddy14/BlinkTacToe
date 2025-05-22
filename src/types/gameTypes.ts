export type EmojiCategory = {
  name: string;
  emojis: string[];
  icon: string;
};

export type Player = 1 | 2;

export type CellValue = {
  emoji: string;
  player: Player;
  timestamp: number;
} | null;

export type GameState = {
  board: CellValue[];
  currentPlayer: Player;
  playerCategories: {
    1: EmojiCategory | null;
    2: EmojiCategory | null;
  };
  gameStatus: 'category-selection' | 'playing' | 'won' | 'draw';
  winner: Player | null;
  winningLine: number[] | null;
  playerEmojis: {
    1: {emoji: string; position: number; timestamp: number}[];
    2: {emoji: string; position: number; timestamp: number}[];
  };
  scores: {
    1: number;
    2: number;
  };
};