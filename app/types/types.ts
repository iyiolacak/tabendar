export type WidgetOrientation = "S" | "H" | "V";

export type Widget = {
  id: string;
  // name?: string;
  orientation: WidgetOrientation;

  // Grid position information.
  x: number;
  y: number;

  colSpan: number;
  rowSpan: number;

};

export type WidgetsLayout = Widget[];
