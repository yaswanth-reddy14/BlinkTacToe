import React from 'react';
import { Player } from '../types/gameTypes';

interface GameStatusProps {
  currentPlayer: Player;
  gameStatus: 'category-selection' | 'playing' | 'won' | 'draw';
  winner: Player | null;
  scores: {
    1: number;
    2: number;
  };
  resetGame: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ 
  currentPlayer, 
  gameStatus, 
  winner, 
  scores,
  resetGame
}) => {
  const getStatusMessage = () => {
    if (gameStatus === 'category-selection') {
      return 'Select your emoji categories';
    } else if (gameStatus === 'won') {
      return `Player ${winner} Wins! 🎉`;
    } else if (gameStatus === 'draw') {
      return "It's a Draw!";
    } else {
      return `Player ${currentPlayer}'s Turn`;
    }
  };

  const getStatusClasses = () => {
    if (gameStatus === 'won') {
      return winner === 1 ? 'text-indigo-600' : 'text-rose-500';
    } else if (gameStatus === 'draw') {
      return 'text-amber-500';
    } else if (gameStatus === 'playing') {
      return currentPlayer === 1 ? 'text-indigo-600' : 'text-rose-500';
    }
    return '';
  };

  return (
    <div className="w-full max-w-md mx-auto my-4 flex flex-col items-center">
      <div className="flex justify-between w-full mb-2">
        <div className={`text-lg font-bold ${currentPlayer === 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
          Player 1: {scores[1]}
        </div>
        <div className={`text-lg font-bold ${currentPlayer === 2 ? 'text-rose-500' : 'text-gray-400'}`}>
          Player 2: {scores[2]}
        </div>
      </div>

      <h2 className={`text-2xl font-bold my-2 ${getStatusClasses()}`}>
        {getStatusMessage()}
      </h2>

      {(gameStatus === 'won' || gameStatus === 'draw') && (
        <button
          onClick={resetGame}
          className="mt-3 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full
            font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default GameStatus;