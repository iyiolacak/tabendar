"use client";
import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Drawer from "./components/main-drawer/Drawer";
import OrientationWidget from "./components/widgets-display/widget-card-instances/WidgetInstance";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function WidgetManager() {
  const [layouts, setLayouts] = useState({
    lg: [
      { i: "1", x: 0, y: 0, w: 1, h: 1 },
      { i: "2", x: 1, y: 0, w: 2, h: 1 }, // Wider item
      { i: "3", x: 0, y: 1, w: 1, h: 2 }, // Taller item
      { i: "4", x: 1, y: 1, w: 1, h: 1 },
      { i: "5", x: 2, y: 1, w: 1, h: 1 },
      { i: "6", x: 0, y: 3, w: 3, h: 1 }, // Full-width item
    ],
  });

  const handleLayoutChange = (layout: any, allLayouts: any) => {
    setLayouts(allLayouts);
  };

  return (
    <Drawer>
      <div className=" w-full h-full">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 280 }}
          cols={{ lg: 6 }}
          rowHeight={280}
          margin={[16, 16]}
          onLayoutChange={handleLayoutChange}
          isDraggable
          isResizable
        >
          {layouts.lg.map((item) => (
            <OrientationWidget
              key={item.i}
              className="solid-dark-square rounded-[48px]"
            ></OrientationWidget>
          ))}
        </ResponsiveGridLayout>
      </div>
    </Drawer>
  );
}
