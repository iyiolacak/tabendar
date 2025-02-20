import React from "react";

interface HeatmapSquareProps {
  level: number;
  isLoading?: boolean;
}

const levelColors: { [key: number]: string } = {
  99: "bg-[#0a84ff]",    // Loading state color
  0: "bg-[#0a1a2f]",     // Darkest shade
  1: "bg-[#1a3b6d]",     // Darker shade
  2: "bg-[#2a63a2]",     // Mid-tone
  3: "bg-[#3a8bdb]",     // Lighter shade
  4: "bg-[#4aa2ff]",     // Light
}

const HeatmapSquare: React.FC<HeatmapSquareProps> = ({ level, isLoading }) => {
  const baseStyle =
    "size-4 rounded-sm transition-all brightness-125";

  const colorClass = isLoading ? levelColors[99] : levelColors[level];  // Corrected line

  return (
    <div
      className={`${baseStyle} ${colorClass}
      hover:brightness-150 hover:scale-110`}
    >
      <span className="sr-only">{`Contribution level: ${level}`}</span>
    </div>
  );
};

export default React.memo(HeatmapSquare);
