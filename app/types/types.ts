type WidgetType = "S" | "H" | "V";
export type WidgetLayoutValue = {
  [key in WidgetType]: {
    colSpan: number;
    rowSpan: number;
  };
};

export type WidgetsLayout = WidgetLayoutValue[];
