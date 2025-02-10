"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import HeatmapSquare from "./HeatmapSquare";
import { fetcher } from "@/lib/utils";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

const ContributionsHeatmap: React.FC = () => {
  useEffect(() => {
    const storedUsername = localStorage.getItem("githubUsername");
    setUsername(storedUsername);
  }, []);
  const [username, setUsername] = useState<string | null>(null);
  const url = username
    ? `https://api.github.com/${localStorage.getItem("githubUsername")}`
    : null;
  const { data, error } = useSWR(url, fetcher);
  console.log(data ?? error);

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl solid-dark-square p-4">
        <div className="flex min-h-full gap-2">
          {(
            data ??
            Array.from({ length: WEEKS }, () => Array(DAYS_PER_WEEK).fill(99))
          ).map((week, weekIndex) => (
            <div key={`${weekIndex}`} className="flex flex-col gap-2">
              {week.map((level, dayIndex) => (
                <HeatmapSquare
                  key={`${weekIndex}-${dayIndex}`}
                  level={level}
                  isLoading={data === null}
                />
              ))}
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContributionsHeatmap);
