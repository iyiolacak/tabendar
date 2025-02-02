import React, { useMemo } from "react";
import HeatmapSquare from "./HeatmapSquare";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

const ContributionsHeatmap: React.FC = () => {
  // Create mock contributions data with a mix of patterns, randomness, and occasional clusters.
  const mockData = useMemo(() => {
    return Array.from({ length: WEEKS }, (_, weekIndex) => {
      return Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => {
        // --- Baseline Noise ---
        // Every day gets a little random noise to mimic spontaneous commits.
        const noise = Math.random() * 1.5; // noise between 0 and 1.5

        // --- Daily Pattern ---
        // Use a sine curve to simulate a realistic mid-week spike:
        // Days closer to the middle of the week tend to have higher contributions.
        const dayPattern = Math.sin(
          ((dayIndex + 1) / (DAYS_PER_WEEK + 1)) * Math.PI
        );

        // --- Seasonal Pattern ---
        // Introduce seasonal effects with two peaks: one near mid-year and one near year end.
        // Using a Gaussian-like (bell curve) distribution for each peak.
        const midYearPeak = Math.exp(-Math.pow((weekIndex - 26) / 6, 2)); // centered around week 26
        const yearEndPeak = Math.exp(-Math.pow((weekIndex - 50) / 3, 2)); // centered around week 50
        const seasonalPattern = midYearPeak + yearEndPeak;

        // --- Weekend Adjustment ---
        // Slightly decrease contributions on Sundays (or weekends in general), but with a twist:
        // Occasionally, a weekend might have a burst (simulate a hackathon or a last-minute fix).
        const isWeekend = dayIndex === 0 || dayIndex === 6; // assuming index 0 is Sunday, 6 is Saturday
        const weekendAdjustment = isWeekend
          ? Math.random() < 0.15
            ? 2
            : -0.5
          : 0;

        // --- Clustered Burst ---
        // Randomly introduce bursty weeks to simulate project deadlines or sprints.
        // For some weeks, add an extra boost.
        const burstWeek = Math.random() < 0.1 ? 1 + Math.random() * 2 : 0;

        // --- Combine Factors ---
        // Multiply the daily pattern by seasonal effects and add randomness.
        // The constants below are tuned ad hoc to keep the final level between 0 and 4.
        let level =
          dayPattern * seasonalPattern * 2 +
          noise +
          weekendAdjustment +
          burstWeek;

        // Clamp and floor the result to get an integer level between 0 and 4.
        level = Math.max(0, Math.min(4, Math.floor(level)));

        return level;
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg p-4">
        <div className="flex flex-wrap gap-1.5">
          {mockData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5">
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
