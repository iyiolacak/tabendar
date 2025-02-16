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

const GlassPage: React.FC = () => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef.current) {
      createSwapy(drawerRef.current, { animation: "spring" });
    }
  }, []);

  return (
    <div className="w-screen bg-red-600 z-40 flex flex-col flex-grow">
      <Drawer>
        {/* Glass Container */}
        <DrawerHandler />
        <div
          ref={drawerRef}
          className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4"
        >
          {/* Slot A */}
          <div data-swapy-slot="a" className="w-96 h-32">
            {/* Item A */}
            <div
              data-swapy-item="a"
              className="bg-purple-300 w-full h-full"
            ></div>
          </div>
          {/* Slot B */}
          <div data-swapy-slot="b" className="w-96 h-32">
            {/* Item B */}
            <div
              data-swapy-item="b"
              className="bg-slate-500 w-full h-full"
            ></div>
          </div>
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
  /* <ContributionsHeatmap year={2025} />
<AnalogClock />
<PythonCard />
<NestedHeartsCard />
  <ProductiveHourCard />
 */
}
