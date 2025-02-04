import React from "react";

const BookCard = ({ title, cover }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Icon Container */}
      <div className="relative w-24 h-32 flex items-center justify-center group">
        <div
          className="
            relative w-full h-full bg-gray-100 
            shadow-[0_10px_20px_rgba(0,0,0,0.25)]
            rounded-md overflow-hidden 
            transform transition-transform duration-300
            group-hover:scale-105 group-hover:-rotate-1
          "
        >
          {/* Book Cover */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-md"
            style={{ backgroundImage: `url(${cover})` }}
          ></div>

          {/* Book Spine: a dark, subtle gradient with inner shadow for depth */}
          <div
            className="
              absolute top-0 left-0 w-6 h-full 
              bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 
              rounded-l-md shadow-inner
            "
          ></div>

          {/* Page Edge Details: layered gradients to simulate realistic page depth */}
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

          {/* Title Overlay with a smooth gradient */}
          <div
            className="
              absolute bottom-0 w-full 
              bg-gradient-to-t from-black/70 via-transparent to-transparent 
              text-white text-center py-1 text-sm font-semibold
            "
          >
            {title}
          </div>
        </div>
      </div>

      {/* Simulated Reflection Element */}
      <div className="mt-2 w-24 h-8 relative">
        {/* Reflected image of the book cover */}
        <div
          className="
            absolute w-full h-full bg-cover bg-center rounded-md
            transform scale-y-[-1] opacity-30 
          "
          style={{
            backgroundImage: `url(${cover})`,
            filter: "blur(2px)"
          }}
        ></div>
      </div>
    </div>
  );
};

export default BookCard;
