"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import HeatmapSquare from "./HeatmapSquare";
import { fetcher } from "@/lib/utils";

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

type Contributions = {
  date: string; // YYYY-MM-DD
  count: number;
  level: number;
};

interface Data {
  total: Record<string, number>;
  contributions: Contributions[];
}

const ContributionsHeatmap: React.FC = () => {
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
      <div className="p-64 bg-yellow-500">
        An unexpected error occurred.
      </div>
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
  if (!data || !data.contributions.length) {
    return <div className="p-64 bg-gray-200">No data available.</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl solid-dark-square p-4">
        <div className="flex min-h-full gap-2">
          {/* Display heatmap squares */}
          {data.contributions.map((contribution, index) => (
            <div key={index} className="flex flex-col gap-2">
              <HeatmapSquare
                level={contribution.level}
                isLoading={false} // Assuming no loading state for each square
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContributionsHeatmap);
