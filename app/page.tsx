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
      const swapyInstance = createSwapy(drawerRef.current, { animation: "spring" });
      console.log("found the ref user.");

      // Event listener for swap actions
      swapyInstance.onSwap((event) => {
        console.log("swap", event);
      });

      return () => {
        // Clean up Swapy instance
        swapyInstance.destroy();
      };
    }
  }, []);

  type WidgetLayoutValue = "S" | "V" | "H";

  const renderWidgets = (widget: WidgetLayoutValue, widgetIdx: any) => {
    switch (widget) {
      case "H":
        return (
          <OrientationWidget
            key={widgetIdx}
            data-swapy-item={`${widgetIdx}-item`}
            direction="horizontal"
            drag
          />
        );
      case "V":
        return (
          <OrientationWidget
            key={widgetIdx}
            data-swapy-item={`${widgetIdx}-item`}
            direction="vertical"
            drag
          />
        );
      case "S":
        return (
          <SquareWidget
            key={widgetIdx}
            data-swapy-item={`${widgetIdx}-item`}
            drag
          />
        );
      default:
        return null;
    }
  };

  const widgetsLayout: WidgetLayoutValue[] = [
    "S",
    "H",
    "V",
    "H",
    "H",
    "S",
    "V",
    "V",
  ];

  const columnsPerRow = 6;
  const [widgetLayout, setWidgetLayout] =
    useState<WidgetLayoutValue[]>(widgetsLayout);
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    validateLayout(widgetLayout);
  }, [widgetLayout]);

  const validateLayout = (layout: WidgetLayoutValue[]) => {
    let columnIndexTracker: number = 0;
    let rowIdx: number = 0;
    const warningMessages: string[] = [];

    layout.forEach((widget, index) => {
      const isLastInRow = columnIndexTracker === columnsPerRow - 1;
      const isHorizontal = widget === "H";

      if (isHorizontal && isLastInRow) {
        warningMessages.push(
          `Warning: Horizontal widget cannot be placed at index ${
            index + 1
          } (row ${rowIdx + 1}, column ${
            columnIndexTracker + 1
          }) because it spans 2 columns.`
        );
      }
      if (widget === "H") {
        columnIndexTracker += 2;
      } else {
        columnIndexTracker += 1;
      }

      if (columnIndexTracker >= columnsPerRow) {
        columnIndexTracker = 0;
        rowIdx++;
      }
    });
    setWarnings(warningMessages);
  };

  return (
    <div className="w-screen z-40 flex flex-col flex-grow">
      {warnings.length > 0 && (
        <div>
          <ul className="bg-red-700 p-3 text-white">
            {warnings.map((warning, index) => (
              <li className="text-xl text-white" key={index}>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Drawer ref={drawerRef}>
        {widgetsLayout.map((widget, widgetIdx) =>
          renderWidgets(widget, widgetIdx)
        )}
      </Drawer>
    </div>
  );
};

export default GlassPage;
