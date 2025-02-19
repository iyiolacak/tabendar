"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import HeatmapSquare from "./HeatmapSquare";
import { fetcher } from "@/lib/utils";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

type DayContribution = {
  date: string; // YYYY-MM-DD
  count: number;
  level: number;
};

interface Data {
  total: Record<string, number>;
  contributions: {
    [year: string]: {
      [month: string]: {
        [day: string]: DayContribution;
      };
    };
  };
}

interface ContributionsHeatmapProps {
  year: number;
}

const ContributionsHeatmap: React.FC<ContributionsHeatmapProps> = ({
  year,
}) => {
  const [username, setUsername] = useState<string | null>(null);

  // Load username from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("githubUsername");
    setUsername(storedUsername);
  }, []);

  // Construct URL for fetching data based on the username
  const url = username
    ? `https://github-contributions-api.jogruber.de/v4/${username}?format=nested`
    : null;

  const { data, isLoading, error } = useSWR<Data>(url, fetcher);

  // Error handling
  if (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="p-64 bg-yellow-500">An unexpected error occurred.</div>
    );
  }

  // Handle loading state
  if (isLoading) {
    return <div className="p-64 bg-gray-100">Loading...</div>;
  }

  // Handle missing username
  if (username === null) {
    return (
      <div className="p-64 bg-red-600">Please enter a GitHub username.</div>
    );
  }

  // Handle no data or empty data state
  if (!data || !data.contributions || !data.contributions[year]) {
    return (
      <div className="p-64 bg-gray-200">No data available for this year.</div>
    );
  }

  // Get contributions for the selected year
  const contributionsByYear = data.contributions[year];

  // Flatten the contributions by iterating through months and days
  const flattenedContributions = Object.values(contributionsByYear).flatMap(
    (month) => Object.values(month)
  );

  // Padding for any missing days in the grid
  const totalDaysInYear = 365;
  const paddingDays = totalDaysInYear - flattenedContributions.length;
  const paddedContributions = [
    ...Array(paddingDays).fill({ level: 0, date: "" }),
    ...flattenedContributions,
  ];

  // Group contributions into weeks (52 weeks x 7 days)
  const weeks: DayContribution[][] = [];
  for (let i = 0; i < WEEKS; i++) {
    weeks.push(paddedContributions.slice(i * DAYS_PER_WEEK, (i + 1) * DAYS_PER_WEEK));
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="rounded-xl p-4 solid-dark-square shadow-lg w-full">
        {/* Grid for the yearly calendar */}
        <div className="grid grid-rows-7 grid-flow-col gap-1.5 flex-1">
          {/* Render the 7 days of the week (Sun-Sat) */}
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div key={dayIndex} className="flex gap-1.5">
              {/* Loop through each week and display contributions for the specific day */}
              {weeks.map((week, weekIndex) => (
                <HeatmapSquare
                  key={`${weekIndex}-${dayIndex}`}
                  level={week[dayIndex].level}
                  isLoading={false}
                  date={week[dayIndex].date}
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