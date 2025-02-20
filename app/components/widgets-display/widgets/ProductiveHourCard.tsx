import React from "react";
import { GitHubNumber } from "./GithubNumber";

const ProductiveHourCard = () => {
  return (
    <div className="solid-dark-square group rounded-2xl min-w-[12rem] flex items-center justify-center relative overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-14 px-2 bg-neutral-800 rounded-2xl items-center transition-all duration-300 ease-in-out">
            <h1 className="text-md font-bold uppercase text-white drop-shadow-xl">
              Productive Hour
            </h1>
          </div>
        </div>
        <GitHubNumber
          number="7"
          randomBrightness={true}
          showBackground={true}
          withShine={true}
          className="flex flex-col items-center justify-center relative transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-125"
        />
      </div>
    </div>
  );
};

export default ProductiveHourCard;
