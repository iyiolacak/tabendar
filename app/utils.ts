import { Widget, WidgetOrientation } from "./types/types";

export const determineWidgetType = (widget: Widget): WidgetOrientation => {
  if (widget.colSpan === widget.rowSpan) return "S";
  return widget.colSpan > widget.rowSpan ? "H" : "V";
};

export const createWidget = (widget: Omit<Widget, "orientation">) => {
  if (widget.colSpan > widget.rowSpan) {
    // Widget is Horizontal
  } else if (widget.colSpan === widget.rowSpan) {
  } // Widget is Square
  else {
    // Widget is Vertical
  }
};
