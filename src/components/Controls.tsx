import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Play, Pause } from 'lucide-react';
import { Move } from '../types';

interface ControlsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  currentMove: Move | null;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
}

export function Controls({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onReset,
  currentMove,
  isAutoPlaying,
  onToggleAutoPlay
}: ControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
          Previous
        </button>
        
        <button
          onClick={onToggleAutoPlay}
          className={`flex items-center gap-2 px-4 py-2 ${isAutoPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition-colors`}
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isAutoPlaying ? 'Pause' : 'Auto Play'}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw size={20} />
          Reset
        </button>
        
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Next
          <ArrowRight size={20} />
        </button>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="text-lg font-medium">
          Step {currentStep} of {totalSteps}
        </div>
        
        <div className="h-1 w-64 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        {currentMove && (
          <div className="text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            Move: Car {currentMove.carId} {currentMove.direction} {currentMove.steps} step(s)
          </div>
        )}
      </div>
    </div>
  );
}