import React from "react";

const PythonCard = () => {
  return (
    <div className="group solid-dark-square flex flex-col items-center justify-center p-3 h-[15rem] w-fit px-12 rounded-2xl text-white">
      <div className="size-16 border border-neutral-800 rounded-lg">
        <img
          src="/python_mono.png"
          alt="python_monochrome"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      <p className="text-xl text-white/80 mb-1 mt-3">You mostly coded in</p>
      <h2 className="font-semibold text-2xl transition-colors group-hover:text-black group-hover:bg-[#f1ea62]">
        Python*
      </h2>
      <p className="text-sm mt-3 text-white/30 ">*Except today.</p>
    </div>
  );
};

export default PythonCard;
