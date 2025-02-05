import React, { useEffect, useState, useMemo } from "react";
import HeatmapSquare from "./HeatmapSquare";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

const ContributionsHeatmap: React.FC = () => {
  const [mockData, setMockData] = useState<number[][] | null>(null);

  const generateMockData = useMemo(() => {
    return Array.from({ length: WEEKS }, (_, weekIndex) =>
      Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => {
        const noise = Math.random() * 1.5;
        const dayPattern = Math.sin(((dayIndex + 1) / (DAYS_PER_WEEK + 1)) * Math.PI);
        const midYearPeak = Math.exp(-Math.pow((weekIndex - 26) / 6, 2));
        const yearEndPeak = Math.exp(-Math.pow((weekIndex - 50) / 3, 2));
        const seasonalPattern = midYearPeak + yearEndPeak;
        const isWeekend = dayIndex === 0 || dayIndex === 6;
        const weekendAdjustment = isWeekend ? Math.random() < 0.15 ? 2 : -0.5 : 0;
        const burstWeek = Math.random() < 0.1 ? 1 + Math.random() * 2 : 0;
        const level = dayPattern * seasonalPattern * 2 + noise + weekendAdjustment + burstWeek;
        return Math.max(0, Math.min(4, Math.floor(level)));
      })
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMockData(generateMockData); // Use memoized data generation
    }, 1000); // Simulated delay
  }, [generateMockData]);

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
