"use client";
import React, { useRef, useEffect, useState } from "react";
import Drawer from "./components/main-drawer/Drawer";
import { createSwapy } from "swapy";
import OrientationWidget from "./components/widgets-display/widget-card-instances/WidgetInstance";
import type { Widget } from "./types/types";
import { cn } from "@/lib/utils";

const WidgetManager: React.FC = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const columnsPerRow = 3; // 6 slots per row

  // Swapy initialization with cleanup
  useEffect(() => {
    if (!drawerRef.current) return;

    const swapyInstance = createSwapy(drawerRef.current, {
      animation: "spring",
    });

    // Swap event handler

    return () => {
      swapyInstance.destroy();
    };
  }, []);


type Direction = "square" | "horizontal" | "vertical";

// This function maps a child's "direction" to grid classes
const getGridClasses = (direction: Direction) => {
  switch (direction) {
    case "vertical":
      return "row-span-2 col-span-1";
    case "horizontal":
      return "row-span-1 col-span-2";
    case "square":
    default:
      return "row-span-1 col-span-1";
  }
};
const directions: Direction[] = ["square", "horizontal", "vertical"];

const randomDirection = directions[Math.floor(Math.random() * directions.length)];
// Grid cell generator for each slot
console.log(randomDirection)
const renderGridCells = () => {
  // Loop through 6 slots (you can change the number of slots as needed)
  return Array.from({ length: columnsPerRow }).map((_, index) => {
    console.log(index)
    console.log(getGridClasses(randomDirection))
    const uniqueSlotId = `slot-${index}`; // Unique ID for each slot

    
      return (
        <div
          key={uniqueSlotId}
          data-swapy-slot={uniqueSlotId}
          className={cn(`${getGridClasses(randomDirection)} w-full border p-2 h-full`)}
        >
          <div
            data-swapy-item={index.toString()} // Assigning itemId to the widget for clarity
            className="h-full bg-purple-600 rounded-2xl w-full"
          />
        </div>
      );
    });
  };

  return (
    <div className="w-screen z-40 flex flex-col flex-grow">
      {warnings.length > 0 && (
        <div className="bg-red-700 p-3 text-white">
          <ul>
            {warnings.map((warning, index) => (
              <li key={index} className="text-xl">
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Drawer ref={drawerRef}>
        {renderGridCells()} {/* This will render the slots with their items */}
      </Drawer>
    </div>
  );
};

export default WidgetManager;
