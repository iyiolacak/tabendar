"use client";

import React, { useRef, useEffect, useState } from "react";
import Drawer from "./components/main-drawer/Drawer";
import { createSwapy } from "swapy";
import OrientationWidget from "./components/widgets-display/widget-card-instances,/WidgetInstance";
import { WidgetLayoutValue } from "./types/types";

const GlassPage: React.FC = () => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef.current) {
      const swapyInstance = createSwapy(drawerRef.current, {
        animation: "spring",
      });
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

  const handleAddWidget = (newWidget: WidgetLayoutValue) => {
    setWidgetLayout((prevLayout) => [...prevLayout, newWidget]);
    console.log(widgetLayout);
  };

  const renderWidgets = (widget: WidgetLayoutValue, widgetIdx: number) => {
    switch (widget) {
      case "H":
        return (
          <OrientationWidget
            key={widgetIdx}
            data-swapy-item={`${widgetIdx}-item`}
            direction="horizontal"
          />
        );
      case "V":
        return (
          <OrientationWidget
            key={widgetIdx}
            data-swapy-item={`${widgetIdx}-item`}
            direction="vertical"
          />
        );
      case "S":
        return (
          <OrientationWidget
            key={widgetIdx}
            data-swapy-item={`${widgetIdx}-item`}
            direction="square"
          />
        );
      default:
        return null;
    }
  };

  const widgetsLayout: WidgetLayoutValue[] = [
    "H",
    "S",
    "S",
    "V",
    "H",
    "V",
    "S",
    "S",
    "H",

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

      <Drawer ref={drawerRef} onAddWidget={handleAddWidget}>
        {widgetLayout.map((widget, widgetIdx) =>
          renderWidgets(widget, widgetIdx)
        )}
      </Drawer>
    </div>
  );
};

export default GlassPage;
