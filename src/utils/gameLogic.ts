import { Car, Move, Position } from '../types';

export function isValidMove(car: Car, move: Move, cars: Car[]): boolean {
  const newPosition = { ...car.position };
  const boardSize = 6;

  // Calculate new position
  switch (move.direction) {
    case 'up':
      newPosition.row -= move.steps;
      break;
    case 'down':
      newPosition.row += move.steps;
      break;
    case 'left':
      newPosition.col -= move.steps;
      break;
    case 'right':
      newPosition.col += move.steps;
      break;
  }

  // Check orientation constraints
  if (car.orientation === 'horizontal' && (move.direction === 'up' || move.direction === 'down')) {
    return false;
  }
  if (car.orientation === 'vertical' && (move.direction === 'left' || move.direction === 'right')) {
    return false;
  }

  // Check board boundaries
  if (car.orientation === 'horizontal') {
    if (newPosition.col < 0 || newPosition.col + car.length > boardSize) {
      return false;
    }
  } else {
    if (newPosition.row < 0 || newPosition.row + car.length > boardSize) {
      return false;
    }
  }

  // Check collision with other cars
  const occupiedPositions = new Set<string>();
  cars.forEach(otherCar => {
    if (otherCar.id !== car.id) {
      for (let i = 0; i < otherCar.length; i++) {
        if (otherCar.orientation === 'horizontal') {
          occupiedPositions.add(`${otherCar.position.row},${otherCar.position.col + i}`);
        } else {
          occupiedPositions.add(`${otherCar.position.row + i},${otherCar.position.col}`);
        }
      }
    }
  });

  // Check if new position collides with other cars
  for (let i = 0; i < car.length; i++) {
    const checkPos = car.orientation === 'horizontal'
      ? `${newPosition.row},${newPosition.col + i}`
      : `${newPosition.row + i},${newPosition.col}`;
    if (occupiedPositions.has(checkPos)) {
      return false;
    }
  }

  return true;
}

export function moveCar(car: Car, move: Move): Car {
  const newPosition: Position = { ...car.position };
  
  switch (move.direction) {
    case 'up':
      newPosition.row -= move.steps;
      break;
    case 'down':
      newPosition.row += move.steps;
      break;
    case 'left':
      newPosition.col -= move.steps;
      break;
    case 'right':
      newPosition.col += move.steps;
      break;
  }
  
  return { ...car, position: newPosition };
}

export function applyMove(cars: Car[], move: Move): Car[] {
  const carToMove = cars.find(car => car.id === move.carId);
  if (!carToMove || !isValidMove(carToMove, move, cars)) {
    return cars;
  }
  
  return cars.map(car => 
    car.id === move.carId ? moveCar(car, move) : car
  );
}

export function isGameWon(cars: Car[]): boolean {
  const redCar = cars.find(car => car.id === 'X');
  return redCar?.position.col === 4;
}