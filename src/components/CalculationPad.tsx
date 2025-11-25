import React, { useState } from "react";

interface CalculationPadProps {
  num1: number;
  num2: number;
}

const CalculationPad: React.FC<CalculationPadProps> = ({ num1, num2 }) => {
  const [grid, setGrid] = useState<string[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(4).fill(""))
  );
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>({ row: 0, col: 3 });

  const handleCellClick = (row: number, col: number) => {
    setActiveCell({ row, col });
  };

  const handleNumpadClick = (num: string) => {
    if (activeCell) {
      const newGrid = grid.map((r) => [...r]);
      newGrid[activeCell.row][activeCell.col] = num;
      setGrid(newGrid);

      const nextCol = activeCell.col - 1;
      if (nextCol >= 0) {
        setActiveCell({ row: activeCell.row, col: nextCol });
      } else if (activeCell.row < 2) {
        setActiveCell({ row: activeCell.row + 1, col: 3 });
      } else {
        setActiveCell(null);
      }
    }
  };

  const handleBackspaceClick = () => {
    // Define the order of cells as they are filled (top-to-bottom, right-to-left)
    const cellOrder: { row: number; col: number }[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 3; c >= 0; c--) {
        cellOrder.push({ row: r, col: c });
      }
    }

    // Find the last cell that was filled by searching backwards through the fill order
    let lastFilledCell: { row: number; col: number } | null = null;
    for (let i = cellOrder.length - 1; i >= 0; i--) {
      const { row, col } = cellOrder[i];
      if (grid[row][col] !== "") {
        lastFilledCell = { row, col };
        break;
      }
    }

    if (lastFilledCell) {
      // Clear the found cell and move the active cursor to it
      const { row, col } = lastFilledCell;
      const newGrid = grid.map((r) => [...r]);
      newGrid[row][col] = "";
      setGrid(newGrid);
      setActiveCell({ row, col });
    }
  };

  const num1Digits = num1.toString().padStart(2, ' ').split('');
  const num2Digits = num2.toString().padStart(2, ' ').split('');

  return (
    <div className="flex flex-col items-center p-4 bg-slate-100 rounded-lg">
      <div className="w-[220px] tabular-nums">
        <div className="text-2xl font-bold">
          <div className="h-12 flex justify-end items-center">
            <span className="w-12 text-center">{num1Digits[0]}</span>
            <span className="w-12 text-center">{num1Digits[1]}</span>
          </div>
          <div className="h-12 flex justify-end items-center">
            <span className="w-12 text-center">x</span>
            <span className="w-12 text-center">{num2Digits[0]}</span>
            <span className="w-12 text-center">{num2Digits[1]}</span>
          </div>
        </div>
        <hr className="border-black" />
        <div className="space-y-1 mt-1">
          {grid.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div className="flex space-x-1">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`w-12 h-12 text-2xl flex items-center justify-center border-2 rounded ${
                      activeCell?.row === rowIndex && activeCell?.col === colIndex
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    } cursor-pointer`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
              {rowIndex === 1 && <hr className="border-black my-1" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[220px] mt-4">
        {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((num) => (
          <button
            key={num}
            onClick={() => handleNumpadClick(num)}
            className="w-full h-12 text-2xl bg-white border rounded-lg hover:bg-gray-200"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleBackspaceClick}
          className="w-full h-12 text-xl bg-yellow-500 text-white border rounded-lg hover:bg-yellow-600"
        >
          BS
        </button>
        <button
          onClick={() => handleNumpadClick("0")}
          className="w-full h-12 text-2xl bg-white border rounded-lg hover:bg-gray-200"
        >
          0
        </button>
      </div>
    </div>
  );
};

export default CalculationPad;
