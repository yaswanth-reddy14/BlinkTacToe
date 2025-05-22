import React from 'react';
import { EmojiCategory, Player } from '../types/gameTypes';

interface CategorySelectorProps {
  categories: EmojiCategory[];
  onSelectCategory: (player: Player, categoryIndex: number) => void;
  player: Player;
  selectedCategory: EmojiCategory | null;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  categories, 
  onSelectCategory, 
  player,
  selectedCategory
}) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <h2 className={`text-xl font-bold mb-3 ${player === 1 ? 'text-indigo-600' : 'text-rose-500'}`}>
        Player {player} - Choose your emoji category
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onSelectCategory(player, index)}
            className={`
              p-3 rounded-lg shadow-sm flex flex-col items-center justify-center
              transition-all duration-300 hover:shadow-md
              ${selectedCategory?.name === category.name 
                ? `${player === 1 ? 'bg-indigo-100 border-indigo-500' : 'bg-rose-100 border-rose-500'} border-2` 
                : 'bg-white hover:bg-gray-50 border-2 border-transparent'}
            `}
          >
            <span className="text-3xl mb-1">{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
            <div className="flex mt-1 text-lg">
              {category.emojis.slice(0, 3).map((emoji, i) => (
                <span key={i} className="mx-0.5">{emoji}</span>
              ))}
              <span>...</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;