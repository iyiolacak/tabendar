import React from "react";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" min-w-full lg:px-28 flex flex-col items-center justify-center mt-12 gap-12">
      <div
        className="
      w-full h-full flex flex-col items-center justify-center glass-square
      rounded-3xl px-4 py-3 gap-4 overflow-auto"
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
