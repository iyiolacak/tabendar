import React from "react";
import useEasterEgg from "../hooks/useEasterEgg";
import { cn } from "@/lib/utils";

interface BookCardProps {
  cover: string;
  onClick: () => void;
  easterEggProbability?: number; // Optional probability for the Easter egg (default is 0.1)
}

const BookCard: React.FC<BookCardProps> = ({
  cover,
  onClick,
  easterEggProbability = 0.1,
}) => {
  // Use the custom hook with the given probability
  const { showEasterEgg, handleGiveItAChance } =
    useEasterEgg(easterEggProbability);

  return (
    <div className="flex flex-col items-center">
      {/* Icon Container */}
      <div
        className="relative w-24 h-32 flex items-center justify-center group"
        onMouseEnter={handleGiveItAChance} // Trigger hover event to check for Easter egg
      >
        <div
          className={cn(
            "relative w-full h-full bg-gray-100 " +
              "shadow-[0_10px_20px_rgba(0,0,0,0.25)] " +
              "rounded-md overflow-hidden " +
              "transform transition-transform duration-300 " +
              "group-hover:scale-105 group-hover:-rotate-1"
          )}
        >
          {/* Book Cover (Monochrome) */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-md"
            style={{
              backgroundImage: `url(${cover})`,
              filter: "grayscale(100%)", // Monochrome effect
            }}
          ></div>

          {/* Book Spine */}
          <div
            className="
              absolute top-0 left-0 w-6 h-full 
              bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 
              rounded-l-md shadow-inner
            "
          ></div>

          {/* Page Edge Details */}
          <div className="absolute top-0 left-[6px] w-2 h-full bg-gradient-to-b from-gray-300 to-gray-200"></div>
          <div className="absolute top-0 left-[8px] w-2 h-full bg-gradient-to-b from-gray-400 to-gray-300"></div>
          <div className="absolute top-0 left-[10px] w-2 h-full bg-gradient-to-b from-gray-500 to-gray-400"></div>

          {/* Subtle Reflection/Glow Overlay on hover */}
          <div
            className="
              absolute inset-0 bg-white bg-opacity-10 rounded-md
              opacity-0 transition-opacity duration-300
              group-hover:opacity-25
            "
          ></div>

          {/* Notion Button Overlay */}
          <button
            onClick={onClick}
            className="
              absolute inset-0 flex flex-col items-center justify-center
              focus:outline-none"
          >
            <div className="flex items-center flex-col justify-center ml-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
                alt="Notion Logo"
                className="w-10 h-10"
              />
              <span className="text-black backdrop-shadow-md text-xs mt-1 ml-3 font-medium">
                {showEasterEgg ? "Obsidian!" : "Notebook"}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Little Pages Depth at the Bottom */}
      <div className="w-24 h-8 relative">
        <div
          className="
            absolute w-full h-full bg-cover bg-center rounded-md
            transform scale-y-[-1] opacity-30 
            filter grayscale(100%) blur(2px)
          "
          style={{
            backgroundImage: `url(${cover})`,
          }}
        ></div>
        {/* Added little pages depth at the bottom */}
      </div>
    </div>
  );
};

export default BookCard;
