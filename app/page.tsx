"use client";

import React, { useRef, useEffect, useState } from "react";
import Drawer from "./components/main-drawer/Drawer";
import { createSwapy } from "swapy";
import OrientationWidget from "./components/widgets-display/widget-card-instances/WidgetInstance";
import type { Widget } from "./types/types";

const WidgetManager: React.FC = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const columnsPerRow = 6;

  // Swapy initialization with cleanup
  useEffect(() => {
    if (!drawerRef.current) return;

    const swapyInstance = createSwapy(drawerRef.current, {
      animation: "spring",
      manualSwap: true
    });

    // Swap event handler
    const handleSwap = (event: unknown) => {
      console.log("Swap event:", event);
    };

    swapyInstance.onSwap(handleSwap);

    return () => {
      swapyInstance.offSwap(handleSwap);
      swapyInstance.destroy();
    };
  }, []);

  // Grid cell generator
  const renderGridCells = () => {
    return Array.from({ length: columnsPerRow }).map((_, index) => (
      <div key={index} data-swapy-slot={index}>
        <OrientationWidget
          itemId={index.toString()}
          direction="square"
        />
      </div>
    ));
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
        {renderGridCells()}
      </Drawer>
    </div>
  );
};

export default WidgetManager;