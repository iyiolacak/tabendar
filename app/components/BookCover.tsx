import React from "react";
import useEasterEgg from "../hooks/useEasterEgg";
import { cn } from "@/lib/utils";

interface BookCardProps {
  displayValue: string; // Text displayed on the card
  cover: string; // URL of the book cover image
  onClick: () => void; // Event handler for click action
  easterEggProbability?: number; // Optional probability for triggering an Easter egg
}

const BookCard: React.FC<BookCardProps> = ({
  displayValue,
  cover,
  onClick,
  easterEggProbability = 0.1, // Default value of 0.1 if not provided
}) => {
  const { showEasterEgg, handleGiveItAChance } =
    useEasterEgg(easterEggProbability);

  return (
    <div className="flex flex-col items-center">
      {/* Icon Container with realistic effects */}
      <div
        className="relative w-24 h-32 flex items-center justify-center group"
        onMouseEnter={handleGiveItAChance} // Trigger hover event for Easter egg
      >
        <div
          className={cn(
            "relative w-full h-full bg-gray-100 shadow-lg rounded-md overflow-hidden transform transition-transform duration-300 " +
              "group-hover:scale-105 group-hover:rotate-3"
          )}
        >
          {/* Book Cover (Monochrome with smooth transition) */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-md"
            style={{
              backgroundImage: `url(${cover})`,
              filter: "grayscale(100%)", // Monochrome effect
              transition: "filter 0.3s ease-in-out", // Smooth transition for hover effect
            }}
          ></div>

          {/* Book Spine with texture */}
          <div
            className="
              absolute top-0 left-0 w-6 h-full 
              bg-gradient-to-b from-black/80 via-black/70 to-black/60 
              rounded-l-md shadow-inner
            "
          ></div>

          {/* Page Edge Details */}
          <div className="absolute top-0 left-[6px] w-2 h-full bg-gradient-to-b from-black/30 to-black/20"></div>
          <div className="absolute top-0 left-[8px] w-2 h-full bg-gradient-to-b from-black/40 to-black/30"></div>
          <div className="absolute top-0 left-[10px] w-2 h-full bg-gradient-to-b from-black/50 to-black/40"></div>

          {/* Hover Glow and Reflective Overlay */}
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
            className="absolute inset-0 flex items-center justify-center focus:outline-none"
          >
            <div className="flex flex-col items-center justify-center ml-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
                alt="Notion Logo"
                className="w-10 h-10"
              />
              <span className="text-black backdrop-shadow-md text-xs mt-1 ml-3 font-medium">
                {displayValue}
                {showEasterEgg ? " Obsidian!" : " Notebook"}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Pages Depth at the Bottom */}
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
      </div>
    </div>
  );
};

export default BookCard;
