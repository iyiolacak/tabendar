import React from "react";

const HorizontalWidget = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="solid-dark-square rounded-[48px] aspect-[4/2] h-full min-w-[560px]">
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
