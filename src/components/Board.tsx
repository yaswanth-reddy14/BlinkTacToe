import React from 'react';
import Cell from './Cell';
import { CellValue } from '../types/gameTypes';

interface BoardProps {
  board: CellValue[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, winningLine, disabled }) => {
  const isWinningCell = (index: number) => {
    return winningLine !== null && winningLine.includes(index);
  };

  return (
    <div className={`grid grid-cols-3 gap-3 md:gap-4 mx-auto ${disabled ? 'pointer-events-none' : ''}`}>
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinningCell={isWinningCell(index)}
        />
      ))}
    </div>
  );
};

export default Board;