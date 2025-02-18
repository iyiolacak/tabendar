"use client";

import React, { useRef, useEffect, useState } from "react";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import AnalogClock from "./components/clock/LiveAnalogClock";
import { GitHubNumber } from "./components/GithubNumber";
import BookCover from "./components/BookCover";
import Drawer from "./components/main-drawer/Drawer";
import PythonCard from "./components/widgets-display/PythonCard";
import NestedHeartsCard from "./components/widgets-display/NestedHeartsCard";
import ProductiveHourCard from "./components/widgets-display/widgets/ProductiveHourCard";
import DrawerHandler from "./components/main-drawer/DrawerHandler";
import { createSwapy } from "swapy";
import SquareWidget from "./components/widgets-display/widget-card-instances,/SquareWidget";
import HorizontalWidget from "./components/widgets-display/widget-card-instances,/HorizontalWidget.ts";

const GlassPage: React.FC = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (drawerRef.current) {
      createSwapy(drawerRef.current, { animation: "spring" });
    }
  }, []);

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [gridColumns, setGridColumns] = useState(1);

  useEffect(() => {
    const parentElement = gridContainerRef.current?.parentElement;
    if (!parentElement) return;

    const updateGrid = () => {
      const containerWidth = parentElement.clientWidth;
      const gap = 16;
      const columnWidth = 280;
      const columns = Math.floor((containerWidth + gap) / (columnWidth + gap));
      setGridColumns(Math.max(1, columns));
    };

    updateGrid();
    const resizeObserver = new ResizeObserver(updateGrid);
    resizeObserver.observe(parentElement);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="w-screen z-40 flex flex-col flex-grow">
      <Drawer>
        {/* Glass Container */}
        <DrawerHandler />
        <div
          ref={gridContainerRef}
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, 280px)`,
            gap: "16px",
            /*             backgroundColor: "#000",
             */ width: `${gridColumns * 280 + (gridColumns - 1) * 16}px`,
          }}
        >
          <SquareWidget />
          <HorizontalWidget />
          <SquareWidget />
          <SquareWidget />
          <HorizontalWidget />
          <SquareWidget />
          <HorizontalWidget />
          <HorizontalWidget />

          <SquareWidget />
        </div>
      </Drawer>
    </div>
  );
};

export default GlassPage;

{
  /*
<AnalogClock />
<PythonCard />
<NestedHeartsCard />
  <ProductiveHourCard />
 */
}
