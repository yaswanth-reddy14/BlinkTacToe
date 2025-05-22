import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-700">Blink Tac Toe - Game Rules</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">How to Play</h3>
              <p className="text-gray-700">
                Blink Tac Toe is a twist on the classic Tic Tac Toe game where emojis appear and disappear!
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">Game Setup</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Each player selects an emoji category before the game starts</li>
                <li>The game is played on a 3x3 grid</li>
                <li>Player 1 goes first, then players alternate turns</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">Special Rules</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Each player can only have a maximum of 3 emojis on the board at once</li>
                <li>When placing a 4th emoji, your oldest emoji disappears</li>
                <li>A random emoji from your category is assigned each turn</li>
                <li>Win by getting 3 of your emojis in a row (horizontal, vertical, or diagonal)</li>
              </ul>
            </section>
            
            <section className="bg-indigo-50 p-3 rounded-lg">
              <h3 className="text-lg font-semibold mb-1 text-indigo-700">Strategy Tips</h3>
              <p className="text-gray-700">
                Remember that your oldest emoji will disappear when you place a 4th one! 
                Use this to your advantage by planning ahead and potentially disrupting your opponent's winning line.
              </p>
            </section>
          </div>
          
          <button
            onClick={onClose}
            className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium w-full
              hover:bg-indigo-700 transition-colors duration-300"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;