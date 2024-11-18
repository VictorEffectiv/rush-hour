import React, { useState, useEffect, useCallback } from 'react';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { initialCars, solution } from './data/track12';
import { applyMove, isGameWon } from './utils/gameLogic';
import { Car } from './types';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const handleNext = useCallback(() => {
    if (currentStep < solution.length) {
      const move = solution[currentStep];
      const newCars = applyMove([...cars], move);
      setCars(newCars);
      setCurrentStep(prev => prev + 1);
      setHasWon(isGameWon(newCars));
    } else {
      setIsAutoPlaying(false);
    }
  }, [cars, currentStep]);

  const handlePrevious = () => {
    if (currentStep > 0) {
      let previousCars = [...initialCars];
      for (let i = 0; i < currentStep - 1; i++) {
        previousCars = applyMove(previousCars, solution[i]);
      }
      setCars(previousCars);
      setCurrentStep(prev => prev - 1);
      setHasWon(false);
    }
  };

  const handleReset = () => {
    setCars([...initialCars]);
    setCurrentStep(0);
    setIsAutoPlaying(false);
    setHasWon(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    let timer: number;
    if (isAutoPlaying && currentStep < solution.length) {
      timer = window.setTimeout(handleNext, 1000);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStep, handleNext]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-indigo-900">Rush Hour</h1>
      <p className="text-gray-600 mb-8">Track 12 Solution</p>
      
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <div className="mb-8">
          <Board cars={cars} />
        </div>
        <Controls
          currentStep={currentStep}
          totalSteps={solution.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onReset={handleReset}
          currentMove={currentStep > 0 ? solution[currentStep - 1] : null}
          isAutoPlaying={isAutoPlaying}
          onToggleAutoPlay={toggleAutoPlay}
        />
      </div>

      {hasWon && (
        <div className="mt-6 py-2 px-6 bg-green-500 text-white rounded-full animate-bounce">
          🎉 Puzzle Solved! The red car has reached the exit!
        </div>
      )}

      <div className="mt-8 text-gray-600 text-center max-w-md">
        <p className="mb-2">🎯 Goal: Get the red car (X) to the exit on the right</p>
        <p>Use the controls to navigate through the solution or click Auto Play to watch the solution unfold automatically.</p>
      </div>
    </div>
  );
}