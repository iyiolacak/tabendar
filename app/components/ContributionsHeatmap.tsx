import React, { useMemo } from 'react'
import HeatmapSquare from './HeatmapSquare'

const WEEKS = 52
const DAYS_PER_WEEK = 7

const ContributionsHeatmap: React.FC = () => {
  // Memoize the mock data to avoid re-computation on each render.
  const mockData = useMemo(() => {
    return Array.from({ length: WEEKS }, (_, weekIndex) =>
      Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => {
        // Sine curve gives a mid-week peak.
        const dayFactor = Math.sin(((dayIndex + 1) / (DAYS_PER_WEEK + 1)) * Math.PI)
        // Cosine curve gives seasonal variation across weeks.
        const weekFactor = (Math.cos((weekIndex / WEEKS) * Math.PI * 2) + 1) / 2
        // Scale and floor to a level between 0 and 4.
        return Math.floor(dayFactor * weekFactor * 4)
      })
    )
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg p-4">
        <div className="flex flex-wrap gap-1.5">
          {mockData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5">
              {week.map((level, dayIndex) => (
                <HeatmapSquare key={`${weekIndex}-${dayIndex}`} level={level} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContributionsHeatmap
