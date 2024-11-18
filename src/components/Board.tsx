import React from 'react';
import { Car } from '../types';

interface BoardProps {
  cars: Car[];
}

export function Board({ cars }: BoardProps) {
  // Initialize empty 6x6 grid
  const grid = Array(6)
    .fill(null)
    .map(() => Array(6).fill(null));

  // Place cars on the grid with boundary checking
  cars.forEach((car) => {
    const { position, length, orientation } = car;
    const { row, col } = position;

    // Validate car position
    if (row < 0 || col < 0) return;
    if (orientation === 'horizontal' && (col + length > 6 || row >= 6)) return;
    if (orientation === 'vertical' && (row + length > 6 || col >= 6)) return;

    // Place car on grid
    for (let i = 0; i < length; i++) {
      const cellRow = orientation === 'horizontal' ? row : row + i;
      const cellCol = orientation === 'horizontal' ? col + i : col;

      if (cellRow >= 0 && cellRow < 6 && cellCol >= 0 && cellCol < 6) {
        grid[cellRow][cellCol] = {
          ...car,
          isStart: i === 0,
          isEnd: i === length - 1,
          isMiddle: i > 0 && i < length - 1,
        };
      }
    }
  });

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Column indicators */}
      <div className="flex ml-12">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <div
              key={`col-${i}`}
              className="w-16 h-8 flex items-center justify-center text-gray-600 font-semibold"
            >
              {i}
            </div>
          ))}
      </div>

      <div className="flex">
        {/* Row indicators */}
        <div className="flex flex-col mr-2">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                key={`row-${i}`}
                className="w-10 h-16 flex items-center justify-center text-gray-600 font-semibold"
              >
                {i}
              </div>
            ))}
        </div>

        {/* Game board */}
        <div className="relative">
          {/* Exit marker */}
          <div className="absolute -right-4 top-1/3 h-16 w-4 bg-red-200 rounded-r-lg flex items-center justify-center">
            <span className="text-red-600 font-bold">→</span>
          </div>

          <div className="grid grid-cols-6 gap-1 bg-gray-800 p-2 rounded-lg">
            {grid.map((row, rowIndex) => (
              <React.Fragment key={`row-${rowIndex}`}>
                {row.map((cell, colIndex) => {
                  const isRedCar = cell?.id === 'X';

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        w-16 h-16 
                        relative
                        flex items-center justify-center 
                        text-white font-bold
                        transition-all duration-300 ease-in-out
                        ${cell ? cell.color : 'bg-gray-700'}
                    
                        ${isRedCar ? 'shadow-lg shadow-red-500/50 z-10' : ''}
                        ${
                          cell?.orientation === 'horizontal'
                            ? cell.isStart
                              ? 'rounded-l-md rounded-r-none'
                              : cell.isEnd
                              ? 'rounded-r-md rounded-l-none'
                              : 'rounded-none'
                            : cell?.orientation === 'vertical'
                            ? cell.isStart
                              ? 'rounded-t-md rounded-b-none'
                              : cell.isEnd
                              ? 'rounded-b-md rounded-t-none'
                              : 'rounded-none'
                            : 'rounded-md'
                        }
                      `}
                    >
                      {/* Car ID label */}
                      {cell?.isStart && (
                        <span
                          className={`text-xl ${
                            isRedCar ? 'animate-pulse' : ''
                          }`}
                        >
                          {cell.id}
                        </span>
                      )}

                      {/* Movement guides */}
                      {cell && (
                        <div className="absolute inset-0 pointer-events-none">
                          {cell.orientation === 'horizontal' && (
                            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-600/30 transform -translate-y-1/2" />
                          )}
                          {cell.orientation === 'vertical' && (
                            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-600/30 transform -translate-x-1/2" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
