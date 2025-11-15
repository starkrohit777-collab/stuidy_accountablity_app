import { useEffect, useState } from 'react';

interface BelanAnimationProps {
  onComplete: () => void;
}

export default function BelanAnimation({ onComplete }: BelanAnimationProps) {
  const [hits, setHits] = useState(0);
  const maxHits = 5;

  useEffect(() => {
    if (hits < maxHits) {
      const timer = setTimeout(() => {
        setHits(hits + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [hits, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="text-center">
        <div className="relative mb-8">
          <div
            className={`text-8xl transition-transform duration-200 ${
              hits < maxHits && hits % 2 === 1 ? 'scale-110 rotate-12' : 'scale-100'
            }`}
          >
            🙍‍♂️
          </div>

          <div
            className={`absolute -top-4 -right-4 text-6xl transition-all duration-300 ${
              hits < maxHits && hits % 2 === 1
                ? 'rotate-[-45deg] translate-x-4 translate-y-4'
                : 'rotate-[45deg] translate-x-8 translate-y-[-20px]'
            }`}
          >
            🥄
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-red-500 animate-pulse">
            You Broke Your Study Plan!
          </h2>
          <p className="text-2xl text-white">Mom is disappointed...</p>
          <div className="flex gap-2 justify-center mt-4">
            {Array.from({ length: maxHits }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  i < hits ? 'bg-red-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-lg text-yellow-400 mt-6 font-semibold">
            Time to get back to studying! 📚
          </p>
        </div>
      </div>
    </div>
  );
}
