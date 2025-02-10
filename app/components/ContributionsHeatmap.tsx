"use client";
import React, { useEffect, useState } from "react";
import HeatmapSquare from "./HeatmapSquare";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

const ContributionsHeatmap: React.FC = () => {
  const CACHE_KEY = "heatmapDataCache";
  const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
  const [data, setData] = useState<number[][] | null>(null);

  const loadData = async () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timeStamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setData(cached);
        // optionally refresh data background
      }
      return;
    }

    useEffect(() => {}, [fetchData]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl solid-dark-square p-4">
        <div className="flex min-h-full gap-2">
          {(
            mockData ??
            Array.from({ length: WEEKS }, () => Array(DAYS_PER_WEEK).fill(99))
          ).map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-2">
              {week.map((level, dayIndex) => (
                <HeatmapSquare
                  key={`${weekIndex}-${dayIndex}`}
                  level={level}
                  isLoading={heatmapData === null} // Pass loading state correctly
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContributionsHeatmap);
