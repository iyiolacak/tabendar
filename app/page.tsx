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
import OrientationWidget from "./components/widgets-display/widget-card-instances,/HorizontalWidget.ts";

const GlassPage: React.FC = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (drawerRef.current) {
      createSwapy(drawerRef.current, { animation: "spring" });
    }
  }, []);
  type widgetLayoutValue = "S" | "V" | "H";
  const widgetsLayout: widgetLayoutValue[][] = [
    ["S", "S", "V", "H"],
    ["H", "S", "V", "H"],
  ];

  const widgetsLayoutSingleArr: widgetLayoutValue[] = [
    "S",
    "S",
    "V",
    "H",
    "H",
    "S",
    "V",
    "H",
  ];

  return (
    <div className="w-screen z-40 flex flex-col flex-grow">
      <Drawer>
        z
        <div className="min-w-full grid grid-flow-col h-full">
          {widgetsLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="w-full h-full grid bg-red-600">
              {row.map((widget, colIndex) => {
                switch (widget) {
                  case "H":
                    return <OrientationWidget direction="horizontal" />;
                  case "V":
                    return <OrientationWidget direction="vertical" />;
                  case "S":
                    return <SquareWidget />;
                  default:
                    return null;
                }
              })}
            </div>
          ))}
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
