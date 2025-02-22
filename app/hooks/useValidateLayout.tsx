import React, { useEffect } from "react";
import { WidgetsLayout } from "../types/types";

const layout: WidgetsLayout = [
  // "S", "square" generally should be 1:1 so in the future we can modify it as so.
  { id: "widget1", type: "S", colSpan: 1, rowSpan: 1 },
  { type: "V", colSpan: 1, rowSpan: 1 },
  { type: "H", colSpan: 1, rowSpan: 1 },
];

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
