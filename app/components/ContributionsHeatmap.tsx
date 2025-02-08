import React, { useEffect, useState, useMemo } from "react";
import HeatmapSquare from "./HeatmapSquare";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

// app/components/ContributionsHeatmap.tsx
// Fix memoization and data generation
const ContributionsHeatmap: React.FC = () => {
  const [mockData, setMockData] = useState<number[][]>(() => 
    Array(WEEKS).fill(Array(DAYS_PER_WEEK).fill(99))
  );

  useEffect(() => {
    const generateData = () => {
      const data = Array.from({ length: WEEKS }, (_, weekIndex) =>
        Array.from({ length: DAYS_PER_WEEK }, () => {
          // Simplified calculation
          return Math.floor(Math.random() * 5);
        })
      );
      setMockData(data);
    };
    
    const timer = setTimeout(generateData, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl solid-dark-square p-4">
        <div className="flex min-h-full gap-2">
          {(mockData ?? Array.from({ length: WEEKS }, () => Array(DAYS_PER_WEEK).fill(99))).map(
            (week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-2">
                {week.map((level, dayIndex) => (
                  <HeatmapSquare
                    key={`${weekIndex}-${dayIndex}`}
                    level={level}
                    isLoading={mockData === null} // Pass loading state correctly
                  />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContributionsHeatmap);
