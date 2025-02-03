"use client";

import { url } from "inspector";
import ClockFunc from "./components/clock/Clock";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";

// A revised HeatmapSquare component that aims for a subtle, cohesive glass effect.
function HeatmapSquare({ level }) {
  // Define the appearance based on contribution level.
  // All levels use a translucent base with gentle gradients, borders, and shadows.
  let bgClass = "";
  let borderClass = "";
  let shadowClass = "";

  switch (level) {
    case 0:
      // Inactive: muted glass with very low opacity.
      bgClass = "bg-gray-700";
      borderClass = "border border-gray-900";
      shadowClass = "shadow-inner";
      break;
    case 1:
      // Low activity: a light, barely-there mint tint.
      bgClass = "bg-gradient-to-br from-green-100 to-green-200";
      borderClass = "border border-green-200";
      shadowClass = "shadow-sm";
      break;
    case 2:
      // Moderate: a soft, gentle mint tone.
      bgClass = "bg-gradient-to-br from-green-200 to-green-300";
      borderClass = "border border-green-300";
      shadowClass = "shadow-md";
      break;
    case 3:
      // High: a slightly deeper mint but still subtle.
      bgClass = "bg-gradient-to-br from-green-300 to-green-400";
      borderClass = "border border-green-400";
      shadowClass = "shadow-lg";
      break;
    case 4:
      // Very high: the richest tint, yet keeping the same light transparency.
      bgClass = "bg-gradient-to-br from-green-400 to-green-500";
      borderClass = "border border-green-500";
      shadowClass = "shadow-xl";
      break;
    default:
      bgClass = "bg-gray-800";
      borderClass = "border border-gray-700";
      shadowClass = "shadow-inner";
  }

  return (
    <div
      className={`relative flex items-center justify-center w-5 h-5 rounded-md overflow-hidden ${bgClass} ${borderClass} ${shadowClass} transition-all duration-200 hover:brightness-105`}
      // Increase the blur a bit to emphasize the frosted effect.
      style={{ backdropFilter: "blur(6px)" }}
    >
      {/* A very subtle highlight overlay to simulate a gentle light reflection. */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/15 via-transparent to-transparent"></div>
    </div>
  );
}

export default function GlassPage() {
  // Generate mock data: 52 weeks of 7 days each (with levels 0–4).
  const weeks = 52;
  const daysPerWeek = 7;
  const mockData = Array.from({ length: weeks }, () =>
    Array.from({ length: daysPerWeek }, () => Math.floor(Math.random() * 5))
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Global Wallpaper (macOS default) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('wallpaper.png')",
        }}
      />
      {/* Glass container – assumes your overall glassmorphism styling is applied */}
      <div className="glass-container flex-col">
        <div className="absolute top-12 p-12">
          <ClockFunc/>
        </div>
        <div className="glass-square backdrop-blur-3xl rounded-3xl pt-12">
          <div className="rounded-lg p-8">
            <div className="overflow-x-auto">
              <div className="flex space-x-2">
                <ContributionsHeatmap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
