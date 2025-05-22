import { CellValue, GameState, Player } from '../types/gameTypes';
import { getRandomEmoji } from './emojiCategories';

// Check for a winner
export const checkWinner = (board: CellValue[]): { winner: Player | null; winningLine: number[] | null } => {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6]  // diagonal top-right to bottom-left
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[b] && board[c] &&
        board[a]?.player === board[b]?.player && 
        board[b]?.player === board[c]?.player) {
      return { winner: board[a]!.player, winningLine: line };
    }
  }

  return { winner: null, winningLine: null };
};

// Check if the board is full
export const isBoardFull = (board: CellValue[]): boolean => {
  return board.every(cell => cell !== null);
};

// Get the oldest emoji index for a player
export const getOldestEmojiIndex = (playerEmojis: { emoji: string; position: number; timestamp: number }[]): number => {
  if (playerEmojis.length === 0) return -1;
  
  let oldestIndex = 0;
  let oldestTimestamp = playerEmojis[0].timestamp;
  
  for (let i = 1; i < playerEmojis.length; i++) {
    if (playerEmojis[i].timestamp < oldestTimestamp) {
      oldestTimestamp = playerEmojis[i].timestamp;
      oldestIndex = i;
    }
  }
  
  return oldestIndex;
};

// Handle cell click
export const handleCellClick = (index: number, gameState: GameState): GameState => {
  // If game is not in playing state or cell is already occupied, do nothing
  if (gameState.gameStatus !== 'playing' || gameState.board[index] !== null) {
    return gameState;
  }

  const currentPlayer = gameState.currentPlayer;
  const currentCategory = gameState.playerCategories[currentPlayer];
  
  if (!currentCategory) return gameState;
  
  // Create a copy of the board
  const newBoard = [...gameState.board];
  // Create a copy of player emojis
  const newPlayerEmojis = {
    1: [...gameState.playerEmojis[1]],
    2: [...gameState.playerEmojis[2]]
  };
  
  const currentEmoji = getRandomEmoji(currentCategory);
  const currentTimestamp = Date.now();
  
  // Check if player already has 3 emojis on the board
  if (newPlayerEmojis[currentPlayer].length >= 3) {
    // Find the oldest emoji and remove it
    const oldestIndex = getOldestEmojiIndex(newPlayerEmojis[currentPlayer]);
    if (oldestIndex !== -1) {
      const oldestPosition = newPlayerEmojis[currentPlayer][oldestIndex].position;
      newBoard[oldestPosition] = null;
      newPlayerEmojis[currentPlayer].splice(oldestIndex, 1);
    }
  }
  
  // Add new emoji to the board
  newBoard[index] = {
    emoji: currentEmoji,
    player: currentPlayer,
    timestamp: currentTimestamp
  };
  
  // Add to player emojis
  newPlayerEmojis[currentPlayer].push({
    emoji: currentEmoji,
    position: index,
    timestamp: currentTimestamp
  });
  
  // Check for winner
  const { winner, winningLine } = checkWinner(newBoard);
  
  // Update scores if there's a winner
  const newScores = { ...gameState.scores };
  if (winner) {
    newScores[winner] += 1;
  }
  
  // Determine new game status
  let newGameStatus = gameState.gameStatus;
  if (winner) {
    newGameStatus = 'won';
  } else if (isBoardFull(newBoard)) {
    newGameStatus = 'draw';
  }
  
  // Switch player if game continues
  const nextPlayer = currentPlayer === 1 ? 2 : 1;
  
  return {
    ...gameState,
    board: newBoard,
    currentPlayer: winner ? currentPlayer : nextPlayer,
    winner,
    winningLine,
    gameStatus: newGameStatus,
    playerEmojis: newPlayerEmojis,
    scores: newScores
  };
};

// Initialize new game
export const initializeGame = (preserveCategories = false, prevState?: GameState): GameState => {
  const initialPlayerCategories = preserveCategories && prevState 
    ? prevState.playerCategories 
    : { 1: null, 2: null };
  
  const initialGameStatus = preserveCategories && 
    prevState?.playerCategories[1] !== null && 
    prevState?.playerCategories[2] !== null 
      ? 'playing' 
      : 'category-selection';

  const prevScores = prevState?.scores || { 1: 0, 2: 0 };
  
  return {
    board: Array(9).fill(null),
    currentPlayer: 1,
    playerCategories: initialPlayerCategories,
    gameStatus: initialGameStatus,
    winner: null,
    winningLine: null,
    playerEmojis: {
      1: [],
      2: []
    },
    scores: prevScores
  };
};

// Select category for a player
export const selectCategory = (player: Player, categoryIndex: number, categories: any[], gameState: GameState): GameState => {
  const newPlayerCategories = {
    ...gameState.playerCategories,
    [player]: categories[categoryIndex]
  };
  
  // Check if both players have selected categories
  const bothSelected = newPlayerCategories[1] !== null && newPlayerCategories[2] !== null;
  
  return {
    ...gameState,
    playerCategories: newPlayerCategories,
    gameStatus: bothSelected ? 'playing' : 'category-selection'
  };
};