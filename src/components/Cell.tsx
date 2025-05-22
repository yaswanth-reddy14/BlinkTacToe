import React from 'react';
import { CellValue } from '../types/gameTypes';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinningCell: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell }) => {
  const getPlayerClass = () => {
    if (!value) return '';
    return value.player === 1 ? 'player-one' : 'player-two';
  };

  return (
    <div 
      className={`
        flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-white
        rounded-lg shadow-md cursor-pointer border-2 transition-all duration-300
        hover:shadow-lg ${getPlayerClass()} 
        ${isWinningCell ? 'winning-cell animate-pulse border-amber-400 border-4' : 'border-gray-200'}
      `}
      onClick={onClick}
    >
      {value && (
        <span className="text-5xl md:text-6xl animate-pop-in">{value.emoji}</span>
      )}
    </div>
  );
};

export default Cell;