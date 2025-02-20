import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

const OrientationWidget = React.memo(({
  children,
  direction = "horizontal",
}: {
  children?: React.ReactNode;
  direction?: "horizontal" | "vertical" | "square";
}) => {
  const className = useMemo(
    () =>
      cn("solid-dark-square rounded-[48px] h-full min-w-max", {
        "row-span-2 col-span-1": direction === "vertical",
        "row-span-1 col-span-2": direction === "horizontal",
        "row-span-1 col-span-1 aspect-square": direction === "square",
      }),
    [direction]
  );
  return (
    <div className={className}>
      {children ?? (
        <div className="w-full h-full items-center justify-center flex">
          <p className="text-white text-center text-2xl font-medium">
            Empty Widget
          </p>
        </div>
      )}
    </div>
  );
});

OrientationWidget.displayName = "OrientationWidget";

export default OrientationWidget;
