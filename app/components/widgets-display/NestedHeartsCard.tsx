import React from "react";

const NestedHeartsCard = () => {
  return (
    <div className="relative glass-square flex border-none flex-col items-center justify-center p-3 max-h-[11rem] w-fit px-12 rounded-2xl text-white overflow-hidden">
      <img
        src="/nested_hearts.png"
        alt="Commit History"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
      <div className="z-10 text-center">
        <p className="text-xl">
          Your first commit was <span className="font-medium">4017</span> days
          ago
        </p>
        <h2 className="font-semibold text-3xl drop-shadow-sm">
          That&apos;s older than Rust.
        </h2>
      </div>
    </div>
  );
};

export default NestedHeartsCard;
