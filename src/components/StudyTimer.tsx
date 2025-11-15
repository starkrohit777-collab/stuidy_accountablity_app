import { useState, useEffect } from 'react';
import { Play, Pause, Square, CheckCircle } from 'lucide-react';
import { StudyPlan } from '../lib/supabase';

interface StudyTimerProps {
  plan: StudyPlan;
  onComplete: () => void;
  onBreak: () => void;
}

export default function StudyTimer({ plan, onComplete, onBreak }: StudyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(plan.duration_minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onComplete]);

  const handleStart = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (startTime) {
      const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000);
      if (elapsedMinutes < plan.duration_minutes) {
        onBreak();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((plan.duration_minutes * 60 - timeLeft) / (plan.duration_minutes * 60)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{plan.title}</h3>

      <div className="relative mb-8">
        <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="12"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            transform="rotate(-90 100 100)"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-800">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={timeLeft === 0}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Play size={20} />
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Pause size={20} />
            Pause
          </button>
        )}

        <button
          onClick={handleStop}
          disabled={!startTime}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Square size={20} />
          Stop
        </button>
      </div>

      {timeLeft === 0 && (
        <div className="mt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
          <p className="text-xl font-bold text-green-600">Great job! You completed your study session!</p>
        </div>
      )}
    </div>
  );
}
