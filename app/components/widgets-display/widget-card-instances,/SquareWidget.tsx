import React from "react";
const SquareWidget = ({ children }: { children?: React.ReactNode }) => {
  const randomNumber = Math.random()*100;
  return (
    <div className="solid-dark-square rounded-[48px] aspect-square col-span-1 row-span-1">
      {children ?? (
        <div className="w-full h-full items-center justify-center flex">
          <p className="text-white text-center text-xl">
            {randomNumber.toFixed()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SquareWidget;
