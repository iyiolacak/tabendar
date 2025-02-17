"use client";

import React, { useRef, useEffect } from "react";
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

  return (
    <div className="w-screen z-40 flex flex-col flex-grow">
      <Drawer>
        {/* Glass Container */}
        <DrawerHandler />
        <div
          ref={drawerRef}
          className="grid grid-rows-3 grid-cols-3 h-[840px] w-full grid-flow-col-dense gap-4"
        >
          <SquareWidget>
          </SquareWidget>
          <HorizontalWidget>
          </HorizontalWidget>
        </div>
      </Drawer>
      <footer className="w-full flex justify-center">
        {/* Footer content here */}
      </footer>
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
