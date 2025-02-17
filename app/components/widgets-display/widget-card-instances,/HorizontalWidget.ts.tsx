import React from "react";

const HorizontalWidget = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="solid-dark-square rounded-[48px] col-span-2 row-span-1">
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

export default HorizontalWidget;
