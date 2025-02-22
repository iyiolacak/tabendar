type WidgetType = "S" | "H" | "V";

export type WidgetLayoutValue = {
  type: WidgetType;
  colSpan: number;
  rowSpan: number;
};

export type WidgetsLayout = WidgetLayoutValue[];
