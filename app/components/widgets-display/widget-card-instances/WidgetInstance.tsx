import { cn } from "@/lib/utils";
import React from "react";

interface OrientationWidgetInterface
  extends React.HTMLAttributes<HTMLDivElement> {}

const OrientationWidget = ({
  className,
  style,
  ...props
}: OrientationWidgetInterface) => {
  return (
    <div
      {...props}
      className={cn(
        `solid-dark-square rounded-[48px] aspect-square`,
        className
      )}
      style={style}
    ></div>
  );
};

export default OrientationWidget