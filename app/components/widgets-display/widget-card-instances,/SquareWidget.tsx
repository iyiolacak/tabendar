import React from "react";
const SquareWidget = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="solid-dark-square rounded-[48px] aspect-square col-span-1 row-span-1">
      {children ?? (
        <div className="w-full h-full items-center justify-center flex">
          <p className="text-white text-center text-xl">
            Empty Square <br />
            Widget Instance
          </p>
        </div>
      )}
    </div>
  );
};

export default SquareWidget;
