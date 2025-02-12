"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import HeatmapSquare from "./HeatmapSquare";
import { fetcher } from "@/lib/utils";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

const ContributionsHeatmap: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("githubUsername");
    setUsername(storedUsername);
  }, []);

  const url = username
    ? `https://github-contributions-api.jogruber.de/v4/${username}`
    : null;
    console.log("url is: ", url)

  const { data, error } = useSWR(url, fetcher);
  console.log(username);
  console.log("your damn data is ", data);
  if (error) {
    console.error("Error fetching data:", error);
  }

  if(username === null ) {
    return (
      <div className="p-64 bg-red-600">
        Enter a github username please.
        </div>
    )
  }
  if(error) {
    return (
      <div className="p-64 bg-yellow-500">
        An unexpected error occured.
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl solid-dark-square p-4">
        <div className="flex min-h-full gap-2">
          {(
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
