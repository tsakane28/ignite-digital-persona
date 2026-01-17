import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onLoadComplete, 500);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoadComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        isExiting && "opacity-0 pointer-events-none"
      )}
    >
      {/* Animated background elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-portfolio-purple/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-portfolio-blue/20 blur-3xl animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo/Name */}
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8 animate-pulse">
          TS
        </h1>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-portfolio-purple to-portfolio-blue transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="mt-4 text-sm text-muted-foreground">
          Loading{'.'.repeat(Math.floor((progress / 25) % 4))}
        </p>
      </div>
    </div>
  );
};
