import React, { useMemo } from "react";
import HeatmapSquare from "./HeatmapSquare";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

const ContributionsHeatmap: React.FC = () => {
  const mockData: number[][] = useMemo(() => {
    return Array.from({ length: WEEKS }, (_, weekIndex) =>
      Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => {
        // --- Baseline Noise ---
        const noise = Math.random() * 1.5;

        // --- Daily Pattern ---
        const dayPattern = Math.sin(
          ((dayIndex + 1) / (DAYS_PER_WEEK + 1)) * Math.PI
        );

        // --- Seasonal Pattern ---
        const midYearPeak = Math.exp(-Math.pow((weekIndex - 26) / 6, 2));
        const yearEndPeak = Math.exp(-Math.pow((weekIndex - 50) / 3, 2));
        const seasonalPattern = midYearPeak + yearEndPeak;

        // --- Weekend Adjustment ---
        const isWeekend = dayIndex === 0 || dayIndex === 6;
        const weekendAdjustment = isWeekend
          ? Math.random() < 0.15
            ? 2
            : -0.5
          : 0;

        // --- Clustered Burst ---
        const burstWeek = Math.random() < 0.1 ? 1 + Math.random() * 2 : 0;

        // --- Combine Factors ---
        let level =
          dayPattern * seasonalPattern * 2 +
          noise +
          weekendAdjustment +
          burstWeek;
        level = Math.max(0, Math.min(4, Math.floor(level)));

        return level;
      })
    );
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl solid-dark-square p-4">
        <div className="flex flex-wrap gap-2">
          {mockData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-2">
              {week.map((level, dayIndex) => (
                <HeatmapSquare key={`${weekIndex}-${dayIndex}`} level={level} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionsHeatmap;
