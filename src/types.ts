export type Direction = 'up' | 'down' | 'left' | 'right';
export type Position = { row: number; col: number };
export type Car = {
  id: string;
  length: number;
  orientation: 'horizontal' | 'vertical';
  position: Position;
  color: string;
};

export type Move = {
  carId: string;
  direction: Direction;
  steps: number;
};