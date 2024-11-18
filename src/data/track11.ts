import { Car, Move } from '../types';

export const initialCars: Car[] = [
  { id: 'X', length: 2, orientation: 'horizontal', position: { row: 2, col: 1 }, color: 'bg-red-500' },
  { id: 'A', length: 2, orientation: 'horizontal', position: { row: 0, col: 0 }, color: 'bg-green-500' },
  { id: 'B', length: 2, orientation: 'vertical', position: { row: 1, col: 2 }, color: 'bg-orange-500' },
  { id: 'C', length: 2, orientation: 'horizontal', position: { row: 1, col: 0 }, color: 'bg-sky-500' },
  { id: 'D', length: 2, orientation: 'vertical', position: { row: 3, col: 1 }, color: 'bg-pink-500' },
  { id: 'E', length: 2, orientation: 'horizontal', position: { row: 3, col: 2 }, color: 'bg-purple-500' },
  { id: 'O', length: 2, orientation: 'vertical', position: { row: 0, col: 3 }, color: 'bg-yellow-500' },
  { id: 'P', length: 2, orientation: 'vertical', position: { row: 0, col: 4 }, color: 'bg-violet-500' },
  { id: 'Q', length: 2, orientation: 'vertical', position: { row: 3, col: 4 }, color: 'bg-blue-500' },
  { id: 'R', length: 3, orientation: 'horizontal', position: { row: 4, col: 2 }, color: 'bg-emerald-500' },
];

export const solution: Move[] = [
  { carId: 'P', direction: 'down', steps: 1 },
  { carId: 'D', direction: 'up', steps: 1 },
  { carId: 'Q', direction: 'up', steps: 1 },
  { carId: 'C', direction: 'down', steps: 2 },
  { carId: 'X', direction: 'left', steps: 1 },
  { carId: 'B', direction: 'down', steps: 1 },
  { carId: 'E', direction: 'right', steps: 2 },
  { carId: 'R', direction: 'left', steps: 3 },
  { carId: 'O', direction: 'down', steps: 3 },
  { carId: 'A', direction: 'right', steps: 3 },
  { carId: 'B', direction: 'up', steps: 1 },
  { carId: 'X', direction: 'right', steps: 2 },
  { carId: 'D', direction: 'up', steps: 3 },
  { carId: 'X', direction: 'left', steps: 1 },
  { carId: 'O', direction: 'up', steps: 2 },
  { carId: 'E', direction: 'left', steps: 3 },
  { carId: 'O', direction: 'down', steps: 2 },
  { carId: 'P', direction: 'down', steps: 2 },
  { carId: 'Q', direction: 'down', steps: 2 },
  { carId: 'X', direction: 'right', steps: 4 },
];