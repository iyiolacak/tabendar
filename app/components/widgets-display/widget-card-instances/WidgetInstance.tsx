import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

const OrientationWidget = React.memo(
  ({
    children,
    direction = "horizontal",
  }: {
    children?: React.ReactNode;
    direction?: "horizontal" | "vertical" | "square";
  }) => {

    return (
      <div className={`solid-dark-square rounded-[48px] h-full`}>
        {children ?? (
          <div className="w-full cursor-pointer h-full items-center justify-center flex">
            <p className="text-white text-center text-2xl font-medium">
              {(Math.random() * 100).toFixed(0)}
            </p>
          </div>
        )}
      </div>
    );
  }
);

OrientationWidget.displayName = "OrientationWidget";

export default OrientationWidget;
