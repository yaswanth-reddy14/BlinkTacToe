import React from 'react';
import { emojiCategories } from './utils/emojiCategories';
import useGameState from './hooks/useGameState';
import Board from './components/Board';
import CategorySelector from './components/CategorySelector';
import GameStatus from './components/GameStatus';
import HelpModal from './components/HelpModal';
import { HelpCircle } from 'lucide-react';
import './styles/App.css';

function App() {
  const {
    gameState,
    onCellClick,
    onSelectCategory,
    resetGame,
    showHelp,
    toggleHelp
  } = useGameState();

  const { 
    board, 
    currentPlayer, 
    playerCategories, 
    gameStatus, 
    winner, 
    winningLine,
    scores
  } = gameState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
            Blink Tac Toe
          </h1>
          <p className="text-gray-600 mt-1">A twist on the classic game with disappearing emojis</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-5 md:p-8 mb-6">
          {gameStatus === 'category-selection' ? (
            // Category Selection Phase
            <div className="space-y-6">
              {!playerCategories[1] && (
                <CategorySelector 
                  categories={emojiCategories}
                  onSelectCategory={onSelectCategory}
                  player={1}
                  selectedCategory={playerCategories[1]}
                />
              )}
              
              {playerCategories[1] && !playerCategories[2] && (
                <CategorySelector 
                  categories={emojiCategories}
                  onSelectCategory={onSelectCategory}
                  player={2}
                  selectedCategory={playerCategories[2]}
                />
              )}
            </div>
          ) : (
            // Game Board Phase
            <>
              <GameStatus 
                currentPlayer={currentPlayer}
                gameStatus={gameStatus}
                winner={winner}
                scores={scores}
                resetGame={() => resetGame(true)}
              />
              
              <div className="mb-6">
                <div className="flex justify-center gap-4 mb-4">
                  <div className={`px-4 py-2 rounded-lg ${currentPlayer === 1 ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                    <span className="font-medium text-indigo-700">Player 1:</span> {playerCategories[1]?.icon} {playerCategories[1]?.name}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${currentPlayer === 2 ? 'bg-rose-100' : 'bg-gray-100'}`}>
                    <span className="font-medium text-rose-600">Player 2:</span> {playerCategories[2]?.icon} {playerCategories[2]?.name}
                  </div>
                </div>
                
                <Board 
                  board={board}
                  onCellClick={onCellClick}
                  winningLine={winningLine}
                  disabled={gameStatus === 'won' || gameStatus === 'draw'}
                />
              </div>
            </>
          )}
          
          <div className="flex justify-center mt-4">
            <button 
              onClick={toggleHelp}
              className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <HelpCircle size={18} />
              <span>Game Rules</span>
            </button>
          </div>
        </div>
        
        <footer className="text-center text-gray-500 text-sm">
          <p>© 2025 Blink Tac Toe - A unique twist on a classic game</p>
        </footer>
      </div>
      
      <HelpModal isOpen={showHelp} onClose={toggleHelp} />
    </div>
  );
}

export default App;