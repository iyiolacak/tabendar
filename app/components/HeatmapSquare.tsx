import React from "react";

interface HeatmapSquareProps {
  level: number;
}

const levelColors: { [key: number]: string } = {
  0: "bg-[#0a1a2f]",
  1: "bg-[#0B2A52]",
  2: "bg-[#1e497d]",
  3: "bg-[#2d6bb2]",
  4: "bg-[#0a84ff]",
};

const HeatmapSquare: React.FC<HeatmapSquareProps> = ({ level }) => {
  const baseStyle = "size-4 rounded-sm transition-all duration-200 brightness-125";
  const colorClass = levelColors[level] || levelColors[0];

  return (
    <div className={`${baseStyle} ${colorClass} hover:brightness-150 hover:scale-110`}>
      <span className="sr-only">{`Contribution level: ${level}`}</span>
    </div>
  );
};

export default React.memo(HeatmapSquare);
