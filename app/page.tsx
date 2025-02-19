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

  type WidgetLayoutValue = "S" | "V" | "H";

  /*
   * No horizontal widget start can come to the very end at all as "H" widgets cover two column spans and you cannot fit 7 spans in a 6 columns grid so it'd just skip another line.
   *
   * Each row is 6 column span(specified in the `<Drawer>` component className).
   */
  const widgetsLayout: WidgetLayoutValue[] = [
    "S",
    "S",
    "V",
    "H",
    "H",
    "S",
    "V",
    "V",
  ];
  return (
    <div className="w-screen z-40 flex flex-col flex-grow">
      <Drawer>
        {widgetsLayout.map((widget, widgetIdx) => {
          switch (widget) {
            case "H":
              return (
                <OrientationWidget key={widgetIdx} direction="horizontal" />
              );
            case "V":
              return <OrientationWidget key={widgetIdx} direction="vertical" />;
            case "S":
              return <SquareWidget key={widgetIdx} />;
            default:
              return null;
          }
        })}
      </Drawer>
    </div>
  );
};

export default GlassPage;

{
  /*
<AnalogClock />
<NestedHeartsCard />
  <ProductiveHourCard />
 */
}
