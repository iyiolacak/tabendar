import React, { useEffect } from "react";
import { Widget, WidgetOrientation, WidgetsLayout } from "../types/types";

const layout: WidgetsLayout = [
  // "S", "square" generally should be 1:1 so in the future we can modify it as so.
  { id: "widget1", orientation: "S", colSpan: 1, rowSpan: 1, x: 0, y: 0 },
  { id: "widget2", orientation: "V", colSpan: 1, rowSpan: 1, x: 2, y: 0 },
  { id: "widget3", orientation: "H", colSpan: 1, rowSpan: 1, x: 3, y: 0 },
];

let widgetsMappedLayout: (WidgetOrientation | null)[][] = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
];

const placeWidget = (layout: WidgetsLayout, widget: Widget) => {
  
  // layout[y][x]
  let newLayout = [...layout.map((row) => [...row.id])];
  for (let row = 0; row < widgetsMappedLayout.length; row++) { // rows
    for (let col = 0; col < widgetsMappedLayout[row].length; col++) { // cols
      if (newLayout[row][col] === null) { 
        let canFit = true;
      }


      // Check if widget size can fit the available size
      for (let i = 0; i < widget.colSpan; i++) {
        for (let j = 0; j < widget.rowSpan; j++) {
          if (
            row + i >= newLayout.length || // Grid overflow
            col + j >= newLayout[row].length || // Grid overflow
            newLayout[i][j] !== null // Collision
          ) {
            let canFit = false;
          }
        }
      }
    }
  }
};
// map the first widget
// ask widget its position(x: 0) x, y = widgetsMappedLayout[x][y]
// recursively loop until colSpan: and rowSpan.
// If colSpan, it will take the x index, and for loop `++` until i hits the number(e.g. 2)
// if rowSpan, it will copy the layout[x] and for loop `++` for the Y similarly to colSpan.

// maps row and inside row, maps column amount.
// 1. mapped the row [] -> 2. inside row, mapped the columns [null, null, null, ...] -> 3. repeat until all the rows are mapped.
// layout.map((row, rowIdx) => row.map((column, colIdx) => ))

const sortLayout = (layout: WidgetsLayout) => {
  return layout.slice().sort((a, b) => a.y - b.y || a.x - b.x);
};

const calculateLayout = (layout: WidgetsLayout) => {};
const useValidateLayout = (layout: WidgetsLayout) => {
  let rowIdx: number = 0;
  layout.forEach((widget, index) => {
    switch (widget) {
      case "H": {
      }
    }
  });
};
