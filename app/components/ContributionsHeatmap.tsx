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
}
interface Data {
  total: Record<string, number>
  contributions: Contributions

}
const ContributionsHeatmap: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("githubUsername");
    setUsername(storedUsername);
  }, []);

  const url = username
    ? `https://github-contributions-api.jogruber.de/v4/${username}`
    : null;
  console.log("url is: ", url);

  const { data, isLoading, error } = useSWR<Data>(url, fetcher);
  console.log(username);
  console.log("your damn data is ", data);
  if (error) {
    console.error("Error fetching data:", error);
  }

  if (username === null) {
    return (
      <div className="p-64 bg-red-600">Enter a github username please.</div>
    );
  }
  if (isLoading) {
    return (
      <div className="p-64 bg-gray-100">Loading.</div>
    );
  }
  if (error) {
    return (
      <div className="p-64 bg-yellow-500">An unexpected error occured.</div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl solid-dark-square p-4">
        <div className="flex min-h-full gap-2">
          {data !== undefined ? <div className="p-12 bg-blue-700">data.contributions</div> : "not loaded"}
{/*             <div key={`${weekIndex}`} className="flex flex-col gap-2">
                <HeatmapSquare
                  key={`${weekIndex}-${dayIndex}`}
                  level={level}
                  isLoading={data === null}
                />
            </div>
 */}        </div>
      </div>
    </div>
  );
};

export default React.memo(ContributionsHeatmap);
