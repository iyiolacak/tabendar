import React from "react";

interface HeatmapSquareProps {
  level: number;
  isLoading?: boolean;
}

const levelColors: { [key: number]: string } = {
  99: "bg-[#24262B]",  // Loading state color
  0: "bg-[#0a1a2f]",
  1: "bg-[#0B2A52]",
  2: "bg-[#1e497d]",
  3: "bg-[#2d6bb2]",
  4: "bg-[#0a84ff]",
};

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
