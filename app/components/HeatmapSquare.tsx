import React from 'react'

interface HeatmapSquareProps {
  level: number
}

// macOS blue shades from light (level 0) to system blue (level 4)
const levelColors: { [key: number]: string } = {
  0: "bg-[#ebf4ff]",
  1: "bg-[#cce0ff]",
  2: "bg-[#99c2ff]",
  3: "bg-[#66a3ff]",
  4: "bg-[#007aff]",
}

const HeatmapSquare: React.FC<HeatmapSquareProps> = ({ level }) => {
  // Fixed width/height ensure consistent sizing.
  const baseStyle = "w-3.5 h-3.5 rounded-sm transition-all duration-200"
  const colorClass = levelColors[level] || levelColors[0]

  return (
    <div className={`${baseStyle} ${colorClass} hover:brightness-125`}>
      <span className="sr-only">{`Contribution level: ${level}`}</span>
    </div>
  )
}

export default HeatmapSquare
