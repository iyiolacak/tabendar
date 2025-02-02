import React from 'react'

interface HeatmapSquareProps {
  level: number
}

// macOS dark mode blue shades from darkest (level 0) to system blue (level 4)
const levelColors: { [key: number]: string } = {
    0: "bg-[#0a1a2f]",  // Deep navy blue, almost black
    1: "bg-[#102a44]",  // Dark blue-gray
    2: "bg-[#1e497d]",  // Muted deep blue
    3: "bg-[#2d6bb2]",  // Stronger blue, but still darkened
    4: "bg-[#0a84ff]",  // macOS system blue (for dark mode)
  };
  

const HeatmapSquare: React.FC<HeatmapSquareProps> = ({ level }) => {
  // Fixed width/height ensure consistent sizing.
  const baseStyle = "w-3.5 h-3.5 rounded-sm transition-all duration-200 brightness-125"
  const colorClass = levelColors[level] || levelColors[0]

  return (
    <div className={`${baseStyle} ${colorClass} hover:brightness-150 hover:scale-1 `}>
      <span className="sr-only">{`Contribution level: ${level}`}</span>
    </div>
  )
}

export default HeatmapSquare
