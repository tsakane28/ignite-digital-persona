import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  progress?: number;
}

export const LoadingScreen = ({ onLoadComplete, progress = 0 }: LoadingScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress animation
  useEffect(() => {
    if (progress > displayProgress) {
      const timer = setTimeout(() => {
        setDisplayProgress(prev => Math.min(prev + 2, progress));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [progress, displayProgress]);

  useEffect(() => {
    if (displayProgress >= 100) {
      const timeout = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onLoadComplete, 500);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [displayProgress, onLoadComplete]);

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
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Loading text with percentage */}
        <p className="mt-4 text-sm text-muted-foreground">
          Loading... {Math.round(displayProgress)}%
        </p>
      </div>
    </div>
  );
};
