import { cn } from "@/lib/utils";
import React from "react";

const OrientationWidget = ({
  children,
  direction = "horizontal",
}: {
  children?: React.ReactNode;
  direction: "horizontal" | "vertical";
}) => {
  return (
    <div
      className={cn("solid-dark-square rounded-[48px] h-full min-w-max", {
        "row-span-2 col-span-1": direction === "vertical",
        "row-span-1 col-span-2": direction === "horizontal"
      })}
    >
      {children ?? (
        <div className="w-full h-full items-center justify-center flex">
          <p className="text-white text-center text-xl">
            Empty Horizontal <br />
            Widget Instance
          </p>
        </div>
      )}
    </div>
  );
};

export default OrientationWidget;
