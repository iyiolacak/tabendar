type WidgetType = "S" | "H" | "V";

export type Widget = {
  id: string;
  // name?: string;
  type: WidgetType;

  // Grid position information.
  x: number;
  y: number;

  colSpan: number;
  rowSpan: number;

};

export type WidgetsLayout = Widget[];
