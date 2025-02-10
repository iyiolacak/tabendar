"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import HeatmapSquare from "./HeatmapSquare";
import { fetcher } from "@/lib/utils";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

const url = `https://www.github.com/api/${localStorage.getItem(
  "githubUsername"
)}`;

const ContributionsHeatmap: React.FC = () => {
  const { data, error } = useSWR(url, fetcher);
  console.log(data ?? error)
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl solid-dark-square p-4">
        <div className="flex min-h-full gap-2">
          {(
            data ??
            Array.from({ length: WEEKS }, () => Array(DAYS_PER_WEEK).fill(99))
          ).map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-2">
              {week.map((level, dayIndex) => (
                <HeatmapSquare
                  key={`${weekIndex}-${dayIndex}`}
                  level={level}
                  isLoading={data === null} // Pass loading state correctly
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
