"use client";
import React, { useEffect, useState } from "react";
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
      { i: "2", x: 1, y: 0, w: 1, h: 1 },
      { i: "3", x: 2, y: 0, w: 1, h: 1 },
      { i: "4", x: 3, y: 0, w: 1, h: 1 },
      { i: "5", x: 0, y: 1, w: 1, h: 1 },
    ],
  });

  const handleLayoutChange = (layout: any, allLayouts: any) => {
    setLayouts(allLayouts);
  };
  const baseUnit = 280;
  return (
    // Container with fixed width, which is not really good.
    <Drawer className="w-[1842px]">
      <div className="px-6">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          // Define the number of columns at each breakpoint. These columns determine the base unit.
          cols={{ lg: 6, md: 3, sm: 2, xs: 1, xxs: 1 }}
          rowHeight={280}
          margin={[16, 16]}
          onLayoutChange={handleLayoutChange}
          isDraggable
          isResizable
          compactType={null}
          maxRows={1}
          useCSSTransforms
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
