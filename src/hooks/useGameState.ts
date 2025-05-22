import { useState, useEffect } from 'react';
import { GameState, Player } from '../types/gameTypes';
import { initializeGame, handleCellClick, selectCategory } from '../utils/gameLogic';
import { emojiCategories } from '../utils/emojiCategories';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [showHelp, setShowHelp] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Show help modal on first load
  useEffect(() => {
    if (initialLoad) {
      const timer = setTimeout(() => {
        setShowHelp(true);
        setInitialLoad(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

  // Handle cell click
  const onCellClick = (index: number) => {
    setGameState(prevState => handleCellClick(index, prevState));
  };

  // Select category for a player
  const onSelectCategory = (player: Player, categoryIndex: number) => {
    setGameState(prevState => selectCategory(player, categoryIndex, emojiCategories, prevState));
  };

  // Reset the game
  const resetGame = (preserveCategories = true) => {
    setGameState(prevState => initializeGame(preserveCategories, prevState));
  };

  // Toggle help modal
  const toggleHelp = () => {
    setShowHelp(prev => !prev);
  };

  return {
    gameState,
    onCellClick,
    onSelectCategory,
    resetGame,
    showHelp,
    toggleHelp
  };
};

export default useGameState;