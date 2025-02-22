"use client";

import React, { useRef, useEffect, useState } from "react";
import Drawer from "./components/main-drawer/Drawer";
import { createSwapy } from "swapy";
import OrientationWidget from "./components/widgets-display/widget-card-instances,/WidgetInstance";
import { Widget, WidgetsLayout } from "./types/types";
import { placeWidget } from "./hooks/useValidateLayout";

const WidgetManager: React.FC = () => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef.current) {
      const swapyInstance = createSwapy(drawerRef.current, {
        animation: "spring",
        manualSwap: true,
      });
      console.log("swapy ref is current.");

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

  const handleAddWidget = (newWidget: Widget) => {
    setWidgetLayout((prevLayout) => [...prevLayout, newWidget]);
    console.log(widgetLayout);
  };

  const renderWidgets = (widget: Widget, widgetIdx: number) => {
    switch (widget) {
      case "H":
        return (
          <OrientationWidget
            key={widgetIdx}
            itemId={widgetIdx}
            direction="horizontal"
          />
        );
      case "V":
        return (
          <OrientationWidget
            key={widgetIdx}
            itemId={widgetIdx}
            direction="vertical"
          />
        );
      case "S":
        return (
          <OrientationWidget
            key={widgetIdx}
            itemId={widgetIdx}
            direction="square"
          />
        );
      default:
        return null;
    }
  };

  const widgetsLayout: Widget[] = ["H", "S", "S"];

  const columnsPerRow = 6;
  const [widgetLayout, setWidgetLayout] = useState<Widget[]>(widgetsLayout);
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    validateLayout(widgetLayout);
  }, [widgetLayout]);

  const [currentGridLayout, setCurrentGridLayout] = useState<WidgetsLayout>({
    column: 0,
    row: 0,
  });

  const [warningMessages, setWarningMessages] = useState<string[]>([]);
  
  const warnCannotFit = (index: number, rowIdx: number) =>
    setWarningMessages((prev) => [
      ...prev,
      `Warning: Horizontal widget cannot be placed at index ${index + 1} (row ${
        rowIdx + 1
      }, column ${column + 1}) because it spans 2 columns.`,
    ]);

  const { column, row } = currentGridLayout;
  const validateLayout = (layout: Widget[]) => {
    let rowIdx: number = 0;

    layout.forEach((widget, index) => {
      const isLastInRow = column === columnsPerRow - 1;
      const isHorizontal = widget === "H";

      if (isHorizontal && isLastInRow) {
        warnCannotFit(index, rowIdx);
      }

      if (widget === "H") {
        setCurrentGridLayout((prev) => ({ ...prev, column: prev.column + 2 }));
      } else {
        setCurrentGridLayout((prev) => ({ ...prev, column: prev.column + 1 }));
      }

      if (column >= columnsPerRow) {
        setCurrentGridLayout((prev) => ({
          ...prev,
          column: 0,
          row: prev.row + 1,
        }));
        rowIdx++;
      }
    });
    setWarnings(warningMessages);
  };

  const fillGrid = () => {
    return Array.from({ length: columnsPerRow }).map((cell, index) => {
      return (
        <div key={index} data-swapy-slot={index}>
          <OrientationWidget
            key={index}
            itemId={index}
            direction="horizontal"
          />
        </div>
      );
    });
  };

  // 18

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
        {fillGrid()}
      </Drawer>
    </div>
  );
};

export default WidgetManager;
